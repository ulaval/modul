import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { MaxLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/max-length/max-length';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { FormBuilder } from './helpers/form-builder';

const COUPE_NAMES: string[] = ['régulière', 'julienne', 'ondulé'];
const TYPE_NAMES: string[] = ['douce', 'blanche', 'sec'];

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/all fields`,
    parameters: { fileName: __filename }
};

export const textfield = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'name': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'name' }),
                        MaxLengthValidator(20, { controlLabel: 'name' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-textfield v-m-control="control"
                         v-model="control.value"
                         label="text field"
                         :error="control.hasError()"
                         :error-message="control.errorMessage"">
            </m-textfield>
        </template>
    </form-builder>`
});



export const textarea = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'description': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'description' }),
                        MaxLengthValidator(255, { controlLabel: 'description' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
        <m-textarea v-m-control="control"
                v-model="control.value"
                label="Description Field"
                :error="control.hasError()"
                :error-message="control.errorMessage""></m-textarea>
        </template>
    </form-builder>`
});

export const datepicker = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'birthDate': new FormControl<string>(
                    [
                        RequiredValidator()
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-datepicker v-m-control="control"
                          v-model="control.value"
                          label="Birthdate"
                          min="1900-01-01"
                          max="2020-01-01"
                          :required-marker="true"
                          :error="control.hasError()"
                          :error-message="control.errorMessage"></m-datepicker>
        </template>
    </form-builder>`
});

export const dropdown = () => ({
    components: { FormBuilder },
    data: () => ({
        types: [...TYPE_NAMES],
        formGroup: new FormGroup(
            {
                'type': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'type' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-dropdown v-m-control="control"
                        v-model="control.value"
                        label="Type"
                        :required-marker="true"
                        :error="control.hasError()"
                        :error-message="control.errorMessage">
                <m-dropdown-item v-for="type of types"
                                :value="type"
                                :label="type"></m-dropdown-item>
            </m-dropdown>
        </template>
    </form-builder>`
});

export const checkbox = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'active': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'active' })
                    ]
                )
            }
        )
    }),
    template: `
        <form-builder :form-group="formGroup">
            <template v-slot="{ control }">
                <m-checkbox v-m-control="control"
                            v-model="control.value"
                            :error="control.hasError()"
                            :error-message="control.errorMessage">Is active ?</m-checkbox>
            </template>
        </form-builder>`

});

export const radio = () => ({
    components: { FormBuilder },
    data: () => ({
        coupes: [...COUPE_NAMES],
        formGroup: new FormGroup(
            {
                'coupe': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'Style de coupe' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-radio-group v-m-control="control"
                        v-model="control.value"
                        label="Style de coupe"
                        :error="control.hasError()"
                        :error-message="control.errorMessage">
                <m-radio v-for="coupe of coupes"
                    :value="coupe">{{coupe}}</m-radio>
                </m-radio-group>
        </template>
    </form-builder>`
});

export const timepicker = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'time': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'Time' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
        <m-timepicker v-m-control="control"
                      v-model="control.value"
                      label="Time"
                      :required-marker="true"
                      :error="control.hasError()"
                      :error-message="control.errorMessage"></m-timepicker>
        </template>
    </form-builder>`
});

export const decimalfield = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'decimal': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'decimal' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-decimalfield v-m-control="control"
                            v-model="control.value"
                            label="Decimal"
                            :required-marker="true"
                            :error="control.hasError()"
                            :error-message="control.errorMessage">

            </m-decimalfield>
        </template>
    </form-builder>`
});

export const moneyfield = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'money': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'Price' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-moneyfield v-m-control="control"
                        v-model="control.value"
                        label="Price"
                        :required-marker="true"
                        :error="control.hasError()"
                        :error-message="control.errorMessage"></m-moneyfield>
        </template>
    </form-builder>`

});

export const integerfield = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'integer': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'Integer' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-integerfield v-m-control="control"
                            v-model="control.value"
                            label="Integer"
                            :required-marker="true"
                            :error="control.hasError()"
                            :error-message="control.errorMessage">

            </m-integerfield>
        </template>
    </form-builder>`
});

export const switchs = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'switch': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'switch' })
                    ]
                )
            }
        )
    }),
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-switch v-m-control="control"
                    v-model="control.value"
                    :error="control.hasError()"
                    :error-message="control.errorMessage">État</m-switch>
        </template>
    </form-builder>`
});

export const autocomplete = () => ({
    components: { FormBuilder },
    data: () => ({
        autocompleteResults: [{ label: 'RandomDog', value: 'RandomDog' }, {
            label: 'RandomDog2',
            value: 'RandomDog2'
        }],
        formGroup: new FormGroup(
            {
                'autocomplete': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'autocomplete' })
                    ]
                )
            }
        )
    }),
    methods: {
        onComplete(): void {
            this.$data.autocompleteResults = [...this.$data.autocompleteResults];
        }
    },
    computed: {
        autocompleteField(): void {
            return (this).$data.formGroup.getControl('autocomplete');
        }
    },
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-autocomplete v-m-control="control"
                            v-model="control.value"
                            label="Autocomplete"
                            :results="autocompleteResults"
                            :required-marker="true"
                            :error="control.hasError()"
                            :error-message="control.errorMessage"
                            @complete="onComplete"></m-autocomplete>
        </template>
    </form-builder>`
});

export const daterangepicker = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'daterange': new FormControl<string>(
                    [
                        RequiredValidator({ controlLabel: 'daterange' })
                    ]
                )
            }
        )
    }),
    computed: {
        daterangeField(): void {
            return (this).$data.formGroup.getControl('daterange');
        }
    },
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-daterangepicker v-m-control="control"
                            v-model="control.value"
                            :error="control.hasError()"
                            :error-message="control.errorMessage">
            </m-daterangepicker>
        </template>
    </form-builder>`
});

export const multiSelect = () => ({
    components: { FormBuilder },
    data: () => ({
        formGroup: new FormGroup(
            {
                'multi-select': new FormControl<string[]>(
                    [
                        RequiredValidator({ controlLabel: 'multi-select' })
                    ], { initialValue: [] }
                )
            }
        ),
        options: ['Maria Rainer', 'Georg von Trapp', 'Liesl von Trapp', 'Friedrich von Trapp', 'Louisa von Trapp', 'Kurt von Trapp', 'Brigitta von Trapp', 'Marta von Trapp', 'Gretl von Trapp']
    }),
    computed: {
        multiSelectField(): void {
            return (this).$data.formGroup.getControl('multi-select');
        }
    },
    template: `
    <form-builder :form-group="formGroup">
        <template v-slot="{ control }">
            <m-multi-select v-model="control.value"
                            v-m-control="control"
                            :error="control.hasError()"
                            :error-message="control.errorMessage"
                            label="La famille Von Trapp"
                            :link-select-all="true"
                            :options="options"
                            :required-marker="true">
            </m-multi-select>
        </template>
    </form-builder>`
});
