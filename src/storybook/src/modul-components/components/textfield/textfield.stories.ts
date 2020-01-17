import { actions } from '@storybook/addon-actions';
import { TEXTAREA_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${TEXTAREA_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        model: ''
    }),
    methods: actions(
        'input',
        'focus',
        'blur'
    ),
    template: `<div>
        <m-textarea v-model="model"
                    @input="input"
                    @focus="focus"
                    @blur="blur"></m-textarea>
        <br/>model value = {{model}}
    </div>`
});

defaultStory.story = {
    name: 'default'
};

export const state = () => `<div>
        <m-textarea :disabled="true"
                    :waiting="true"
                    :readonly="true"
                    label="Disables & waiting & readonly"
                    value="value"></m-textarea>
        <m-textarea :waiting="true"
                    :readonly="true"
                    label="Waiting & readonly"
                    value="value"></m-textarea>
        <m-textarea :disabled="true"
                    :readonly="true"
                    label="Disabled & readonly"
                    value="value"></m-textarea>
        <m-textarea :waiting="true"
                    label="Waiting"
                    value="value"></m-textarea>
    </div>`;
