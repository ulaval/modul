import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { MODAL_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import WithRender from './modal.html';
import './modal.scss';

export enum MModalSize {
    FullScreen = 'full-screen',
    Large = 'large',
    Regular = 'regular',
    Small = 'small'
}

@WithRender
@Component({
    components: {
        MIconButton
    },
    mixins: [Portal, MFocusTrap]
})
export class MModal extends ModulVue implements PortalMixinImpl {
    @Prop()
    public readonly title: string;

    @Prop({ default: true })
    public readonly showCloseButton!: boolean;

    @Prop({
        default: MModalSize.Regular,
        validator: value => Enums.toValueArray(MModalSize).includes(value)
    })
    public readonly size: MModalSize;

    @Prop({ default: true })
    public readonly closeOnBackdrop: boolean;

    @Prop({ default: true })
    public readonly focusManagement: boolean;

    @Prop({ default: true })
    public readonly bodyMaxWidth: boolean;

    /** @deprecated will be removed in v2, please use css variables to customize visuals. */
    @Prop({ default: true })
    public readonly paddingBody: boolean;

    @Ref('article')
    public readonly refArticle?: HTMLElement;

    public readonly closeTitle: string = this.$i18n.translate('m-modal:close');
    public hasKeyboard: boolean = false;

    public $refs: {
        body: HTMLElement;
        modalWrap: HTMLElement;
        article: HTMLElement;
    };

    public get titleId(): string | undefined {
        return this.title ? `${this.as<Portal>().propId}-title` : undefined;
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

    public closeModal(): void {
        this.as<PortalMixin>().tryClose();
    }

    public handlesFocus(): boolean {
        return this.focusManagement;
    }

    public doCustomPropOpen(value: boolean): boolean {
        return false;
    }

    public getBackdropMode(): BackdropMode {
        return this.sizeFullSceen
            ? BackdropMode.ScrollOnly
            : BackdropMode.BackdropFast;
    }

    public get sizeFullSceen(): boolean {
        const fullScreen: boolean = !this.as<MediaQueriesMixin>().isMqMinS
            ? true
            : this.size === MModalSize.FullScreen
                ? true
                : false;
        this.as<Portal>().transitionDuration = fullScreen
            ? PortalTransitionDuration.XSlow
            : PortalTransitionDuration.Regular;
        return fullScreen;
    }

    public get sizeLarge(): boolean {
        return (
            this.as<MediaQueriesMixin>().isMqMinS && this.size === MModalSize.Large
        );
    }

    public get sizeSmall(): boolean {
        return (
            this.as<MediaQueriesMixin>().isMqMinS && this.size === MModalSize.Small
        );
    }

    public getPortalElement(): HTMLElement {
        return this.$refs.article;
    }

    public backdropClick(): void {
        if (this.closeOnBackdrop) {
            this.as<PortalMixin>().tryClose();
        }
    }

    protected mounted(): void {
        if (!this.title && !Boolean(this.$slots.header)) {
            this.$log.warn('<m-modal> needs a header slot or title prop.');
        }
        window.addEventListener('keydown', this.closeModalOnEscape);
    }

    protected beforeDestroy(): void {
        window.removeEventListener('keydown', this.closeModalOnEscape);
    }

    private closeModalOnEscape(event: KeyboardEvent): void {
        if (event.key !== 'Escape') { return; }
        this.closeModal();
    }
}

const ModalPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(MODAL_NAME, MModal);
    }
};

export default ModalPlugin;
