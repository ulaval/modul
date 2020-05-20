import { text } from '@storybook/addon-knobs';
import { MPostalCodeCountry } from '@ulaval/modul-components/dist/components/postalcodefield/postalcodefield';
import { POSTAL_CODE_NAME } from '@ulaval/modul-components/dist/filters/filter-names';
import PostalCodeFilterPlugin from '@ulaval/modul-components/dist/filters/postal-code/postal-code';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PostalCodeFilterPlugin);

let template: string = `<div>{{ text | f-m-postal-code(isoCountry) }}</div>`;

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POSTAL_CODE_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        text: {
            default: text('Text', '9999999')
        }
    },
    template: template
});

defaultStory.story = {
    name: 'Default'
};

export const ca = () => ({
    props: {
        text: {
            default: text('Text', 'G2B0B9')
        },
        isoCountry: {
            default: MPostalCodeCountry.CA
        }
    },
    template: template
});

export const us5Characters = () => ({
    props: {
        text: {
            default: text('Text', '99999')
        },
        isoCountry: {
            default: MPostalCodeCountry.US
        }
    },
    template
});

export const us9Characters = () => ({
    props: {
        text: {
            default: text('Text', '999999999')
        },
        isoCountry: {
            default: MPostalCodeCountry.US
        }
    },
    template
});

export const fr5Characters = () => ({
    props: {
        text: {
            default: text('Text', '99999')
        },
        isoCountry: {
            default: MPostalCodeCountry.FR
        }
    },
    template
});
