import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { EmailValidator } from '@ulaval/modul-components/dist/utils/form/validators/email/email';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/validation-type`,
    parameters: { fileName: __filename }
};

export const atExit = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [
                        EmailValidator({
                            controlLabel: 'email',
                            validationType: ControlValidatorValidationType.AtExit
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        email(): void {
            return (this).$data.formGroup.getControl('email');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
                 :form-group="formGroup">
            <p>edition context: {{email['_editionContext']}}</p>
            <m-textfield v-model.trim="email.value"
                        :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                        :label="email.name"
                        v-m-control="email">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const correction = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [EmailValidator({ controlLabel: 'email' })]
                )
            }
        )
    }),
    computed: {
        email(): void {
            return (this).$data.formGroup.getControl('email');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
        :form-group="formGroup">
            <p>edition context: {{email['_editionContext']}}</p>
            <m-textfield v-model.trim="email.value"
                        :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                        :label="email.name"
                        v-m-control="email">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const modification = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [
                        EmailValidator({
                            controlLabel: 'email',
                            validationType: ControlValidatorValidationType.Modification
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        email(): void {
            return (this).$data.formGroup.getControl('email');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
        :form-group="formGroup">
            <p>edition context: {{email['_editionContext']}}</p>
            <m-textfield v-model.trim="email.value"
                        :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                        :label="email.name"
                        v-m-control="email">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});

export const onGoing = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [
                        EmailValidator({
                            controlLabel: 'email',
                            validationType: ControlValidatorValidationType.OnGoing
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        email(): void {
            return (this).$data.formGroup.getControl('email');
        }
    },
    template: `
        <m-form class="m-u--margin-top"
        :form-group="formGroup">
            <p>edition context: {{email['_editionContext']}}</p>
            <m-textfield v-model.trim="email.value"
                        :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                        :label="email.name"
                        v-m-control="email">
            </m-textfield>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        `
});
