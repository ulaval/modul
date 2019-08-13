import * as fs from 'fs';
import * as _ from 'lodash';
import * as parser from 'node-html-parser';
import Project, { ClassDeclaration, ClassInstanceMemberTypes, ClassInstancePropertyTypes, Decorator, Expression, LanguageService, MethodDeclaration, ObjectLiteralExpression, ParameterDeclaration, PropertyAssignment, SourceFile, StringLiteral, SyntaxKind, Type, TypeChecker } from 'ts-morph';
import { Meta, MetaComponent, MetaEvent, MetaProps, MetaSlot } from './index';


const MIXINS_PROPERTY_NAME: string = 'mixins';
const COMPONENT_DECORATOR_NAME: string = 'Component';
const PROP_DECORATOR_NAME: string = 'Prop';
const EMIT_DECORATOR_NAME: string = 'Emit';
const DEFAULT_PROPERTY_NAME: string = 'default';

const DEFAULT_ARROW_FUNCTION_VALUE: string = 'function()';

/**
 * Extract static meta from a TS file using the typescript compiler API
 * @see {@link https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API}
 * @see {@link https://github.com/dsherret/ts-simple-ast}
 * @see {@link https://ts-ast-viewer.com/}
 *
 */
export class MetaGenerator {

    private project: Project;
    private typeChecker: TypeChecker;
    private languageService: LanguageService;

    constructor(projetFilePath: string) {

        this.project = new Project({
            tsConfigFilePath: projetFilePath,
            addFilesFromTsConfig: true
        });

        // uncomment this for test a specific file

        // this.project = new Project({
        //     tsConfigFilePath: projetFilePath,
        //     addFilesFromTsConfig: false
        // });
        // this.project.addExistingSourceFile('src/components/button/button.ts');

        this.typeChecker = this.project.getTypeChecker();
        this.languageService = this.project.getLanguageService();

    }

    public generateMeta(): Meta {
        let output: Meta = {
            components: []
        };

        this.project.getSourceFiles().forEach((sourceFile: SourceFile) => {
            let classDeclarations: ClassDeclaration[] = sourceFile.getClasses();
            classDeclarations.forEach((classDeclaration: ClassDeclaration) => {
                let componentDecorator: Decorator | undefined = classDeclaration.getDecorator(COMPONENT_DECORATOR_NAME);

                // If the class has the @Component decorator
                if (componentDecorator) {

                    const templateString: string = this.readFileAsString(`${sourceFile.getFilePath().slice(0, -3)}.html`);
                    const apiOverrideString: string = this.readFileAsString(`${sourceFile.getFilePath().slice(0, -3)}.api.fr.json`);
                    const meta: MetaComponent = this.generateComponentMeta(classDeclaration, templateString, apiOverrideString);

                    output.components.push(meta);
                }

            });
        });

        return output;
    }

    private applyMetaOverrides(meta: MetaComponent, metaOverrides: MetaComponent): void {

        // merge object using https://lodash.com/docs/4.17.11#merge
        _.merge(meta, metaOverrides);
    }

    private readFileAsString(filePath: string): string {
        // get the template
        let template: string = '';
        try {
            template = fs.readFileSync(filePath, {
                encoding: 'utf8'
            });

        } catch (err) { }
        return template;
    }

    /**
     *
     */
    private generateComponentMeta(classDeclaration: ClassDeclaration, template: string, apiOverrideString: string): MetaComponent {
        // extract component name
        let output: MetaComponent = {
            componentName: _.kebabCase(classDeclaration.getName())
        };

        let componentDecorator: Decorator = classDeclaration.getDecorator(COMPONENT_DECORATOR_NAME)!;

        output.mixins = this.extractorMixinsFromComponentDecorator(componentDecorator);

        output.props = this.extractMetaPropsFromClass(classDeclaration);

        output.events = this.extractMetaEventFromClass(classDeclaration);

        if (template) {
            output.slots = this.extractMetaSlotFromTemplate(template);
        }

        if (apiOverrideString) {

            const metaOverrides: MetaComponent = JSON.parse(apiOverrideString) as MetaComponent;
            this.applyMetaOverrides(output, metaOverrides);
        }


        return output;
    }

    private extractorMixinsFromComponentDecorator(decorator: Decorator): string[] {

        let result: string[] = [];

        decorator.getArguments().forEach((argument) => {
            if (argument instanceof ObjectLiteralExpression) {
                if ((argument).getProperty(MIXINS_PROPERTY_NAME)) {
                    let mixins: string = ((argument).getProperty(MIXINS_PROPERTY_NAME) as PropertyAssignment).getInitializer()!.getText();
                    if (mixins) {
                        result = mixins.replace(/\[?\]?\r?\n?/g, '').split(',').map((str) => str.trim());
                    }
                }
            }
        });

        return result;
    }

    private extractMetaPropsFromClass(classDeclaration: ClassDeclaration): { [k: string]: MetaProps } {

        let metaProps: { [k: string]: MetaProps } = {};

        // Get a list of all instance properties annotated @props
        let propertyDeclarationWithProps: ClassInstancePropertyTypes[] = classDeclaration.getInstanceProperties().filter((classInstancePropertyTypes: ClassInstancePropertyTypes) => {
            return classInstancePropertyTypes.getDecorator(PROP_DECORATOR_NAME) !== undefined;
        });

        // extract name and type from prop.
        propertyDeclarationWithProps.forEach((classInstancePropertyTypes: ClassInstancePropertyTypes) => {
            metaProps[classInstancePropertyTypes.getName()!] = this.extractMetaPropFromPropertyTypes(classInstancePropertyTypes);
        });

        return metaProps;
    }

    private extractMetaEventFromClass(classDeclaration: ClassDeclaration): { [k: string]: MetaEvent } {

        let metaEvents: { [k: string]: MetaEvent } = {};
        // Get a list of all annotated methods @Emit
        let propertyDeclarationWithEmit: ClassInstanceMemberTypes[] = classDeclaration.getInstanceMembers().filter((instanceMember: ClassInstanceMemberTypes) => {
            if (instanceMember instanceof MethodDeclaration) {
                return instanceMember.getDecorator(EMIT_DECORATOR_NAME) !== undefined;
            }
            return false;
        });

        // extract name and type from prop.
        propertyDeclarationWithEmit.forEach((classInstanceMemberTypes: ClassInstanceMemberTypes) => {
            let methodDeclaration: MethodDeclaration = classInstanceMemberTypes as MethodDeclaration;
            metaEvents[this.extractEventNameFromPropertyTypes(methodDeclaration)] = this.extractMetaEventFromPropertyTypes(methodDeclaration);
        });

        return metaEvents;
    }

    private extractMetaSlotFromTemplate(template: string): { [k: string]: MetaSlot } {

        let metaSlots: { [k: string]: MetaSlot } = {};
        if (template) {
            const root: any = parser.parse(template);
            root.querySelectorAll('slot').forEach((slot: parser.HTMLElement) => {

                if (slot.attributes.name) {
                    // named slot
                    metaSlots[slot.attributes.name] = {
                        isDefault: false
                    };
                } else {
                    // default slot
                    metaSlots['default'] = {
                        isDefault: true
                    };
                }
            });
        }

        return metaSlots;

    }

    private extractMetaPropFromPropertyTypes(classInstancePropertyTypes: ClassInstancePropertyTypes): MetaProps {

        let type: Type = classInstancePropertyTypes.getType();

        let output: MetaProps = {
            type: type.getNonNullableType().getText().split('.').pop()!,
            optional: type.isNullable()
        };

        // extact values of non nullable enum literal type
        if (type.getNonNullableType().isEnumLiteral()) {
            output.values = this.getTypeTypesAsStrings(type.getNonNullableType().compilerType);
        }

        let propDecorator: Decorator = classInstancePropertyTypes.getDecorator(PROP_DECORATOR_NAME)!;
        if (propDecorator.isDecoratorFactory()) {
            let defaultValue: string = this.extractDefaultValueFromPropDecorator(propDecorator);
            if (defaultValue) {
                output.default = defaultValue;
                output.optional = true; // props is optional if have a default value
            }
        }

        return output;
    }

    private extractEventNameFromPropertyTypes(methodDeclaration: MethodDeclaration): string {
        // extract the name of event.
        let metaDecorator: Decorator = methodDeclaration.getDecorator(EMIT_DECORATOR_NAME)!;
        if (metaDecorator.isDecoratorFactory() && metaDecorator.getArguments().length === 1) {
            let stringLitteral: StringLiteral = metaDecorator.getArguments()[0] as StringLiteral;
            return stringLitteral.getLiteralValue();
        } else {
            throw new Error(`Problem while extracting metadata for method ${JSON.stringify(methodDeclaration.getText())}`);
        }
    }

    private extractMetaEventFromPropertyTypes(methodDeclaration: MethodDeclaration): MetaEvent {

        let output: MetaEvent = {};


        // extract methods arguments
        if (methodDeclaration.getParameters() && methodDeclaration.getParameters().length > 0) {
            output.arguments = methodDeclaration.getParameters().map((parameterDeclaration: ParameterDeclaration) => {

                let name: string = parameterDeclaration.getName()!;
                let type: Type = parameterDeclaration.getType();

                return {
                    name,
                    type: type.getNonNullableType().getText().split('.').pop()!
                };
            });
        }

        return output;
    }

    private extractDefaultValueFromPropDecorator(propDecorator: Decorator): string {
        let _default: string = '';
        propDecorator.getArguments().forEach((argument) => {
            if (argument instanceof ObjectLiteralExpression) {
                let arg: ObjectLiteralExpression = argument;
                if (arg.getProperty(DEFAULT_PROPERTY_NAME)) {

                    let initializer: Expression = (arg.getProperty(DEFAULT_PROPERTY_NAME) as PropertyAssignment).getInitializer()!;

                    if (initializer.getKind() === SyntaxKind.ArrowFunction) {
                        _default = DEFAULT_ARROW_FUNCTION_VALUE;                    // we dont want arrow function here
                    } else {
                        if (initializer.getType().getNonNullableType()) {
                            _default = this.getTypeValueAsString(initializer.getType().getNonNullableType().compilerType) ? this.getTypeValueAsString(initializer.getType().getNonNullableType().compilerType) : initializer.getText();
                        } else {
                            _default = initializer.getText();
                        }
                    }

                }

            }
        });
        return _default;
    }

    private getTypeTypesAsStrings(type): string[] {
        if (type.types) {
            return type.types.map((type) => type.value);
        }
        return [];
    }

    private getTypeValueAsString(type): string {
        return type.value;
    }

}
