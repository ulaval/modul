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
                Enums.toValueArray(MCountryCodeISO2),
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
    template: `<${COUNTRY_FLAG_NAME}
        :code-iso2="codeIso2"
        :width="width"
        :height="height"
    />`
});

defaultStory.story = {
    name: 'default'
};

// export const disabled = () => '<m-button :disabled="true">A Button</m-button>';
