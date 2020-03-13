import { POSTALCODEFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MPostalCodeFormat } from '@ulaval/modul-components/dist/components/postalcodefield/postalcodefield';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POSTALCODEFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        model: 'asdfa2341234'
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

export const other = () => ({
    data: () => ({
        model: 'G1V0A6',
        postalCodeFormat: MPostalCodeFormat.Other
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model" :postal-code-format="postalCodeFormat"></${POSTALCODEFIELD_NAME}>`
});

export const UnitedStates = () => ({
    data: () => ({
        model: '10001',
        postalCodeFormat: MPostalCodeFormat.UnitedStates
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model" :postal-code-format="postalCodeFormat"></${POSTALCODEFIELD_NAME}>`
});

export const France = () => ({
    data: () => ({
        model: '75012',
        postalCodeFormat: MPostalCodeFormat.France
    }),
    template: `<${POSTALCODEFIELD_NAME} v-model="model" :postal-code-format="postalCodeFormat"></${POSTALCODEFIELD_NAME}>`
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
