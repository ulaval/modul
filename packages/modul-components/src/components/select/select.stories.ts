import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { SELECT_NAME } from '../component-names';
import SelectPlugin from './select';

Vue.use(SelectPlugin);

const options: string[] = ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc'];

storiesOf(`${componentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('default', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: 'avocados',
            options: options
        }),
        template: `<div><m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:default>The selection is :{{ model1 }}</template><template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-select> <p>v-model = {{ model1 }}</p></div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${SELECT_NAME}`, module)
    .add('Clear selection', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: '',
            options: options,
            clearSelection: true,
            label: 'Fruits',
            placeholder: 'Choose a fruit'
        }),
        template: `<div><m-select  @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" :clear-selection="clearSelection" :label="label" :label-up="true" :placeholder="placeholder" v-model="model1"><template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-select> <p>v-model = {{ model1 }}</p></div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            model1: '',
            options: ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc']
        }),
        template: `<div><m-select :options="options" v-model="model1"><template v-slot:default>The selection is :{{ model1 }}</template><template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-select> <p>v-model = {{ model1 }}</p></div>`
    })
    );

