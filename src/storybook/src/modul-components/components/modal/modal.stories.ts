import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { MODAL_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MModalSize } from '@ulaval/modul-components/dist/components/modal/modal';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import './modal-stories.scss';

storiesOf(`${modulComponentsHierarchyRootSeparator}${MODAL_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                   </${MODAL_NAME}>`
    }))
    .add('sandbox', () => ({
        methods: actions(
            'emitOpen',
            'emitClose',
            'emitPortalAfterOpen',
            'emitPortalAfterClose'
        ),
        props: {
            id: {
                default: text('Prop id', `${MODAL_NAME}-stories-sandbox`)
            },
            open: {
                default: boolean('Prop open', true)
            },
            disabled: {
                default: boolean('Prop disabled', false)
            },
            className: {
                default: text('Prop class-name', 'class-name-test')
            },
            preload: {
                default: boolean('Prop preload', false)
            },
            lazy: {
                default: boolean('Prop lazy', true)
            },
            focusManagement: {
                default: boolean('Prop focus-management', true)
            },
            closeOnBackdrop: {
                default: boolean('Prop close-on-backdrop', true)
            },
            title: {
                default: text('Prop title', 'Tilte')
            },
            slotDefault: {
                default: boolean('Slot default', true)
            },
            slotHeader: {
                default: boolean('Slot header', false)
            },
            slotFooter: {
                default: boolean('Slot footer', true)
            }
        },
        template: `<${MODAL_NAME}
            :id="id"
            :open="open"
            :title="title"
            :close-on-backdrop="closeOnBackdrop"
            :disabled="disabled"
            :class-name="className"
            :preload="preload"
            :lazy="lazy"
            :focus-management="focusManagement"
            @open="emitOpen"
            @close="emitClose"
            @portal-after-open="emitPortalAfterOpen"
            @portal-after-close="emitPortalAfterClose">
            <p v-if="slotDefault" class="mu-no-m">Slot default</p>
            <div v-if="slotHeader" slot="header">(Slot header)</div>
            <div v-if="slotFooter" slot="footer">(Slot footer)</div>
        </${MODAL_NAME}>`
    }))
    .add('close-on-backdrop="false"', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" :close-on-backdrop="false" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('title', () => ({
        data: () => ({
            openProp: true
        }),
        props: {
            title: {
                default: text('title', 'This is a custom title')
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" :title="title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('custom padding by css var', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} class-name="m-modal-stories--padding" :open.sync="openProp" title="A modal header with custom padding">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text with custom padding
                        <p slot="footer">Some footer with custom padding</p>
                   </${MODAL_NAME}>`
    }))
    .add('custom top offset by css var', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} class-name="m-modal-stories--offset" :open.sync="openProp" title="Header">
                        <m-button slot="trigger">Open the modal</m-button>
                        This modal is offset by 44px on mobile (--m-modal--top). Can be used to offset fixed content like sticky header and such.
                        <p slot="footer">Footer</p>
                   </${MODAL_NAME}>`
    }))
    .add('custom header', () => ({
        data: () => ({
            openProp: true
        }),
        methods: {
            alert(): void {
                alert('Custon action');
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" title="title">
                        <m-button slot="trigger">Open the modal</m-button>
                        <template slot="header-bouton">
                            <m-button @click="alert()">Custom button action</m-button>
                        </template>
                        Body content
                        <p slot="footer">Footer</p>
                   </${MODAL_NAME}>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${MODAL_NAME}/size`, module)
    .add('size="small"', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" size="small" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('size="regular"', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" size="regular" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('size="large"', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" size="large" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('size="full-screen"', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" size="full-screen" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${MODAL_NAME}/slots`, module)


    .add('trigger', () => ({
        data: () => ({
            openProp: false
        }),
        template: `<${MODAL_NAME}>
                        <m-button slot="trigger">Open the modal (trigger)</m-button>
                        Some body text
                   </${MODAL_NAME}>`
    }))
    .add('footer', () => ({
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp">
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${MODAL_NAME}/all props`, module)


    .add('make your own', () => ({
        data: () => ({
            openProp: true
        }),
        props: {
            closeOnBackdrop: {
                default: boolean('close-on-backdrop', true)
            },
            title: {
                default: text('title', 'This is a custom title')
            },
            size: {
                default: select('size', Object.values(MModalSize), MModalSize.Regular)
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" :close-on-backdrop="closeOnBackdrop"
                    :size="size" :title="title">
                        <m-button slot="trigger">Open the modal (trigger)</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                    </${MODAL_NAME}>`
    }));
