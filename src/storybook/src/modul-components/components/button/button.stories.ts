import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { BUTTON_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${BUTTON_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        text: {
            default: text('Text', 'A Button')
        }
    },
    methods: actions(
        'click',
        'focus',
        'blur'
    ),
    template: '<m-button @click="click" @focus="focus" @blur="blur">{{ text }}</m-button>'
});

defaultStory.story = {
    name: 'default'
};

export const disabled = () => '<m-button :disabled="true">A Button</m-button>';

export const waiting = () => '<m-button :waiting="true">A Button</m-button>';

export const disabledAndWaiting = () => '<m-button :disabled="true" :waiting="true">A Button</m-button>';

export const fullsize = () => '<m-button fullSize="true">A Button</m-button>';

export const precision = () => '<m-button >A Button <template slot="precision">Button precision</template></m-button>';

export const submit = () => '<m-button type="submit">A Button</m-button>';

export const reset = () => '<m-button type="reset">A Button</m-button>';

export const secondaryDefault = () => '<m-button skin="secondary">A Button</m-button>';

export const secondaryDisabled = () => '<m-button skin="secondary" :disabled="true">A Button</m-button>';

export const secondaryWaiting = () => '<m-button skin="secondary" :waiting="true">A Button</m-button>';

export const secondaryFullSize = () => '<m-button :fullSize="true" skin="secondary">A Button</m-button>';

export const secondaryIcon = () => '<m-button icon-name="m-svg__close-clear" skin="secondary">A Button</m-button>';

export const secondaryIcon20Px = () => '<m-button icon-name="m-svg__close-clear" icon-size="20px" skin="secondary">A Button</m-button>';

export const iconPositionRight = () => '<m-button icon-name="m-svg__close-clear" icon-position="right" skin="secondary">A Button</m-button>';

export const secondaryPrecision = () => '<m-button skin="secondary" >A Button <template slot="precision">Button precision</template></m-button>';

export const icon = () => '<m-button icon-name="m-svg__close-clear">A Button</m-button>';

export const iconDisabled = () => '<m-button :disabled="true" icon-name="m-svg__close-clear">A Button</m-button>';

export const iconWaiting = () => '<m-button icon-name="m-svg__close-clear" waiting="true">A Button</m-button>';

export const iconFullSize = () => '<m-button :fullSize="true" icon-name="m-svg__close-clear">A Button</m-button>';

export const icon20Px = () => '<m-button icon-name="m-svg__close-clear" icon-size="20px">A Button</m-button>';

export const iconPrecision = () => '<m-button icon-name="m-svg__close-clear">A Button <template slot="precision">' +
    'Button precision</template></m-button>';
