import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { MULTI_SELECT_NAME } from '../component-names';
import MultiSelectPlugin from './multi-select';

Vue.use(MultiSelectPlugin);

const options: string[] = ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc'];

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('default', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur'
        ),
        data: () => ({
            model1: ['avocados'],
            options: options
        }),
        template: `<div><m-multi-select  @open="open" @close="close" @focus="focus" @blur="blur" :options="options" v-model="model1"><template v-slot:default>The selection is :{{ model1 }}</template><template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            model1: '',
            options: ['apple', 'bannana', 'patate', 'tomato', 'avocados', 'etc']
        }),
        template: `<div><m-multi-select :options="options" v-model="model1"><template v-slot:default>The selection is :{{ model1 }}</template><template  v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select> <p>v-model = {{ model1 }}</p></div>`
    })
    );
