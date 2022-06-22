import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref } from 'vue-property-decorator';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { OVERLAY_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import WithRender from './overlay.html?style=./overlay.scss';
@WithRender
@Component({
    components: {
        MButton,
        MI18n
    },
    mixins: [Portal, MFocusTrap]
})
export class MOverlay extends ModulVue {
    @Prop({ default: true })
    public readonly focusManagement: boolean;

    @Prop({ default: true })
    public readonly padding: boolean;

    @Prop({ default: true })
    public readonly paddingHeader: boolean;

    @Prop({ default: true })
    public readonly paddingBody: boolean;

    @Prop({ default: true })
    public readonly paddingFooter: boolean;

    @Prop({ default: false })
    public readonly disableSaveButton: boolean;

    @Prop({ default: false })
    public readonly waiting: boolean;

    @Prop({ default: false })
    public readonly hideFooter: boolean;

    public readonly hasKeyboard: boolean = false;

    @Ref('article')
    public readonly refArticle?: HTMLElement;

    public $refs: {
        dialogWrap: HTMLElement,
        body: HTMLElement,
        footer: HTMLElement,
        article: Element
    };

    @Emit('save')
    public emitSave(event: MouseEvent): void { }

    @Emit('cancel')
    public emitCancel(event: MouseEvent): void { }

    public get titleId(): string {
        return `${this.as<Portal>().propId}-title`;
    }

    public setFocusToPortal(): void {
        if (!this.as<PortalMixinImpl>().handlesFocus() || !this.refArticle) {
            return;
        }
        this.as<MFocusTrap>().setFocusTrap(this.refArticle);
    }

    public setFocusToTrigger(): void {
        if (!this.as<PortalMixinImpl>().handlesFocus()) {
            return;
        }
        this.as<MFocusTrap>().removeFocusTrap();
    }

    protected mounted(): void {
        this.as<Portal>().transitionDuration = PortalTransitionDuration.Regular + PortalTransitionDuration.XSlow;
    }

    private get popupBody(): any {
        return (this.$refs.article).querySelector('.m-popup__body');
    }

    private handlesFocus(): boolean {
        return this.focusManagement;
    }

    private doCustomPropOpen(value: boolean): boolean {
        return false;
    }

    private getBackdropMode(): BackdropMode {
        return BackdropMode.ScrollOnly;
    }

    private getPortalElement(): HTMLElement {
        return this.$refs.article as HTMLElement;
    }

    private get isSaveButtonDisabled(): boolean {
        return this.disableSaveButton;
    }

    private get isWaiting(): boolean {
        return this.waiting;
    }

    private save(event: MouseEvent): void {
        this.emitSave(event);
    }

    private cancel(event: MouseEvent): void {
        this.emitCancel(event);
        this.close();
    }

    private close(): void {
        this.as<PortalMixin>().tryClose();
    }
}

const OverlayPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(OVERLAY_NAME, MOverlay);
    }
};

export default OverlayPlugin;
