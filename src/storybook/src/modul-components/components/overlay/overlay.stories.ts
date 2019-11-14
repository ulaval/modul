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
                <m-textfield></m-textfield>
            </m-overlay>
        </div>`
});

defaultStory.story = {
    name: 'default'
};

