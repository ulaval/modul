import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { SIDEBAR_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import WithRender from './sidebar.html?style=./sidebar.scss';

export enum MSidebarOrigin {
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
    Left = 'left'
}
export enum MSidebarCloseButtonPosition {
    Left = 'left',
    Right = 'right'
}

@WithRender
@Component({
    components: {
        MIconButton
    },
    mixins: [Portal, MFocusTrap]
})
export class MSidebar extends ModulVue implements PortalMixinImpl {
    @Prop({
        default: MSidebarOrigin.Bottom,
        validator: value => Enums.toValueArray(MSidebarOrigin).includes(value)
    })
    public readonly origin: MSidebarOrigin;

    @Prop()
    public readonly width: string;

    @Prop()
    public readonly title: string;

    @Prop({ default: true })
    public readonly closeButton: boolean;

    @Prop({
        default: MSidebarCloseButtonPosition.Right,
        validator: value => Enums.toValueArray(MSidebarCloseButtonPosition).includes(value)
    })
    public readonly closeButtonPosition: MSidebarCloseButtonPosition;

    @Prop({ default: true })
    public readonly focusManagement: boolean;

    @Prop({ default: true })
    public readonly closeOnBackdrop: boolean;

    @Prop({ default: true })
    public readonly padding: boolean;

    @Prop({ default: true })
    public readonly paddingHeader: boolean;

    @Prop({ default: true })
    public readonly paddingBody: boolean;

    @Prop({ default: true })
    public readonly paddingFooter: boolean;

    @Prop({ default: false })
    public readonly fullHeight: boolean;

    @Prop()
    public readonly initialFocusElement?: HTMLElement;

    @Ref('article')
    public readonly refArticle?: HTMLElement;

    public $refs: {
        baseWindow: HTMLElement;
        article: HTMLElement;
        modalWrap: HTMLElement;
        body: HTMLElement;
    };

    public setFocusToPortal(): void {
        if (!this.handlesFocus() || !this.refArticle) {
            return;
        }
        this.as<MFocusTrap>().setFocusTrap(this.refArticle, { initialFocus: this.initialFocusElement || this.refArticle });
    }

    public setFocusToTrigger(): void {
        if (!this.handlesFocus()) {
            return;
        }
        this.as<MFocusTrap>().removeFocusTrap();
    }

    public get popupBody(): HTMLElement {
        return this.$refs.article.querySelector('.m-popup__body') as HTMLElement;
    }

    public get hasHeader(): boolean {
        return Boolean(this.title) || (this.closeButton && this.origin !== MSidebarOrigin.Bottom);
    }

    public get marginLeft(): string {
        return this.origin === MSidebarOrigin.Right ? 'calc(100% - ' + this.propWidth + ')' : '';
    }

    public get propWidth(): string {
        if (this.origin === MSidebarOrigin.Left || this.origin === MSidebarOrigin.Right) {
            return this.width ? this.width : '50%';
        } else {
            return '100%';
        }

    }

    public handlesFocus(): boolean {
        return this.focusManagement;
    }

    public doCustomPropOpen(value: boolean): boolean {
        return false;
    }

    public getBackdropMode(): BackdropMode {
        return BackdropMode.BackdropFast;
    }

    public getPortalElement(): HTMLElement {
        return this.$refs.article;
    }

    public closeModal(): void {
        this.as<PortalMixin>().tryClose();
    }

    public backdropClick(): void {
        if (this.closeOnBackdrop) {
            this.as<PortalMixin>().tryClose();
        }
    }

    protected mounted(): void {
        this.as<Portal>().transitionDuration = PortalTransitionDuration.Slow;
    }

    protected beforeDestroy(): void {
        this.as<MFocusTrap>().removeFocusTrap();
    }
}

const SidebarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SIDEBAR_NAME, MSidebar);
    }
};

export default SidebarPlugin;
