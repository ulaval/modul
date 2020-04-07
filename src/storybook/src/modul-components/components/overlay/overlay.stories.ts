import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
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
            <${OVERLAY_NAME} title="Title" @save="save" @cancel="cancel">
                <m-button slot="trigger">Open</m-button>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
            </${OVERLAY_NAME}>
        </div>`
});

defaultStory.story = {
    name: 'default'
};

export const sandbox = () => ({
    methods: actions(
        'emitSave',
        'emitCancel',
        'emitOpen',
        'emitClose',
        'emitPortalAfterOpen',
        'emitPortalAfterClose'
    ),
    props: {
        id: {
            default: text('Prop id', `${OVERLAY_NAME}-stories-sandbox`)
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
        disableSaveButton: {
            default: boolean('Prop disable-save-button', false)
        },
        waiting: {
            default: boolean('Prop waiting', false)
        },
        focusManagement: {
            default: boolean('Prop focus-management', true)
        },
        slotDefault: {
            default: boolean('Slot default', true)
        },
        slotHeader: {
            default: boolean('Slot header', false)
        },
        slotFooter: {
            default: boolean('Slot footer', false)
        }
    },

    template: `<${OVERLAY_NAME}
        :id="id"
        :open="open"
        :disabled="disabled"
        :class-name="className"
        :preload="preload"
        :lazy="lazy"
        :padding="padding"
        :padding-header="paddingHeader"
        :padding-body="paddingBody"
        :padding-footer="paddingFooter"
        :disable-save-button="disableSaveButton"
        :waiting="waiting"
        :focus-management="focusManagement"
        @save="emitSave"
        @cancel="emitCancel"
        @open="emitOpen"
        @close="emitClose"
        @portal-after-open="emitPortalAfterOpen"
        @portal-after-close="emitPortalAfterClose"
    >
        <p v-if="slotDefault" class="m-u--no-margin">Slot default</p>
        <div v-if="slotHeader" slot="header">(Slot header)</div>
        <div v-if="slotFooter" slot="footer">(Slot footer)</div>
    </${OVERLAY_NAME}>`
});

export const overflowContent = () => ({
    template: `<div>
            <${OVERLAY_NAME} title="Title" >
                <m-button slot="trigger">Open</m-button>
                <h2 slot="header"
                style="margin:0;">Title</h2>
                <p>Native input</p>
                <input type="text" />
                <input type="text" />
                <p class="m-u--margin-top--l">modUL input</p>
                <p style="margin:0;">
                    <m-textfield label="Lorem ipsum dolor sit amet"></m-textfield>
                </p>
                <p style="margin:0;">
                    <m-textfield label="Lorem ipsum dolor sit amet"></m-textfield>
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
                    nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
                </p>
            </${OVERLAY_NAME}>
        </div>`
});

export const loading = () => ({
    data: () => ({
        waiting: false
    }),
    methods: {
        toggleWaiting(): void {
            this.waiting = !this.waiting;
        }
    },
    template: `<div>
                <${OVERLAY_NAME} title="Titre"develop
                    :waiting="waiting">
                    <m-button slot="trigger">Open</m-button>
                    <h2 slot="header"
                    style="margin: 0;">Title</h2>

                    <m-button @click="toggleWaiting">Put waiting mode</m-button>

                </${OVERLAY_NAME}>
        </div>`
});

export const customFooter = () => ({
    methods: {
        fermerFenetre(): void {
            console.log('fermer');
        }
    },
    template: `<div>
    <${OVERLAY_NAME} title="Title" >
        <m-button slot="trigger">Open</m-button>
        <h2 slot="header" style="margin:0;">Custom footer</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
        </p>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis magni reiciendis iste nulla eum velit error
            nihil corrupti. At culpa accusamus autem dignissimos aliquid quae ratione ipsa, reiciendis quod vero?
        </p>
        <div slot="footer">
            <m-link mode="button"
                    @click="fermerFenetre()"
                    ref="boutonFermer">
                fermer
            </m-link>
        </div>
    </${OVERLAY_NAME}>
</div>`
});

export const hideFooter = () => ({
    template: `<div>
    <${OVERLAY_NAME} :hide-footer="true" :open="true" >
        <h2 slot="header">Title</h2>
    </${OVERLAY_NAME}>
</div>`
});
