import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { BetweenValidator } from '@ulaval/modul-components/dist/utils/form/validators/between/between';
import { CompareValidator } from '@ulaval/modul-components/dist/utils/form/validators/compare/compare';
import { DateBetweenValidator } from '@ulaval/modul-components/dist/utils/form/validators/date-between/date-between';
import { DateFormatValidator } from '@ulaval/modul-components/dist/utils/form/validators/date-format/date-format';
import { EmailValidator } from '@ulaval/modul-components/dist/utils/form/validators/email/email';
import { MaxLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/max-length/max-length';
import { MaxValidator } from '@ulaval/modul-components/dist/utils/form/validators/max/max';
import { MinLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/min-length/min-length';
import { MinValidator } from '@ulaval/modul-components/dist/utils/form/validators/min/min';
import { PhoneValidator } from '@ulaval/modul-components/dist/utils/form/validators/phone/phone';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { FormBuilder } from './helpers/form-builder';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/validators`,
    parameters: { fileName: __filename }
};



export const required = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [RequiredValidator()]
                )
            }
        )
    }),
    template: `<form-builder :form-group="formGroup"></form-builder>`
});


export const email = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [EmailValidator()]
                )
            }
        )
    }),
    template: `<form-builder :form-group="formGroup"></form-builder>`
});

export const minLength = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'min5': new FormControl<string>(
                    [MinLengthValidator(5)]
                )
            }
        )
    }),
    template: `<form-builder :form-group="formGroup"></form-builder>`
});


export const maxLength = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'max5': new FormControl<string>(
                    [MaxLengthValidator(5)]
                )
            }
        )
    }),
    template: `<form-builder :form-group="formGroup"></form-builder>`
});


export const minNumber = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'min5': new FormControl<number>(
                    [MinValidator(5)]
                )
            }
        )
    }),

    template: `<form-builder :form-group="formGroup"></form-builder>`
});

export const maxNumber = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'max5': new FormControl<number>(
                    [MaxValidator(5, { controlLabel: 'max5' })]
                )
            }
        )
    }),
    computed: {
        max5Field(): FormControl<string> {
            return this.formGroup.getControl('max5');
        }
    },
    template: `<form-builder :form-group="formGroup"></form-builder>`
});


export const beteenNumber = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'between': new FormControl<number>(
                    [BetweenValidator(2, 4, { controlLabel: 'between' })]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-integerfield v-model="control.value"
                :error="control.hasError()"
                :error-message="control.errorMessage"
                :label="control.name"
                :valid="control.valid"
                v-m-control="control">
            </m-integerfield>
        </template>
    </form-builder>`
});


export const dateFormat = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'date': new FormControl<string>([
                    MinLengthValidator(10, {
                        controlLabel: 'date',
                        validationType: ControlValidatorValidationType.Correction
                    }),
                    DateFormatValidator({ controlLabel: 'date' })]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-datepicker v-model="control.value"
                          :skip-input-validation="true"
                          :error="control.hasError()"
                          :error-message="control.errorMessage"
                          :label="control.name"
                          :valid="control.valid"
                           v-m-control="control">
                </m-datepicker>
        </template>
    </form-builder>`
});


export const dateBetween = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'date': new FormControl<string>(
                    [DateBetweenValidator('2019-05-20', '2019-05-30', { controlLabel: 'date' })]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-datepicker v-model="control.value"
                          :skip-input-validation="true"
                          min="2008-01-01"
                          max="2019-05-30"
                          :error="control.hasError()"
                          :error-message="control.errorMessage"
                          :label="control.name"
                          :valid="control.valid"
                           v-m-control="control">
                </m-datepicker>
        </template>
    </form-builder>`
});


export const compareFields = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                ),
                'confirmemail': new FormControl<string>(
                )
            },
            [
                CompareValidator(['email', 'confirmemail'])
            ]
        )
    }),
    methods: {
        submit(): void {
            // tslint:disable-next-line: no-console
            console.log('submit');
        }
    },
    computed: {
        emailField(): FormControl<string> {
            return this.formGroup.getControl('email');
        },
        confirmemailField(): FormControl<string> {
            return this.formGroup.getControl('confirmemail');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
                :form-group="formGroup"
                @submit="submit()">
            <p>default validationType =  {{ formGroup.validators[0].validationType }}</p>
            <m-input-group legend="compare two field"
                           :valid="formGroup.valid"
                           :error="formGroup.hasError()"
                           :error-message="formGroup.errorMessage">
                <div>
                    <m-textfield v-model="emailField.value"
                                    :error="emailField.hasError() || formGroup.hasError()"
                                    :error-message="emailField.errorMessage"
                                    label="email"
                                    :valid="emailField.valid"
                                    v-m-control="emailField">
                    </m-textfield>
                    <m-textfield v-model="confirmemailField.value"
                                    :error="confirmemailField.hasError() || formGroup.hasError()"
                                    :error-message="confirmemailField.errorMessage"
                                    label="confirm email"
                                    :valid="confirmemailField.valid"
                                    v-m-control="confirmemailField">
                    </m-textfield>
                </div>
            </m-input-group>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const phoneValidator = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'phone': new FormControl<string>([
                    PhoneValidator({ controlLabel: 'phone' })]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-textfield v-model="control.value"
                          :skip-input-validation="true"
                          :error="control.hasError()"
                          :error-message="control.errorMessage"
                          :label="control.name"
                          :valid="control.valid"
                          placeholder="+14186562131"
                           v-m-control="control">
                </m-textfield>
        </template>
    </form-builder>`
});
