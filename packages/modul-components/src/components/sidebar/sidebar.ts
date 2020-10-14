import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl, PortalTransitionDuration } from '../../mixins/portal/portal';
import { Enums } from '../../utils/enums/enums';
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
}

const SidebarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SIDEBAR_NAME, MSidebar);
    }
};

export default SidebarPlugin;
