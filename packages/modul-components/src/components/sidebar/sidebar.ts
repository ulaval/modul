import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { ModulVue } from '../../utils/vue/vue';
import { I18N_NAME, ICON_BUTTON_NAME, SIDEBAR_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
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
        [I18N_NAME]: MI18n,
        [ICON_BUTTON_NAME]: MIconButton

    },
    mixins: [Portal]
})
export class MSidebar extends ModulVue implements PortalMixinImpl {
    @Prop({
        default: MSidebarOrigin.Bottom,
        validator: value =>
            value === MSidebarOrigin.Top ||
            value === MSidebarOrigin.Right ||
            value === MSidebarOrigin.Left ||
            value === MSidebarOrigin.Bottom
    })
    public origin: MSidebarOrigin;

    @Prop()
    public width: string;
    @Prop()
    public title: string;
    @Prop({ default: true })
    public closeButton: boolean;
    @Prop({
        default: MSidebarCloseButtonPosition.Right,
        validator: value =>
            value === MSidebarCloseButtonPosition.Right ||
            value === MSidebarCloseButtonPosition.Left
    })
    public closeButtonPosition: MSidebarCloseButtonPosition;

    @Prop({ default: true })
    public focusManagement: boolean;

    @Prop({ default: true })
    public closeOnBackdrop: boolean;

    @Prop({ default: true })
    public padding: boolean;
    @Prop({ default: true })
    public paddingHeader: boolean;
    @Prop({ default: true })
    public paddingBody: boolean;
    @Prop({ default: true })
    public paddingFooter: boolean;

    @Prop({ default: false })
    public fullHeight: boolean;

    public $refs: {
        baseWindow: HTMLElement;
        article: HTMLElement;
        modalWrap: HTMLElement;
        body: HTMLElement;
    };

    public get popupBody(): HTMLElement {
        return this.$refs.article.querySelector('.m-popup__body') as HTMLElement;
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

    protected mounted(): void {
        this.as<Portal>().transitionDuration = PortalTransitionDuration.Slow;
    }

    private get hasHeaderSlot(): boolean {
        return !!this.$slots.header;
    }

    private get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    private get hasHeader(): boolean {
        return this.hasHeaderSlot || this.hasTitle || (this.closeButton && this.origin !== MSidebarOrigin.Bottom);
    }

    private get hasTitle(): boolean {
        return !!this.title;
    }

    private get hasFooterSlot(): boolean {
        return !!this.$slots.footer;
    }

    private backdropClick(): void {
        if (this.closeOnBackdrop) {
            this.as<PortalMixin>().tryClose();
        }
    }

    private closeModal(): void {
        this.as<PortalMixin>().tryClose();
    }

    private get marginLeft(): string {
        return this.origin === MSidebarOrigin.Right ? 'calc(100% - ' + this.propWidth + ')' : '';
    }

    private get propWidth(): string {

        if (this.origin === MSidebarOrigin.Left || this.origin === MSidebarOrigin.Right) {
            return this.width ? this.width : '50%';
        } else {
            return '100%';
        }

    }
}

const SidebarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SIDEBAR_NAME, MSidebar);
    }
};

export default SidebarPlugin;
