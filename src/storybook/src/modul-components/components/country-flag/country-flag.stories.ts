import { actions } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import { COUNTRY_FLAG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MCountryCodeISO2 } from '@ulaval/modul-components/dist/utils/country/country';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${COUNTRY_FLAG_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        codeIso2: {
            default: select(
                'Prop code-iso2',
                Enums.toValueArray(MCountryCodeISO2).filter(code => code !== MCountryCodeISO2.Empty),
                MCountryCodeISO2.Unitedstates
            )
        },
        width: {
            default: text(
                'Prop width',
                '4em'
            )
        },
        height: {
            default: text(
                'Prop height',
                '4em'
            )
        }
    },
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: `<${COUNTRY_FLAG_NAME}
        :code-iso2="codeIso2"
        :width="width"
        :height="height"
        @click="emitClick"
        @keydown="emitKeydown"
        @mouseover="emitMouseover"
        @mouseleave="emitMouseleave"
    />`
});

defaultStory.story = {
    name: 'default'
};


export const AllCountries = () => ({
    props: {
        width: {
            default: text(
                'Prop width',
                '60px'
            )
        },
        height: {
            default: text(
                'Prop height',
                '35px'
            )
        }
    },
    data: () => ({
        codesAllCounties: Enums.toValueArray(MCountryCodeISO2).filter(code => code !== MCountryCodeISO2.Empty)
    }),
    template: `<div>
        <div
            v-for="code in codesAllCounties"
            :key="code"
            style="display: inline-flex; flex-direction: column; align-items: center; margin: 0 8px 12px 0;"
        >
            <${COUNTRY_FLAG_NAME}
                :code-iso2="code"
                :width="width"
                :height="height"
                :title="code"
                style=""
            />
            <span
                style="margin-top: 2px; font-size: 12px"
            >
                {{ code }}
            </span>
        <div>
    </div>`
});
