import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { I18N_NAME as I18N_FILTER_NAME } from '../../filters/filter-names';
import { i18nFilter } from '../../filters/i18n/i18n';
import { BackdropMode, Portal, PortalMixin, PortalTransitionDuration } from '../../mixins/portal/portal';
import UserAgentUtil from '../../utils/user-agent/user-agent';
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
    mixins: [Portal]
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

    protected mounted(): void {
        this.as<Portal>().transitionDuration = PortalTransitionDuration.Regular + PortalTransitionDuration.XSlow;
    }

    private get popupBody(): any {
        return (this.$refs.article).querySelector('.m-popup__body');
    }

    private get isAndroid(): boolean {
        return UserAgentUtil.isAndroid();
    }

    private isFocusableTextBox(element: HTMLElement): boolean {
        const type = element.getAttribute('type');
        return (element.tagName === 'INPUT'
            && type != 'checkbox'
            && type != 'radio'
            && type != 'button'
            && type != 'reset'
            && type != 'file') || element.tagName === 'TEXTAREA';
    }

    private onFocusIn(event: FocusEvent): void {
        if (
            this.isAndroid
            && this.isFocusableTextBox(event.target as HTMLElement)
        ) {
            this.hasKeyboard = true;
        }
    }

    private onFocusOut(event: FocusEvent): void {
        if (!this.isAndroid) {
            return;
        }

        this.hasKeyboard = false;
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
