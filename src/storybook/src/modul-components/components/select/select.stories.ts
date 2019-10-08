import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { SELECT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const options: string[] = ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc'];
const optionsLong: string[] = ['apple juice', 'bannana', 'patate', 'tomato', 'avocados', 'A fruit with a very long word for testing'];

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Default', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: '',
            label: 'Fruits',
            options: options
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Default</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :label="label" :options="options" v-model="model1">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model1 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Focus', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model2: '',
            label: 'Fruits',
            options: options
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Focus</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :focus="true" @select-item="select" :label="label" :options="options" v-model="model2">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model2 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Label up', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model3: '',
            label: 'Fruits',
            options: options,
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Label up</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :label="label" :label-up="true" :placeholder="placeholder" :options="options" v-model="model3">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model3 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Clearable activate with no required marker', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model4: '',
            options: options,
            clearable: true,
            label: 'Fruits',
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Clearable activate with no required marker</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" :clearable="clearable" :label="label" :label-up="true" :placeholder="placeholder" v-model="model4">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model4 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Clearable activate with required marker', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model4: '',
            options: options,
            clearable: true,
            label: 'Fruits',
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Clearable activate with required marker</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" :clearable="clearable" :label="label" :label-up="true" :required-marker="true" :placeholder="placeholder" v-model="model4">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model4 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/readonly`, module)
    .add('No selection, no label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model5: '',
            label: '',
            options: options,
            placeholder: ''
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, no label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :readonly="true" @select-item="select" :label="label" :label-up="true" :placeholder="placeholder" :options="options" v-model="model5">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model5 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/readonly`, module)
    .add('No selection, with label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model6: '',
            label: 'Fruits',
            options: options,
            placeholder: ''
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, with label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :readonly="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model6">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model6 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/readonly`, module)
    .add('No selection, with label, with placeholder', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model7: '',
            label: 'Fruits',
            options: options,
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, with label, with placeholder</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :readonly="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model7">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model7 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/readonly`, module)
    .add('No selection, no label, with placeholder', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model8: '',
            label: '',
            options: options,
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, no label, with placeholder</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :readonly="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model8">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model8 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/readonly`, module)
    .add('Item selected, with label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model9: 'bannana',
            label: 'Fruits',
            options: options,
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Item selected, with label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :readonly="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model9">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model9 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/disabled`, module)
    .add('No selection, no label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model10: '',
            label: '',
            options: options,
            placeholder: ''
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, no label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :disabled="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model10">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model10 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/disabled`, module)
    .add('No selection, no label, with placeholder', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model11: '',
            label: '',
            options: options,
            placeholder: 'Choose a fruit'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, no label, with placeholder</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :disabled="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model11">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model11 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/disabled`, module)
    .add('No selection, with label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model12: '',
            label: 'Fruits',
            options: options,
            placeholder: ''
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">No selection, with label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :disabled="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model12">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model12 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/disabled`, module)
    .add('Item selected, with label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model13: 'banana',
            label: 'Fruits',
            options: options,
            placeholder: ''
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">Item selected, with label</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" :disabled="true" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model13">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model13 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('Iphone6', () => ({
        data: () => ({
            model1: '',
            options: ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc']
        }),
        template: `<div>
                    <m-select :options="options" v-model="model1">
                        <template v-slot:default>The selection is :{{ model1 }}</template>
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model1 }}</p>
                </div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${SELECT_NAME}/Others tests`, module)
    .add('m-select with long option', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model14: '',
            label: 'Fruits',
            options: optionsLong,
            placeholder: 'Choose a fruits'
        }),
        template: `<div>
                    <p class="m-u--font-weight--semi-bold m-u--padding-bottom--s">m-select with long option</p>
                    <m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :label="label" :placeholder="placeholder" :options="options" v-model="model13">
                        <template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template>
                    </m-select>
                    <p>v-model = {{ model13 }}</p>
                </div>`
    })
    );
