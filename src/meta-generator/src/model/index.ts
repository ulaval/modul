export interface Meta {
    packageVersion?: string;
    components: MetaComponent[];
}

export interface MetaComponent {
    componentName: string;
    props?: { [k: string]: MetaProps };
    events?: { [k: string]: MetaEvent };
    slots?: { [k: string]: MetaSlot };
    mixins?: string[];
}

export interface MetaArgument {
    name: string;
    type: string;
}

export interface MetaEvent {
    arguments?: MetaArgument[];
    description?: string;
}

export interface MetaProps {
    optional: boolean;
    type: string;
    values?: string[];
    default?: string;
    description?: string;
}

export interface MetaSlot {
    isDefault: boolean;
    description?: string;
}

export class MetaService {
    constructor(private _meta: Meta) { }

    get meta(): Meta {
        return this._meta;
    }

    findMetaComponentByComponentName(componentName: string): MetaComponent {

        let component: any = this._meta.components.find((metaComponent: MetaComponent) => {
            return metaComponent.componentName.toLowerCase() === componentName.toLowerCase();
        });
        if (component) {
            return component as MetaComponent;
        }
        throw new Error(`Unable to find component with name ${componentName} in meta`);
    }

    findMetaComponentByTagName(tagName: string): MetaComponent {

        // a tag name is in Pascal case
        let component: any = this._meta.components.find((metaComponent: MetaComponent) => {
            return this.camelToKebab(metaComponent.componentName) === tagName;
        });
        if (component) {
            return component as MetaComponent;
        }
        throw new Error(`Unable to find component with tagName ${tagName} in meta`);
    }

    private camelToKebab(camelString: string): string {
        return camelString.replace(/([a-zA-Z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    }

}
