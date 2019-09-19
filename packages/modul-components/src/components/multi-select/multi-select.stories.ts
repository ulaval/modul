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
const optionsColor: String[] = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkGrey', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'GreenYellow', 'Grey', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightGrey', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('complete', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [],
            options: optionsColor
        }),
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="CSS Colors">
            <template v-slot:chips="{item , index }"><div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
            <template v-slot:items="{item , index }">{{ index }} - <div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
        </m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('label', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" label="La famille Von Trapp" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('custom select-item', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:items="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('custom chip info', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:chips="{item , index }"> {{ index }} - {{ item }} </template></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('select all', () => ({
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
        template: `<m-multi-select :select-all="true" @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<m-multi-select :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${componentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6 - Select all', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<m-multi-select :options="options" v-model="model1" :select-all="true"></m-multi-select>`
    })
    );
