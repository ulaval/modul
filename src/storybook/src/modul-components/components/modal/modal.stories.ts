import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { MODAL_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MModalSize } from '@ulaval/modul-components/dist/components/modal/modal';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

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
            :padding="padding"
            :padding-header="paddingHeader"
            :padding-body="paddingBody"
            :padding-footer="paddingFooter"
            :focus-management="focusManagement"
            @open="emitOpen"
            @close="emitClose"
            @portal-after-open="emitPortalAfterOpen"
            @portal-after-close="emitPortalAfterClose"
        >
            <p v-if="slotDefault" class="m-u--no-margin">Slot default</p>
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
    .add('padding="false"', () => ({
        data: () => ({
            openProp: true
        }),
        props: {
            padding: {
                default: boolean('padding', true)
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" :padding="false" title="A modal title without padding">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text without padding
                        <p slot="footer">Some footer slot content without padding</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('padding-header="false"', () => ({
        data: () => ({
            openProp: true
        }),
        props: {
            paddingHeader: {
                default: boolean('paddingHeader', true)
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" :padding-header="false" title="A modal title without padding">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('padding-body="false"', () => ({
        props: {
            paddingBody: {
                default: boolean('padding-body', true)
            }
        },
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" :padding-body="false" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text without padding
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                   </${MODAL_NAME}>`
    }))
    .add('padding-footer', () => ({
        props: {
            paddingFooter: {
                default: boolean('padding-footer', true)
            }
        },
        data: () => ({
            openProp: true
        }),
        template: `<${MODAL_NAME} :open.sync="openProp" :padding-footer="false" title="A modal title">
                        <m-button slot="trigger">Open the modal</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content without padding</p>
                        <m-button slot="footer">Here goes nothing</m-button>
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
        template: `<${MODAL_NAME} size="size">
                        <m-button slot="trigger">Open the modal (trigger)</m-button>
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
            padding: {
                default: boolean('padding', true)
            },
            paddingHeader: {
                default: boolean('padding-header | (no effect if padding === false)', true)
            },
            paddingBody: {
                default: boolean('padding-body | (no effect if padding === false)', true)
            },
            paddingFooter: {
                default: boolean('padding-footer | (no effect if padding === false)', true)
            },
            size: {
                default: select('size', Object.values(MModalSize), MModalSize.Regular)
            }
        },
        template: `<${MODAL_NAME} :open.sync="openProp" :close-on-backdrop="closeOnBackdrop"
                    :padding="padding" :padding-header="paddingHeader" :padding-body="paddingBody"
                    :padding-footer="paddingFooter" :size="size" :title="title">
                        <m-button slot="trigger">Open the modal (trigger)</m-button>
                        Some body text
                        <p slot="footer">Some footer slot content</p>
                        <m-button slot="footer">Here goes nothing</m-button>
                    </${MODAL_NAME}>`
    }));
