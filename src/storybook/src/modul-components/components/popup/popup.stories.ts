import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { POPUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POPUP_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: function() {
        return {
            open: false,
            allo: null,
            allo2: null,
            reference: null,
            trigger: null,
            texte: ''
        };
    },
    mounted() {
        this.$data.allo = document.getElementById('allo');
        this.$data.allo2 = document.getElementById('allo2');
        // this.$data.reference = this.$data.allo2;
        this.$data.reference = this.$data.allo;
        console.log(this.$data.allo);
        const refNo = document.getElementById('no');
        this.$data.allo?.addEventListener('click', () => {
            // this.$data.reference = this.$data.allo;
            this.$data.reference = this.$data.allo;
            this.$data.open = !this.$data.open;
            console.log('NO', this.$data.reference);
            this.$data.texte = 'Titre 1';
        });
        this.$data.allo2?.addEventListener('click', () => {
            // this.$data.reference = this.$data.allo2;
            this.$data.reference = this.$data.allo2;
            this.$data.open = !this.$data.open;
            console.log('NO', this.$data.reference);
            this.$data.texte = 'Titre 2';
        });
    },
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
        'emitPortalAfterOpen',
        'emitAfterEnter'
    ),
    template: `<div><${POPUP_NAME}
        :close-on-backdrop="closeOnBackdrop"
        :open.sync="open"
        :width="width"
        :shadow="shadow"
        :padding="padding"
        :padding-header="paddingHeader"
        :padding-body="paddingBody"
        :padding-footer="paddingFooter"
        :background="background"
        :reference="reference"
        @open="emitOpen"
        @close="emitClose"
        @portal-mounted="emitPortalMounted"
        @portal-after-open="emitPortalAfterOpen"
        @after-enter="emitAfterEnter"
    >

        <p
            v-if="slotHeader"
            slot="header"
        >
           Slot header
           {{texte}}
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p
            v-if="slotFooter"
            slot="footer"
        >
            Slot footer

        </p>
    </${POPUP_NAME}>
    <p>NO</p>
    <p id="no">NO</p>
    <p id="allo2" style="width: 600px; padding: 20px">Allo2</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p>NO</p>
    <p id="allo" style="width: 200px; padding: 20px">Allo</p>
    open = {{open}}
    </div>`
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
