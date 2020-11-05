import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { ACCORDION_NAME, ACCORDION_TRANSITION_NAME, BUTTON_GROUP_NAME, CHECKBOX_NAME, I18N_NAME, INPLACE_EDIT_NAME, INPUT_STYLE_NAME, LINK_NAME, PLUS_NAME, RADIO_GROUP_NAME, RADIO_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MPlus, MPlusSkin } from '../plus/plus';
import { MAccordionTransition } from '../transitions/accordion-transition/accordion-transition';
import WithRender from './accordion.html?style=./accordion.scss';

export enum MAccordionSkin {
    Default = 'default',
    Dark = 'dark',
    DarkB = 'dark-b',
    Light = 'light',
    Plain = 'plain'
}

export enum MAccordionIconPosition {
    Left = 'left',
    Right = 'right'
}

export enum MAccordionIconSize {
    Small = 'small',
    Large = 'large'
}

export interface AccordionGateway extends Vue {
    propId: string;
    propOpen: boolean;
    propDisabled: boolean;
}

export interface AccordionGroupGateway {
    skin: MAccordionSkin;
    disabled: boolean;
    concurrent: boolean;
    addAccordion(accordion: AccordionGateway): void;
    removeAccordion(id: string): void;
    closeAllAccordions(): any;
}

export const ACCORDION_CLOSEST_ELEMENTS: string = `[href], [onclick], [for], a, button, input, textarea, radio, .${BUTTON_GROUP_NAME}, .${INPUT_STYLE_NAME}, .${CHECKBOX_NAME}, .${RADIO_GROUP_NAME}, .${RADIO_NAME}, .${LINK_NAME}, .${INPLACE_EDIT_NAME}`;

function isAccordionGroup(parent: any): parent is AccordionGroupGateway {
    return parent && 'addAccordion' in parent;
}

@WithRender
@Component({
    components: {
        [ACCORDION_TRANSITION_NAME]: MAccordionTransition,
        [PLUS_NAME]: MPlus,
        [I18N_NAME]: MI18n
    }
})
export class MAccordion extends ModulVue implements AccordionGateway {
    @Prop()
    public readonly id?: string;

    @Prop({
        default: false
    })
    public readonly open!: boolean;

    @Prop({
        default: false
    })
    public readonly disabled!: boolean;

    @Prop({
        default: MAccordionSkin.Default,
        validator: value => Enums.toValueArray(MAccordionSkin).includes(value)
    })
    public readonly skin: MAccordionSkin;

    @Prop({
        default: MAccordionIconPosition.Left,
        validator: value => Enums.toValueArray(MAccordionIconPosition).includes(value)
    })
    public readonly iconPosition?: MAccordionIconPosition;

    @Prop()
    public readonly iconBorder!: boolean;

    @Prop({
        default: MAccordionIconSize.Large,
        validator: value => Enums.toValueArray(MAccordionIconSize).includes(value)
    })
    public readonly iconSize?: MAccordionIconSize;

    @Prop({ default: true })
    public readonly padding!: boolean;

    @Prop({ default: true })
    public readonly paddingHeader!: boolean;

    @Prop({ default: true })
    public readonly paddingBody!: boolean;

    @Prop({ default: false })
    public readonly keepContentAlive!: boolean;

    @Ref('accordionHeader')
    public readonly refAccordionHeader: HTMLElement;

    public titleMenuOpen: string = this.$i18n.translate('m-accordion:open');
    public titleMenuClose: string = this.$i18n.translate('m-accordion:close');

    private uuid: string = uuid.generate();
    private internalOpen: boolean = false;

    @Emit('click')
    public emitClick(event: Event): void {}

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void {}

    @Watch('open', { immediate: true })
    public onOpenChange(open: boolean): void {
        this.internalOpen = open;
    }

    public get propDisabled(): boolean {
        return (
                isAccordionGroup(this.$parent) &&
                this.$parent.disabled
            ) ||
            this.disabled;
    }

    public get propId(): string {
        return this.id || this.uuid;
    }

    public get idBodyWrap(): string {
        return `${this.propId}-body-wrap`;
    }

    public get classBody(): Object {
        return {
            'm--has-padding': this.paddingBody && this.padding
        };
    }

    public get propOpen(): boolean {
        return this.internalOpen;
    }

    public set propOpen(open: boolean) {
        if (open !== this.internalOpen) {
            this.internalOpen = open;
            this.emitUpdateOpen(open);
        }
    }

    public get headerTabindex(): number | undefined {
        return this.propDisabled || !this.hasContent() ? undefined : 0;
    }

    public get headerHiddenText(): string {
        return this.open ? this.titleMenuClose : this.titleMenuOpen;
    }

    public get isIconPositionLeft(): boolean {
        return this.iconPosition === MAccordionIconPosition.Left;
    }

    public get isIconSizeLarge(): boolean {
        return this.iconSize === MAccordionIconSize.Large;
    }

    public get deltaHeight(): number {
        switch (this.propSkin) {
            case MAccordionSkin.Default:
            case MAccordionSkin.Dark:
            case MAccordionSkin.DarkB:
                return 32;
            default:
                return 0;
        }
    }

    public get propSkin(): MAccordionSkin {
        return isAccordionGroup(this.$parent) ? this.$parent.skin : this.skin;
    }

    public get plusSkin(): MPlusSkin {
        if (this.skin === MAccordionSkin.DarkB) {
            if (this.propOpen) {
                return MPlusSkin.CurrentColor;
            } else {
                return MPlusSkin.Light;
            }
        } else {
            return MPlusSkin.Default;
        }
    }

    public get hasIconBorder(): boolean {
        if (this.iconBorder) {
            return this.iconBorder;
        }

        return this.propSkin === MAccordionSkin.Light;
    }

    public hasContent(): boolean {
        return Boolean(this.$slots.default);
    }

    public toggleAccordion(event: Event): void {
        if (!this.hasContent()) {
            return;
        }

        const target: Element | null = (event.target as HTMLElement).closest(ACCORDION_CLOSEST_ELEMENTS);

        if (!this.propDisabled && !target) {
            const initialState: boolean = this.internalOpen;

            if (
                !this.internalOpen &&
                isAccordionGroup(this.$parent) &&
                this.$parent.concurrent
            ) {
                this.$parent.closeAllAccordions();
            }

            this.refAccordionHeader.blur();
            this.propOpen = !initialState;
            this.emitClick(event);
        }
    }

    protected created(): void {
        if (isAccordionGroup(this.$parent)) {
            this.$parent.addAccordion(this);
        }
    }

    protected beforeDestroy(): void {
        if (isAccordionGroup(this.$parent)) {
            this.$parent.removeAccordion(this.propId);
        }
    }
}

const AccordionPlugin: PluginObject<any> = {
    install(v): void {
        v.component(ACCORDION_NAME, MAccordion);
    }
};

export default AccordionPlugin;
