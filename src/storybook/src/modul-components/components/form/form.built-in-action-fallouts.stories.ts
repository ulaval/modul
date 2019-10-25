import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ClearErrorToast, ClearSummaryMessage, ErrorToast, FocusOnFirstError, SummaryMessage } from '@ulaval/modul-components/dist/components/form/fallouts/built-in-form-action-fallouts';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { EmailValidator } from '@ulaval/modul-components/dist/utils/form/validators/email/email';
import { MaxLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/max-length/max-length';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/built-in action-fallouts`,
    parameters: { fileName: __filename }
};


export const defaultFallout = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [RequiredValidator({ controlLabel: 'name' })]
                )
            }
        )
    }),
    computed: {
        nameField(): void {
            return this.$data.formGroup.getControl('name');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
                :form-group="formGroup">
            <m-textfield v-model.trim="nameField.value"
                        :error-message="nameField.errors.length > 0 ? nameField.errors[0].message : null"
                        :label="nameField.name"
                        v-m-control="nameField">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const toastAndClear = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [
                        RequiredValidator()
                    ]
                ),
                'email': new FormControl<string>(
                    [
                        EmailValidator(),
                        MaxLengthValidator(10)
                    ]
                )
            }
        ),
        actionFallouts: [
            ErrorToast,
            ClearErrorToast
        ]
    }),
    computed: {
        nameControl(): FormControl<string> {
            return this.$data.formGroup.getControl('name') as FormControl<string>;
        },
        emailControl(): FormControl<string> {
            return (this).$data.formGroup.getControl('email') as FormControl<string>;
        }
    },
    template: `
        <m-form class="m-u--margin-top"
                :form-group="formGroup"
                :action-fallouts="actionFallouts">
            <m-textfield v-model.trim="nameControl.value"
                        :error="nameControl.hasError()"
                        :error-message="nameControl.errorMessage"
                        :label="nameControl.name"
                        v-m-control="nameControl">
            </m-textfield>
            <m-textfield v-model.trim="emailControl.value"
                        :error="emailControl.hasError()"
                        :error-message="emailControl.errorMessage"
                        :label="emailControl.name"
                        v-m-control="emailControl">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const focusFirstError = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [RequiredValidator({ controlLabel: 'name' })]
                )
            }
        ),
        actionFallouts: [
            FocusOnFirstError
        ]
    }),
    computed: {
        nameField(): void {
            return (this).$data.formGroup.getControl('name');
        }
    },
    template:
        ` <m-form class="m-u--margin-top"
                :form-group="formGroup"
                :action-fallouts="actionFallouts">
            <m-textfield v-model.trim="nameField.value"
                        :error-message="nameField.errors.length > 0 ? nameField.errors[0].message : null"
                        :label="nameField.name"
                        v-m-control="nameField">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>`

});

export const messageSummaryAndClear = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [RequiredValidator({ controlLabel: 'name' })]
                )
            }
        ),
        actionFallouts: [
            SummaryMessage,
            ClearSummaryMessage
        ]
    }),
    computed: {
        nameField(): void {
            return (this).$data.formGroup.getControl('name');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
                :form-group="formGroup"
                :action-fallouts="actionFallouts">
            <m-textfield v-model.trim="nameField.value"
                        :error-message="nameField.errors.length > 0 ? nameField.errors[0].message : null"
                        :label="nameField.name"
                        v-m-control="nameField">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});
