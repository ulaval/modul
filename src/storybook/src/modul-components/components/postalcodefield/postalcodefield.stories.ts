import { POSTALCODEFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POSTALCODEFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        model: ''
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model"></${POSTALCODEFIELD_NAME}>`
});

defaultStory.story = {
    name: 'Default'
};

export const withValue = () => ({
    data: () => ({
        model: 'G1V0A6'
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model"></${POSTALCODEFIELD_NAME}>`
});

export const withNotPostalCodeDefaultValue = () => ({
    data: () => ({
        model: 'ad23dgvb3ssdffdd'
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model"></${POSTALCODEFIELD_NAME}>`
});

export const withLabelAndError = () => ({
    data: () => ({
        model: '123456'
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model" label="Postal code" :error="true" error-message="Invalid postal code with a long long long long long message error"></${POSTALCODEFIELD_NAME}>`
});

export const withLabelUpAndFullWidth = () => ({
    data: () => ({
        model: ''
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model" label="Postal code" :label-up="true" max-width="100%"></${POSTALCODEFIELD_NAME}>`
});
