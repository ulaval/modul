import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl } from '../../mixins/portal/portal';
import { Enums } from '../../utils/enums/enums';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { ModulVue } from '../../utils/vue/vue';
import { TOAST } from '../component-names';
import { MIconButton, MIconButtonSkin } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MLink, MLinkMode } from '../link/link';
import WithRender from './toast.html?style=./toast.scss';

export enum MToastTimeout {
    none = 'none',
    xshort = 'xshort',
    short = 'short',
    long = 'long'
}

export enum MToastPosition {
    TopLeft = 'top-left',
    TopCenter = 'top-center',
    TopRight = 'top-right',
    BottomLeft = 'bottom-left',
    BottomCenter = 'bottom-center',
    BottomRight = 'bottom-right'
}

export enum MToastState {
    Confirmation = 'confirmation',
    Information = 'information',
    Warning = 'warning',
    Error = 'error'
}

export enum MToastDuration {
    MobileLong = 5000,
    MobileShort = 3000,
    MobileXShort = 1500,
    DesktopLong = 8000,
    DesktopShort = 5000,
    DesktopXShort = 2500,
    None = 0
}

@WithRender
@Component({
    components: {
        MIcon,
        MIconButton,
        MLink
    },
    mixins: [MediaQueries, Portal]
})
export class MToast extends ModulVue implements PortalMixinImpl {
    @Prop({
        default: MToastState.Confirmation,
        validator: value => Enums.toValueArray(MToastState).includes(value)
    })
    public readonly state: MToastState;

    @Prop({
        default: MToastPosition.BottomRight,
        validator: value => Enums.toValueArray(MToastPosition).includes(value)
    })
    public readonly position: MToastPosition;

    @Prop({
        default: MToastTimeout.none,
        validator: value => Enums.toValueArray(MToastTimeout).includes(value)
    })
    public readonly timeout: MToastTimeout;

    @Prop()
    public open: boolean;

    @Prop()
    public readonly actionLabel: string;

    @Prop({
        default: true
    })
    public readonly icon: boolean;

    @Prop({
        default: '0'
    })
    public offset: string;

    @Prop({
        default: true
    })
    public readonly closeButton: boolean;

    public $refs: {
        toast: HTMLElement
    };

    public readonly buttonMode: MLinkMode = MLinkMode.Button;
    public readonly closeButtonSkin: MIconButtonSkin = MIconButtonSkin.Light;
    public readonly closeButtonIconeName: ModulIconName = ModulIconName.CloseClear;
    public showScreenReaderText: boolean = false;
    private timerCloseToast: any;
    private internalTimeout: number;
    private instantTimeoutStart: number;

    public get i18nTypeMessage(): string {
        switch (this.state) {
            case MToastState.Error:
                return this.$i18n.translate('m-toast:error');
            case MToastState.Warning:
                return this.$i18n.translate('m-toast:warning');
            default:
                return '';
        }
    }

    public doCustomPropOpen(value: boolean, el: HTMLElement): boolean {
        el.style.position = 'absolute';
        if (value) {
            if (this.offset !== '0') {
                this.getPortalElement().style.transform = `translateY(${this.offset})`;
            }

            this.internalTimeout = this.convertTimeout(this.timeout);
            this.startCloseToast();
            requestAnimationFrame(() => {
                this.showScreenReaderText = true;
            });
        } else {
            this.showScreenReaderText = false;
        }
        return true;
    }

    private startCloseToast(): void {
        this.instantTimeoutStart = Date.now();

        if (this.internalTimeout > 0) {
            this.timerCloseToast = setTimeout(() => {
                this.onClose();
            }, this.internalTimeout);
        }
    }

    public getPortalElement(): HTMLElement {
        return this.$refs.toast;
    }

    public getBackdropMode(): BackdropMode {
        return BackdropMode.None;
    }

    public handlesFocus(): boolean {
        return false;
    }

    protected mounted(): void {
        if (this.open === undefined || this.open === true) {
            this.as<PortalMixin>().propOpen = true;
        }
    }

    public convertTimeout(timeout: MToastTimeout): number {
        switch (timeout) {
            case MToastTimeout.long:
                return this.isMobile ? MToastDuration.MobileLong : MToastDuration.DesktopLong;
            case MToastTimeout.short:
                return this.isMobile ? MToastDuration.MobileShort : MToastDuration.DesktopShort;
            case MToastTimeout.xshort:
                return this.isMobile ? MToastDuration.MobileXShort : MToastDuration.DesktopXShort;
            case MToastTimeout.none:
            default:
                return MToastDuration.None;
        }
    }

    @Emit('action-button')
    public onAction(event: Event): void {
        this.onClose();
    }

    public onClose(): void {
        this.as<PortalMixin>().propOpen = false;
    }

    public get isStateInformation(): boolean {
        return this.state === MToastState.Information;
    }

    public get isStateWarning(): boolean {
        return this.state === MToastState.Warning;
    }

    public get isStateError(): boolean {
        return this.state === MToastState.Error;
    }

    public get isStateConfirmation(): boolean {
        return this.state === MToastState.Confirmation;
    }

    public get isTop(): boolean {
        return this.position === MToastPosition.TopLeft ||
            this.position === MToastPosition.TopCenter ||
            this.position === MToastPosition.TopRight;
    }

    public get isLeft(): boolean {
        return this.position === MToastPosition.TopLeft ||
            this.position === MToastPosition.BottomLeft;
    }

    public get isCenter(): boolean {
        return this.position === MToastPosition.TopCenter ||
            this.position === MToastPosition.BottomCenter;
    }

    public get isRight(): boolean {
        return this.position === MToastPosition.TopRight ||
            this.position === MToastPosition.BottomRight;
    }

    public get isMobile(): boolean {
        return this.as<MediaQueriesMixin>().isMqMaxS;
    }

    public getIcon(): string {
        switch (this.state) {
            case MToastState.Confirmation:
                return ModulIconName.ConfirmationWhiteFilled;
            case MToastState.Information:
                return ModulIconName.InformationWhiteFilled;
            case MToastState.Warning:
                return ModulIconName.WarningWhiteFilled;
            case MToastState.Error:
                return ModulIconName.ErrorWhiteFilled;
            default:
                return '';
        }
    }

    public mouseEnterToast(): void {
        if (!this.isMobile && this.timerCloseToast !== undefined) {
            this.restoreTimeout();
            clearTimeout(this.timerCloseToast);
            this.timerCloseToast = undefined;
        }
    }

    public mouseLeaveToast(): void {
        if (!this.isMobile) {
            this.startCloseToast();
        }
    }

    private restoreTimeout(): void {
        let instantTimeoutStop: number = Date.now();
        this.internalTimeout -= (instantTimeoutStop - this.instantTimeoutStart);
    }
}

const ToastPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MediaQueriesPlugin);
        v.component(TOAST, MToast);
    }
};

export default ToastPlugin;
