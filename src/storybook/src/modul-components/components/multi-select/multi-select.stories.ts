import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { MULTI_SELECT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const optionsVonTrapp: string[] = ['Maria Rainer', 'Georg von Trapp', 'Liesl von Trapp', 'Friedrich von Trapp', 'Louisa von Trapp', 'Kurt von Trapp', 'Brigitta von Trapp', 'Marta von Trapp', 'Gretl von Trapp'];
const optionsLionKing: string[] = ['Simba', 'Mufasa', 'Scar', 'Timon', 'Pumbaa', 'Rafiki', 'Nala', 'Zazu', 'Shenzi', 'Banzaï', 'Ed', 'Sarabi', 'Sarafina'];
const optionsPawPatrol: string[] = ['Marcus', 'Ruben', 'Chase', 'Rocky', 'Zuma', 'Stella', 'Everest', 'Tracker', 'Ryder', 'Jake', 'Mairesse Goodway', 'Maire Hollinger'];
const optionsColor: string[] = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGreen', 'DarkGrey', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'GreenYellow', 'Grey', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGreen', 'LightGrey', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
const optionsObjects: object[] = [{ nomLong: 'Aménagement, architecture, art et design', abbr: 'FAAAD' }, { nomLong: 'Droit', abbr: 'FD' }, { nomLong: 'Études supérieures et postdoctorales', abbr: 'FESP' }, { nomLong: 'Foresterie, géographie et géomatique', abbr: 'FFGG' }];

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('empty', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [],
            options: []
        }),
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('options undefined', () => ({
        data: () => ({
            model1: [],
            options: undefined
        }),
        template: `<m-multi-select :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="CSS Colors" max-width="large" max-visible-chips="20">
            <template v-slot:chips="{item , index }"><div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
            <template v-slot:items="{item , index }">{{ index }} - <div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
        </m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Full width', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="CSS Colors" max-width="none" max-visible-chips="20">
            <template v-slot:chips="{item , index }"><div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
            <template v-slot:items="{item , index }">{{ index }} - <div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
        </m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('Large width', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="CSS Colors" max-width="large" max-visible-chips="20">
            <template v-slot:chips="{item , index }"><div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
            <template v-slot:items="{item , index }">{{ index }} - <div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
        </m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('500px width', () => ({
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="CSS Colors" max-width="500px" max-visible-chips="20">
            <template v-slot:chips="{item , index }"><div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
            <template v-slot:items="{item , index }">{{ index }} - <div style="display: inline-block; width: 8px; height: 8px; margin-right: 4px;" :style="{ background: item }"></div> {{ item }}</template>
        </m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('object as options', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [],
            options: optionsObjects
        }),
        template: `<div><m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1" label="Facultés">
            <template v-slot:chips="{ item , index }">{{ item.abbr }}</template>
            <template v-slot:items="{ item , index }">{{ item.nomLong }} ({{ item.abbr }})</template>
        </m-multi-select><br /><br /><br /><br /><br /><br /><br />Value: {{model1}}</div>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
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
        template: `<m-multi-select @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"><template v-slot:chips="{item , index }"> {{ index + 1 }} - {{ item }} </template></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('select all link', () => ({
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
        template: `<m-multi-select :link-select-all="true" @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<m-multi-select :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6 - select all link', () => ({
        data: () => ({
            model1: [],
            options: optionsPawPatrol
        }),
        template: `<m-multi-select :options="options" v-model="model1" :link-select-all="true"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('placeholder', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [],
            options: optionsVonTrapp
        }),
        template: `<m-multi-select placeholder="A very very very very very very looooong" @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );

storiesOf(`${modulComponentsHierarchyRootSeparator}${MULTI_SELECT_NAME}`, module)
    .add('error-message', () => ({
        methods: actions(
            'open',
            'close',
            'focus',
            'blur',
            'select'
        ),
        data: () => ({
            model1: [],
            options: optionsVonTrapp
        }),
        template: `<m-multi-select error-message="Error message" @open="open" @close="close" @focus="focus" @blur="blur" @select-item="select" :options="options" v-model="model1"></m-multi-select>`
    })
    );
