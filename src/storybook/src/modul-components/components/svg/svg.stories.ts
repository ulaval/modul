import { actions } from '@storybook/addon-actions';
import { color, select, text } from '@storybook/addon-knobs';
import { SVG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { SvgSpriteService } from '@ulaval/modul-components/dist/utils/svg/svg-sprite';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { importAllSvg } from './svg-importation';

/**  @TODO  Ne fonctionne pas pour l'instant, il faudra trouver un moyen de chunker les svg */
// export const importAllSvg = (): Promise<any> => import(/* webpackChunkName: "svgimportation" */ './svg-importation').then((exports: any) => {
//     return exports.importAllSvg;
// });

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SVG_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        name: {
            default: select<ModulIconName>(
                'Prop name',
                Enums.toValueArray(ModulIconName) as ModulIconName[],
                ModulIconName.Profile
            )
        },
        width: {
            default: text('Prop width', '3em')
        },
        height: {
            default: text('Prop height', '3em')
        },
        svgTitle: {
            default: text(
                'Prop svg-title',
                'Inspect the HTML to see title tag inside the SVG.'
            )
        },
        svgColor: {
            default: color('SVG color', '#000')
        }
    },
    beforeCreate() {
        importAllSvg();
    },
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave', 'emitSvgId'),
    template: `<${SVG_NAME}
        :name="name"
        :svg-title="svgTitle"
        :width="width"
        :height="height"
        @click="emitClick"
        @keydown="emitKeydown"
        @mouseover="emitMouseover"
        @mouseleave="emitMouseleave"
        @svg-id="emitSvgId"
        :style="{ color: svgColor }"
    />`
});

defaultStory.story = {
    name: 'sandbox'
};

export const PropCustomSvg = () => ({
    beforeCreate() {
        const svg: SvgSpriteService = Vue.prototype.$svgSprite;
        svg.addSvg('custom-icon', require('./custom-icon.svg'));
    },
    template: `<${SVG_NAME}
        name="custom-icon"
        width="5em"
        height="5em"
    />`
});

export const PropWidth = () => ({
    props: {
        width: {
            default: text('Prop width', '50px')
        }
    },
    beforeCreate() {
        importAllSvg();
    },
    template: `<${SVG_NAME}
        name="lock"
        :width="width"
        :height="width"
    />`
});

export const PropHeight = () => ({
    props: {
        height: {
            default: text('Prop height', '120px')
        }
    },
    beforeCreate() {
        importAllSvg();
    },
    template: `<${SVG_NAME}
        name="profile"
        :width="height"
        :height="height"
    />`
});

export const PropSvgTitle = () => ({
    props: {
        svgTitle: {
            default: text('Prop svg-title', 'Inspect the HTML to see title tag inside the SVG.')
        }
    },
    beforeCreate() {
        importAllSvg();
    },
    template: `<${SVG_NAME}
        name="clock"
        :svg-title="svgTitle"
        width="3em"
        height="3em"
    />`
});
