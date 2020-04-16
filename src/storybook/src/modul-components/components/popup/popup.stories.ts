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
            default: boolean('Toggle closeOnBackdrop', true)
        },
        width: {
            default: text('Width', 'auto')
        },
        shadow: {
            default: boolean('Toggle shadow', true)
        },
        padding: {
            default: boolean('Toggle padding', true)
        },
        paddingHeader: {
            default: boolean('Toggle paddingHeader', true)
        },
        paddingBody: {
            default: boolean('Toggle paddingBody', true)
        },
        paddingFooter: {
            default: boolean('Toggle paddingFooter', true)
        },
        background: {
            default: boolean('Toggle background', true)
        }
    },
    methods: actions(
        'open',
        'close',
        'portalMounted',
        'portalAfterOpen'
    ),
    template: `<div>
                <m-popup :close-on-backdrop="closeOnBackdrop" :width="width" :shadow="shadow" :padding="padding" :padding-header="paddingHeader" :padding-body="paddingBody" :padding-footer="paddingFooter" :background="background" @open="open" @close="close" @portal-mounted="portalMounted" @portal-after-open="portalAfterOpen">
                    <m-button slot="trigger">Open popper</m-button>
                    <p slot="header">Header</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p slot="footer">Footer</p>
                </m-popup>
            </div>`
});
defaultStory.story = {
    name: 'default'
};

export const closeOnBackdropDisabled = () => '<m-popup :close-on-backdrop="false"><m-button slot="trigger">Open popper</m-button><p>Cannot close popup by clicking outside</p></m-popup>';
