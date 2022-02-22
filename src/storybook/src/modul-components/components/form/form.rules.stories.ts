import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormArray } from '@ulaval/modul-components/dist/utils/form/form-array';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { EmailValidator } from '@ulaval/modul-components/dist/utils/form/validators/email/email';
import { MaxLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/max-length/max-length';
import { MinLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/min-length/min-length';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const ROLE_NAMES: string[] = ['Sys admin', 'Unit admin', 'Conceptor', 'Assitant', 'Moderator', 'Student', 'Invited'];


export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/rules`,
    parameters: { fileName: __filename }
};


export const requiredAnd20CaractersMax = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'required max20': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Enter a title'
                            }
                        }),
                        MaxLengthValidator(20, {
                            error: {
                                message: 'Enter a title less than 20 characters'
                            }
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        requiredMax20(): void {
            return (this).$data.formGroup.getControl('required max20');
        }
    },
    template: `
        <div>
        <h2>Required and 20 characters max</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Title"
                        v-model.trim="requiredMax20.value"
                        :max-length="20"
                        :character-count="true"
                        :character-count-threshold="20 * .75"
                        :error-message="requiredMax20.errors.length > 0 ? requiredMax20.errors[0].message : null"
                        v-m-control="requiredMax20">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const requiredAnd5CaractersMin = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'required min5': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Enter a security answer'
                            },
                            controlLabel: 'required min5'
                        }),
                        MinLengthValidator(5, {
                            error: {
                                message: 'Enter a security answer at least 5 characters long'
                            },
                            controlLabel: 'required min5',
                            validationType: ControlValidatorValidationType.Correction
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        requiredMin5(): void {
            return (this).$data.formGroup.getControl('required min5');
        }
    },
    template: `
        <div>
        <h2>Required and 5 characters min</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Security answer"
                        v-model.trim="requiredMin5.value"
                        :error-message="requiredMin5.errors.length > 0 ? requiredMin5.errors[0].message : null"
                        v-m-control="requiredMin5">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const PostalCodeExample = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'postal code': new FormControl<string>(
                    [
                        RequiredValidator(),
                        {
                            key: 'postal-code-format',
                            validationFunction: (control: FormControl<string>): boolean => {
                                const regex: RegExp = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

                                return regex.test(control.value || '');
                            },
                            error: {
                                message: 'Enter postal code.'
                            },
                            validationType: ControlValidatorValidationType.OnGoing
                        }
                    ]
                )
            }
        )
    }),
    computed: {
        postalCode(): void {
            return (this).$data.formGroup.getControl('postal code');
        }
    },
    template: `
        <div>
        <h2>Format with fixed max characters (postal code)</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Postal code"
                        v-model.trim="postalCode.value"
                        :error-message="postalCode.errors.length > 0 ? postalCode.errors[0].message : null"
                        v-m-control="postalCode">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const EmailExample = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Enter an email address'
                            }
                        }),
                        EmailValidator({
                            error: {
                                message: 'Enter a valid email address'
                            }
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
        <div>
        <h2>Format without fixed max characters (email)</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Email"
                        v-model.trim="email.value"
                        :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                        v-m-control="email">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});


export const CustomValidation = () => ({

    data: () => ({
        formGroup: new FormGroup(
            {
                'course code': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Enter a course code'
                            }
                        }),
                        MaxLengthValidator(8, {
                            error: {
                                message: 'Enter a 7 characters long course code'
                            },
                            validationType: ControlValidatorValidationType.OnGoing
                        }),
                        {
                            key: 'course-code-format',
                            validationFunction: (control: FormControl<string>): boolean => {
                                const regex: RegExp = /^[A-Za-z]{3}[-]?\d{4}$/;

                                return regex.test(control.value || '');
                            },
                            error: {
                                message: 'Enter a course in the format AAA-0000'
                            },
                            validationType: ControlValidatorValidationType.Correction
                        }
                    ]
                )
            }
        )
    }),
    computed: {
        courseCode(): void {
            return (this).$data.formGroup.getControl('course code');
        }
    },
    template: `
        <div>
        <h2>More than one validations (course code)</h2>
        <p>'MAT-0000' and 'MAT-0001' are reserved</p>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Course code (ex. : MAT-1000)"
                        v-model.trim="courseCode.value"
                        :error-message="courseCode.errors.length > 0 ? courseCode.errors[0].message : null"
                        v-m-control="courseCode">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});


export const AsyncValidation = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'username': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Username is required'
                            },
                            validationType: ControlValidatorValidationType.AtExit,
                            controlLabel: 'Value'
                        }),
                        {
                            key: '',
                            validationFunction: async (control: FormControl<string>): Promise<boolean> => {
                                return new Promise(res => {
                                    if (control.value) {
                                        setTimeout(() => res(![
                                            'John',
                                            'Jane',
                                            'Doe'
                                        ].includes(control.value || '')), 2000);
                                    } else {
                                        res(false);
                                    }
                                });
                            },
                            async: true,
                            error: {
                                message: 'Username is not available'
                            },
                            validationType: ControlValidatorValidationType.AtExit
                        }

                    ]
                )
            }
        )
    }),
    computed: {
        username(): void {
            return (this).$data.formGroup.getControl('username');
        }
    },
    template: `
        <div>
        <h2>Live check username availability (async)</h2>
        <p>'John', 'Jane' and 'Doe' are reserved</p>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-textfield label="Username"
                        v-model.trim="username.value"
                        :error-message="username.errors.length > 0 ? username.errors[0].message : null"
                        :valid="username.valid"
                        :valid-message="username.valid ? 'Username is available' : ''"
                        :waiting="username.waiting"
                        v-m-control="username">
            </m-textfield>
            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const RadioButtonRequired = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'radio required': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Select a role'
                            },
                            controlLabel: 'Value'
                        })
                    ]
                )
            }
        )
    }),
    computed: {
        radioRequired(): void {
            return (this).$data.formGroup.getControl('radio required');
        }
    },
    template: `
        <div>
        <h2>Radio button required</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-radio-group label="Select a role :"
                            v-model.trim="radioRequired.value"
                           :error-message="radioRequired.errors.length > 0 ? radioRequired.errors[0].message : null"
                           v-m-control="radioRequired">
                <m-radio value="Sys admin">Sys admin</m-radio>
                <m-radio value="Unit admin">Unit admin</m-radio>
                <m-radio value="Conceptor">Conceptor</m-radio>
                <m-radio value="Assistant">Assistant</m-radio>
                <m-radio value="Student">Student</m-radio>
            </m-radio-group>

            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const checkbox2to5selections = () => ({
    data: () => ({
        rolesName: [...ROLE_NAMES],
        formGroup: new FormGroup(
            {
                roles: new FormArray(
                    ROLE_NAMES.map(() => new FormControl<boolean>([], { initialValue: false })),
                    [
                        {
                            key: 'selection-min-count',
                            validationFunction: (array: FormArray): boolean => {
                                return array.value.filter((v: boolean) => v).length >= 2;
                            },
                            error: {
                                message: 'Select at least 2 roles'
                            },
                            validationType: ControlValidatorValidationType.OnGoing
                        },
                        {
                            key: 'selection-max-count',
                            validationFunction: (array: FormArray): boolean => {
                                return array.value.filter((v: boolean) => v).length <= 5;
                            },
                            error: {
                                message: 'Select 5 roles or less'
                            },
                            validationType: ControlValidatorValidationType.OnGoing
                        }
                    ])
            }
        )
    }),
    computed: {
        roles(): void {
            return (this).$data.formGroup.getControl('roles');
        }
    },
    template: `
        <div>
        <h2>Checkbox 2 to 5 selections</h2>
        <m-form class="mu-mt"
                :form-group="formGroup">
            <p><strong>Select 2 to 5 roles :</strong></p>
            <ul class="mu-no-m">
                <m-input-group :error-message="roles.errors.length > 0 ? roles.errors[0].message : null"
                v-m-control="roles"
                :visible="false">
                    <li v-for="(control, index) in roles.controls">
                        <m-checkbox
                            v-model="control.value"
                            v-m-control="control"
                            :key="index">
                            {{rolesName[index]}}</m-checkbox>
                    </li>
    </m-input-group>
            </ul>

            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

export const emailConfirmation = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'email': new FormControl<string>(
                    [
                        RequiredValidator({
                            error: {
                                message: 'Enter an email address'
                            }
                        }),
                        EmailValidator({
                            error: {
                                message: 'Enter a valid email address'
                            }
                        })
                    ]
                ),
                'email confirmation': new FormControl<string>(
                    [
                        EmailValidator({
                            error: {
                                message: 'Confirm email address'
                            }
                        })
                    ]
                )
            },
            [
                {
                    key: 'compare-email',
                    validationFunction: (control: FormGroup): boolean => {
                        return (
                            !(control.getControl('email') as FormControl<string>).value
                            ||
                            ['email', 'email confirmation']
                                .map(cn => (control.getControl(cn) as FormControl<any>))
                                .every(fc => fc.value === (control.controls[0] as FormControl<any>).value)
                        );
                    },
                    error: {
                        message: `Emails don't match`
                    },
                    validationType: ControlValidatorValidationType.Correction
                }
            ]
        )
    }),
    computed: {
        email(): void {
            return (this).$data.formGroup.getControl('email');
        },
        emailConfirmation(): void {
            return (this).$data.formGroup.getControl('email confirmation');
        }
    },
    template: `
        <div>
        <h2>Email confirmation</h2>
        <m-form :form-group="formGroup"
        <m-form class="mu-mt"
                :form-group="formGroup">
            <m-input-group :error-message="formGroup.errors.length > 0 ? formGroup.errors[0].message : null"
                           legend=""
                           v-m-control="formGroup">

                <m-textfield label="Email"
                            v-model.trim="email.value"
                            :error-message="email.errors.length > 0 ? email.errors[0].message : null"
                            v-m-control="email">
                </m-textfield>

                <m-textfield label="Email confirmation"
                            v-model.trim="emailConfirmation.value"
                             :error-message="emailConfirmation.errors.length > 0 ? emailConfirmation.errors[0].message : null"
                             v-m-control="emailConfirmation">
                </m-textfield>

            </m-input-group>

            <p class="mu-mb-lg">
                <m-button type="submit">Submit</m-button>
                <m-button type="reset"
                            skin="secondary">Reset</m-button>
            </p>
        </m-form>
        </div>
        `
});

