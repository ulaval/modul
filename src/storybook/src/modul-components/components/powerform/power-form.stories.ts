import { storiesOf } from '@storybook/vue';
import { POWER_FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormArray } from '@ulaval/modul-components/dist/utils/form/form-array';
import { FormStruct, IFormStruct } from '@ulaval/modul-components/dist/utils/form/form-builder';
import { CompareValidator } from '@ulaval/modul-components/dist/utils/form/validators/compare/compare';
import { ControlValidator } from '@ulaval/modul-components/dist/utils/form/validators/control-validator';
import { MinLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/min-length/min-length';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${POWER_FORM_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            instance: new ComplexStructure(
                1,
                'string1',
                'string2',
                new ComplexStructureB(
                    1,
                    true,
                    ['string1', 'string2']
                )
            )
        }),
        template: `
        <div>
            <m-power-form :instance="instance"
            </m-power-form>
        </div>
        `
    }));


class ComplexStructureB implements IFormStruct {
    constructor(
        public id: number,
        public isTrue: boolean,
        public propA: string[]
    ) { }

    FormStruct(): FormStruct {
        return {
            id: 'number',
            isTrue: 'boolean',
            propA: {
                parent: [{
                    validationFunction: (control: FormArray): boolean => {
                        return control.controls.length >= 3;
                    },
                    error: {
                        message: 'must have at least 3 controls'
                    },
                    validationType: ControlValidatorValidationType.OnGoing
                } as ControlValidator]
            }
        }
    }
}

class ComplexStructure implements IFormStruct {
    constructor(
        public id: number,
        public propA: string,
        public propB: string,
        public propC: ComplexStructureB
    ) { }

    FormStruct(): FormStruct {
        return {
            parent: [CompareValidator(['propA', 'propB'])],
            id: 'number',
            propA: {
                validators: [MinLengthValidator(5)],
                types: 'string'
            },
            propB: 'string'
        };
    }
}

