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
    <m-textarea label="Disabled"
                value="Lorem Ipsum"
                :disabled="true"></m-textarea>
    <m-textarea label="Readonly"
                value="Lorem Ipsum"
                :readonly="true"></m-textarea>
    <m-textarea label="Waiting"
                value="Lorem Ipsum"
                :waiting="true"></m-textarea><br>
    <m-textarea label="Disabled and error"
                value="Lorem Ipsum"
                :disabled="true"
                error-message="Error"></m-textarea>
    <m-textarea label="Readonly and error"
                value="Lorem Ipsum"
                :readonly="true"
                error-message="Error"></m-textarea>
    <m-textarea label="Waiting and error"
                value="Lorem Ipsum"
                :waiting="true"
                error-message="Error"></m-textarea><br>
    <m-textarea label="Disabled and readonly"
                value="Lorem Ipsum"
                :disabled="true"
                :readonly="true"></m-textarea>
    <m-textarea label="Disabled and waiting"
                value="Lorem Ipsum"
                :disabled="true"
                :waiting="true"></m-textarea>
    <m-textarea label="Readonly and waiting"
                value="Lorem Ipsum"
                :readonly="true"
                :waiting="true"></m-textarea>
    <m-textarea label="Disabled, readonly and waiting"
                value="Lorem Ipsum"
                :disabled="true"
                :readonly="true"
                :waiting="true"></m-textarea>
</div>`;
