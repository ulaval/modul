import { actions } from '@storybook/addon-actions';
import { INTEGERFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${INTEGERFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
    },
    methods: actions(
        'click',
        'focus',
        'blur'
    ),
    template: '<m-integerfield @click="click" @focus="focus" @blur="blur"></m-integerfield>'
});

defaultStory.story = {
    name: 'default'
};

export const label = () => '<m-integerfield label="Extension"></m-integerfield>';

export const value = () => '<m-integerfield value="1234"></m-integerfield>';

export const waiting = () => '<m-integerfield :waiting="true"></m-integerfield>';

export const readonly = () => '<m-integerfield :readonly="true"></m-integerfield>';

export const error = () => '<m-integerfield :error="true" error-message="Invalide number"></m-integerfield>';

export const autocomplete = () => '<m-integerfield autocomplete="home tel-extension"></m-integerfield>';
