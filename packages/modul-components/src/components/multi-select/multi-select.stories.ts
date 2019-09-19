import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { MULTI_SELECT_NAME } from '../component-names';
import MultiSelectPlugin from './multi-select';

Vue.use(MultiSelectPlugin);

const optionsVonTrapp: string[] = ['Maria Rainer', 'Georg von Trapp', 'Liesl von Trapp', 'Friedrich von Trapp', 'Louisa von Trapp', 'Kurt von Trapp', 'Brigitta von Trapp', 'Marta von Trapp', 'Gretl von Trapp'];
const optionsLionKing: string[] = ['Simba', 'Mufasa', 'Scar', 'Timon', 'Pumbaa', 'Rafiki', 'Nala', 'Zazu', 'Shenzi', 'Banzaï', 'Ed', 'Sarabi', 'Sarafina'];
const optionsPawPatrol: string[] = ['Marcus', 'Ruben', 'Chase', 'Rocky', 'Zuma', 'Stella', 'Everest', 'Tracker', 'Ryder', 'Jake', 'Mairesse Goodway', 'Maire Hollinger'];

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('default', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [optionsVonTrapp[0]],
            options: optionsVonTrapp
        }),
        template: `<div><m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Label', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [optionsVonTrapp[0]],
            options: optionsVonTrapp
        }),
        template: `<div><m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" label="La famille Von Trapp" :options="options" v-model="model1"></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Custom select-item', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [optionsLionKing[0]],
            options: optionsLionKing
        }),
        template: `<div><m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Custom chip info', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [optionsLionKing[0]],
            options: optionsLionKing
        }),
        template: `<div><m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:chips="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Select all', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [optionsVonTrapp[0]],
            options: optionsVonTrapp
        }),
        template: `<div><m-multi-select :select-all="true" @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select> </div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<div><m-multi-select :options="options" v-model="model1"></m-multi-select></div>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6 - Select all', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<div><m-multi-select :options="options" v-model="model1" :select-all="true"></m-multi-select></div>`
    })
    );
