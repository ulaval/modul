import { MASKEDFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${MASKEDFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        model: ''
    }),
    template: `<${MASKEDFIELD_NAME} v-model="model"></${MASKEDFIELD_NAME}>`
});

defaultStory.story = {
    name: 'Default'
};

export const postalCodeMask = () => ({
    data: () => ({
        model: 'G1V0A6',
        options: {
            blocks: [3, 3],
            uppercase: true
        }
    }),
    template: `<${MASKEDFIELD_NAME} v-model="model" :mask-options="options"></${MASKEDFIELD_NAME}>`
});

export const postalCodeMaskWithLabel = () => ({
    data: () => ({
        model: 'G1V0A6',
        options: {
            blocks: [3, 3],
            uppercase: true
        }
    }),
    template: `<${MASKEDFIELD_NAME} v-model="model" label="Postal code" :mask-options="options"></${MASKEDFIELD_NAME}>`
});

export const postalCodeMaskWithLabelInError = () => ({
    data: () => ({
        model: '123456',
        options: {
            blocks: [3, 3]
        }
    }),
    template: `<${MASKEDFIELD_NAME} v-model="model" label="Postal code" :mask-options="options" :error="true" error-message="Invalid postal code with a long long long long long message error"></${MASKEDFIELD_NAME}>`
});

export const telephoneMask = () => ({
    data: () => ({
        model: '+14186562131',
        options: {
            blocks: [2, 3, 3, 4],
            prefix: '+1',
            delimiters: [' ', ' ', '-'],
            numericOnly: true
        }
    }),
    template: `<${MASKEDFIELD_NAME} v-model="model" :mask-options="options"></${MASKEDFIELD_NAME}>`
});
