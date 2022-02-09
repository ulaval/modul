import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref } from 'vue-property-decorator';
import { I18N_NAME as I18N_FILTER_NAME } from '../../filters/filter-names';
import { i18nFilter } from '../../filters/i18n/i18n';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { BUTTON_NAME, I18N_NAME, OVERLAY_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import WithRender from './overlay.html?style=./overlay.scss';
@WithRender
@Component({
    components: {
        [BUTTON_NAME]: MButton,
        [I18N_NAME]: MI18n
    },
    filters: {
        [I18N_FILTER_NAME]: i18nFilter
    },
    mixins: [Portal, MFocusTrap]
})
export class MOverlay extends ModulVue {
    @Prop({ default: true })
    public focusManagement: boolean;

    @Prop({ default: true })
    public padding: boolean;

    @Prop({ default: true })
    public paddingHeader: boolean;

    @Prop({ default: true })
    public paddingBody: boolean;

    @Prop({ default: true })
    public paddingFooter: boolean;

    @Prop({ default: false })
    public disableSaveButton: boolean;

    @Prop({ default: false })
    public waiting: boolean;

    @Prop({ default: false })
    public hideFooter: boolean;

    public hasKeyboard: boolean = false;

    @Ref('article')
    public refArticle?: HTMLElement;

    public $refs: {
        dialogWrap: HTMLElement,
        body: HTMLElement,
        footer: HTMLElement,
        article: Element
    };

    @Emit('save')
    emitSave(event: MouseEvent): void { }

    @Emit('cancel')
    emitCancel(event: MouseEvent): void { }

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
