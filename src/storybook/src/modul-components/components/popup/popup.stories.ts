import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { POPUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POPUP_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        closeOnBackdrop: {
            default: boolean('Prop close-on-backdrop', true)
        },
        width: {
            default: text('Prop width', 'auto')
        },
        shadow: {
            default: boolean('Prop shadow', true)
        },
        padding: {
            default: boolean('Prop padding', true)
        },
        paddingHeader: {
            default: boolean('Prop padding-header', true)
        },
        paddingBody: {
            default: boolean('Prop padding-body', true)
        },
        paddingFooter: {
            default: boolean('Prop padding-footer', true)
        },
        background: {
            default: boolean('Prop background', true)
        },
        slotHeader: {
            default: boolean('Slot header', true)
        },
        slotFooter: {
            default: boolean('Slot footer', true)
        }
    },
    methods: actions(
        'emitOpen',
        'emitClose',
        'emitPortalMounted',
        'emitPortalAfterOpen'
    ),
    template: `<${POPUP_NAME}
        :close-on-backdrop="closeOnBackdrop"
        :width="width"
        :shadow="shadow"
        :padding="padding"
        :padding-header="paddingHeader"
        :padding-body="paddingBody"
        :padding-footer="paddingFooter"
        :background="background"
        @open="emitOpen"
        @close="emitClose"
        @portal-mounted="emitPortalMounted"
        @portal-after-open="emitPortalAfterOpen"
    >
        <m-button slot="trigger">Open popper</m-button>
        <p
            v-if="slotHeader"
            slot="header"
        >
           Slot header
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p
            v-if="slotFooter"
            slot="footer"
        >
            Slot footer
        </p>
    </${POPUP_NAME}>`
});
defaultStory.story = {
    name: 'default'
};

export const closeOnBackdropDisabled = () => `<${POPUP_NAME}
    :close-on-backdrop="false"
>
    <m-button slot="trigger">Open popper</m-button>
    <p>Cannot close popup by clicking outside</p>
</${POPUP_NAME}>`;
