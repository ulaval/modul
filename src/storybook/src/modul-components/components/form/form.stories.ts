import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ClearErrorToast, ErrorToast } from '@ulaval/modul-components/dist/components/form/fallouts/built-in-form-action-fallouts';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { CompareValidator } from '@ulaval/modul-components/dist/utils/form/validators/compare/compare';
import { MinLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/min-length/min-length';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    methods: {
        submit: () => {
            Vue.prototype.$log.log('submited');
        },
        reset: () => {
            Vue.prototype.$log.log('reseted');
        }
    },
    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>()
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
                :form-group="formGroup"
                @reset="reset()"
                @submit="submit()">
            <h2>Default with no validations</h2>
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

defaultStory.story = {
    name: 'default'
};

export const submitOutsideForm = () => ({
    methods: {
        submit: () => {
            Vue.prototype.$log.log('submited');
        },
        reset: () => {
            Vue.prototype.$log.log('reseted');
        }
    },
    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>()
            }
        )
    }),
    template: `
        <div>
            <m-form class="m-u--margin-top"
                id="123-456"
                :form-group="formGroup"
                @reset="reset()"
                @submit="submit()">
            <m-textfield v-model.trim="formGroup.getControl('name').value"
                        :error-message="formGroup.getControl('name').errors.length > 0 ? formGroup.getControl('name').errors[0].message : null"
                        :label="formGroup.getControl('name').name"
                        v-m-control="formGroup.getControl('name')">
            </m-textfield>
            </m-form>
            <p class="m-u--margin-bottom--l">
                <m-button type="submit"
                        form="123-456">Submit</m-button>
                <m-button type="reset"
                        skin="secondary"
                        form="123-456">Reset</m-button>
            </p>
        </div>

        `
});

export const reactiveInitialValue = () => ({
    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>([RequiredValidator({ controlLabel: 'name' })], { initialValue: 'blabla' })
            }

        )
    }),
    methods: {
        submit(value: string): void {
            Vue.prototype.$log.log('submited');
            this.$data.formGroup.getControl('name').initalValue = value;
        },
        reset(): void {
            Vue.prototype.$log.log('reseted');
        },
        resetToNewValue(): void {
            this.$data.formGroup.getControl('name').reset('newValue');
            Vue.prototype.$log.log('resetToNewValue');
        }

    },
    template: `
            <div>
                <m-form class="m-u--margin-top"
                    :form-group="formGroup"
                    @reset="reset()"
                    @submit="submit(formGroup.getControl('name').value)">
                <m-textfield v-model.trim="formGroup.getControl('name').value"
                            :error-message="formGroup.getControl('name').errors.length > 0 ? formGroup.getControl('name').errors[0].message : null"
                            :label="formGroup.getControl('name').name"
                            v-m-control="formGroup.getControl('name')">
                </m-textfield>
                <p class="m-u--margin-bottom--l">
                    <m-button type="submit">Submit</m-button>
                    <m-button type="reset"
                            >Reset</m-button>
                    <m-button skin="secondary"
                            @click="resetToNewValue">Reset to new value</m-button>
                </p>
                </m-form>
            </div>
            `
});

export const toastMessageCountForFormGroup = () => ({
    data: () => ({
        formGroup: new FormGroup({
            'control1': new FormControl<string>([RequiredValidator()]),
            'control2': new FormControl<string>([RequiredValidator()]),
            'control3': new FormControl<string>([RequiredValidator()]),
            'formGroup1': new FormGroup(
                {
                    'nestedControl1': new FormControl<string>([MinLengthValidator(5)]),
                    'nestedControl2': new FormControl<string>([MinLengthValidator(5)])
                },
                [
                    CompareValidator([
                        'nestedControl1', 'nestedControl2'
                    ])
                ]
            ),
            'formGroup2': new FormGroup(
                {
                    'nestedControl1': new FormControl<string>([MinLengthValidator(5)]),
                    'nestedControl2': new FormControl<string>([MinLengthValidator(5)])
                },
                [
                    CompareValidator([
                        'nestedControl1', 'nestedControl2'
                    ])
                ]
            )
        }),
        actionFallouts: [
            ErrorToast,
            ClearErrorToast
        ]
    }),
    methods: {
        reset: () => {
            console.log('form reset')
        }
    },
    computed: {
        nameControl(): FormControl<string> {
            return this.$data.formGroup.getControl('name') as FormControl<string>;
        },
        emailControl(): FormControl<string> {
            return (this).$data.formGroup.getControl('email') as FormControl<string>;
        }
    },
    template: `
        <m-form :form-group="formGroup"
            @reset="reset()"
            @submit="submit()">
        <h4 class="m-u--h6">General</h4>
        <m-textfield v-for="(control, index) in formGroup.controls.slice(0, 3)"
                    :key="index + 'A'"
                    v-m-control="control"
                    v-model="control.value"
                    label="test"
                    :required-marker="true"
                    :error="control.hasError()"
                    :error-message="control.errorMessage">
        </m-textfield> <br />
        <hr />
        <m-input-group :error="formGroup.getControl('formGroup1').hasError()"
                    :error-message="formGroup.getControl('formGroup1').errorMessage">
            <m-textfield v-for="(control, index) in formGroup.getControl('formGroup1').controls"
                        :key="index  + 'B'"
                        v-m-control="control"
                        v-model="control.value"
                        label="test"
                        helper-message="5 characters min"
                        :error="control.hasError()"
                        :error-message="control.errorMessage">
            </m-textfield> <br />
        </m-input-group>
        <m-input-group :error="formGroup.getControl('formGroup2').hasError()"
                    :error-message="formGroup.getControl('formGroup2').errorMessage">
            <m-textfield v-for="(control, index) in formGroup.getControl('formGroup2').controls"
                        :key="index  + 'C'"
                        v-m-control="control"
                        v-model="control.value"
                        label="test"
                        helper-message="5 characters min"
                        :error="control.hasError()"
                        :error-message="control.errorMessage">
            </m-textfield> <br />
        </m-input-group>
        <p>
            <m-button type="submit">Submit</m-button>
            <m-button type="reset">Reset</m-button>
        </p>
    </m-form>
    `
});
