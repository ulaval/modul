import { actions } from '@storybook/addon-actions';
import { SEARCHFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import './searchfield.stories.scss';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SEARCHFIELD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        value: undefined
    }),
    methods: actions(
        'search',
        'emptyField'
    ),
    template: `<${SEARCHFIELD_NAME} v-model="value" @search="search" @empty-field="emptyField"></${SEARCHFIELD_NAME}>`
});

defaultStory.story = {
    name: 'default'
};

export const placeholder = () => `<${SEARCHFIELD_NAME} placeholder="placeholder"></${SEARCHFIELD_NAME}>`;

export const label = () => `<${SEARCHFIELD_NAME} label="Search"n></${SEARCHFIELD_NAME}>`;

export const error = () => `<${SEARCHFIELD_NAME} :error="true" error-message="Error message" label="Search"></${SEARCHFIELD_NAME}>`;

export const valid = () => `<${SEARCHFIELD_NAME} :valid="true" valid-message="Valid message" label="Search"></${SEARCHFIELD_NAME}>`;

export const customVisual = () => `<${SEARCHFIELD_NAME} class="m-searchfield-stories" label="Search"></${SEARCHFIELD_NAME}>`;
