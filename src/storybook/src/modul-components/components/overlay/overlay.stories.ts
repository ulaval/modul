import { actions } from '@storybook/addon-actions';
import { OVERLAY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${OVERLAY_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    methods: actions(
        'save',
        'cancel'
    ),
    template: `<div>
            <m-overlay title="Title" @save="save" @cancel="cancel">
                <m-button slot="trigger">Open</m-button>
                <m-dropdown class="m-u--margin-bottom--s" :filterable="true" :clear-model-on-selected-text="true" label="Vegetable" v-model="model1">
                    <m-dropdown-item value="1" label="Artichoke"></m-dropdown-item>
                    <m-dropdown-item value="2" label="Asparagus"></m-dropdown-item>
                    <m-dropdown-item value="3" label="Broccoli"></m-dropdown-item>
                    <m-dropdown-item value="4" label="Bok choy"></m-dropdown-item>
                    <m-dropdown-item value="5" label="Lettuce"></m-dropdown-item>
                    <m-dropdown-item value="6" label="Tomato"></m-dropdown-item>
                </m-dropdown>
                <m-textfield></m-textfield>
            </m-overlay>
        </div>`
});

defaultStory.story = {
    name: 'default'
};

