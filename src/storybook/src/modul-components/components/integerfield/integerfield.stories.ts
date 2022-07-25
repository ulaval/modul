import { actions } from '@storybook/addon-actions';
import { INTEGERFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${INTEGERFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const DefaultStory = () => ({
    methods: actions(
        'click',
        'focus',
        'blur'
    ),
    template: '<m-integerfield @click="click" @focus="focus" @blur="blur"/>'
});

DefaultStory.story = {
    name: 'default'
};

export const Label = () => '<m-integerfield label="Extension"/>';

export const Value = () => '<m-integerfield value="1234" />';

export const Waiting = () => '<m-integerfield :waiting="true"/>';

export const Readonly = () => '<m-integerfield :readonly="true"/>';

export const Error = () => '<m-integerfield :error="true" error-message="Invalide number"/>';

export const Autocomplete = () => '<m-integerfield autocomplete="home tel-extension"/>';

export const Min10Max20 = () => ({
    data: () => ({
        value: '5'
    }),
    template: '<m-integerfield v-model="value" min="10" max="20"/>'
});
