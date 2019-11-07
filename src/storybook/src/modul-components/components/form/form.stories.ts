import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
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
