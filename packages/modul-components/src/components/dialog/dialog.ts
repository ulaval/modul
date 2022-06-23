import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref } from 'vue-property-decorator';
import { BackdropMode, Portal, PortalMixin, PortalMixinImpl } from '../../mixins/portal/portal';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import DialogServicePlugin from '../../utils/dialog/dialog-service.plugin';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { MButton, MButtonSkin } from '../button/button';
import { DIALOG_NAME } from '../component-names';
import { MIcon } from '../icon/icon';
import { MLink } from '../link/link';
import { MMessage } from '../message/message';
import WithRender from './dialog.html?style=./dialog.scss';

export enum MDialogWidth {
    Default = 'default',
    Large = 'large'
}

export enum MDialogState {
    Default = 'default',
    Warning = 'warning',
    Confirmation = 'confirmation',
    Information = 'information',
    Error = 'error'
}

export enum MDialogMessageStyle {
    LargeAndCenter = 'large-and-center',
    Regular = 'regular'
}

@WithRender
@Component({
    components: {
        MButton,
        MLink,
        MMessage,
        MIcon
    },
    mixins: [Portal, MFocusTrap]
})
export class MDialog extends ModulVue implements PortalMixinImpl {
    @Prop()
    public readonly title: string;

    @Prop()
    public readonly message: string;

    @Prop()
    public readonly okLabel?: string;

    @Prop()
    public readonly okPrecision?: string;

    @Prop({ default: MButtonSkin.Primary })
    public readonly okButtonSkin: MButtonSkin;

    @Prop({ default: false })
    public readonly secBtn: boolean;

    @Prop()
    public readonly secBtnLabel: string | undefined;

    @Prop()
    public readonly secBtnPrecision: string | undefined;

    @Prop({ default: '100%' })
    public readonly btnWidth: string;

    @Prop()
    public cancelLabel: string | undefined;

    @Prop({ default: true })
    public readonly negativeLink: boolean;

    @Prop()
    public readonly hint: string;

    @Prop({
        default: MDialogWidth.Default,
        validator: value => Enums.toValueArray(MDialogWidth).includes(value)
    })
    public readonly width: string;

    @Prop({
        default: MDialogState.Default,
        validator: value => Enums.toValueArray(MDialogState).includes(value)
    })
    public readonly state: MDialogState;

    @Prop({
        default: MDialogMessageStyle.LargeAndCenter,
        validator: value => Enums.toValueArray(MDialogMessageStyle).includes(value)
    })
    public readonly messageStyle: MDialogMessageStyle;

    @Ref('article')
    public readonly refArticle?: HTMLElement;

    @Ref('buttonOk')
    public readonly refButtonOk?: MButton;

    @Ref('butonSecondary')
    public readonly refButonSecondary?: MButton;

    @Ref('link')
    public readonly refLink?: MLink;

    public get titleId(): string | undefined {
        return this.title ? `${this.as<Portal>().propId}-title` : undefined;
    }

    public get messageId(): string {
        return `${this.as<Portal>().propId}-message`;
    }

    public setFocusToPortal(): void {
        if (!this.refArticle) {
            return;
        }

        let initialFocusElement: HTMLElement = this.refButtonOk?.$el as HTMLElement;
        if (!initialFocusElement) {
            if (this.refButonSecondary?.$el) {
                initialFocusElement = this.refButonSecondary.$el as HTMLElement;
            } else if (this.refLink?.$el) {
                initialFocusElement = this.refLink.$el as HTMLElement;
            }
        }
        this.as<MFocusTrap>().setFocusTrap(this.refArticle, { initialFocus: initialFocusElement });
    }

    public setFocusToTrigger(): void {
        this.as<MFocusTrap>().removeFocusTrap();
    }

    public handlesFocus(): boolean {
        return true;
    }

    public openDialog(): void {
        this.as<PortalMixin>().propOpen = true;
    }

    public doCustomPropOpen(value: boolean): boolean {
        return false;
    }

    public getBackdropMode(): BackdropMode {
        return BackdropMode.BackdropFast;
    }

    public getPortalElement(): HTMLElement {
        return this.$refs.article as HTMLElement;
    }

    @Emit('ok')
    public onOk(event: Event): void {
        this.as<PortalMixin>().propOpen = false;
    }

    @Emit('secondaryBtn')
    public onSecondaryBtn(event: Event): void {
        this.as<PortalMixin>().propOpen = false;
    }

    @Emit('cancel')
    public onCancel(event: Event): void {
        this.as<PortalMixin>().propOpen = false;
    }

    public get dialogStyles(): { width: string } {
        return { 'width': this.btnWidth };
    }

    public get isMessageStyleLargeAndCenter(): boolean {
        return this.messageStyle === MDialogMessageStyle.LargeAndCenter;
    }

    public get hasWidthLarge(): boolean {
        return this.width === MDialogWidth.Large;
    }

    public get getState(): string {
        switch (this.state) {
            case MDialogState.Confirmation:
                return 'confirmation';
            case MDialogState.Information:
                return 'information';
                break;
            case MDialogState.Warning:
                return 'warning';
            case MDialogState.Error:
                return 'error';
            default:
                return '';
        }
    }

}

const DialogPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(DialogServicePlugin);
        v.component(DIALOG_NAME, MDialog);
    }
};

export default DialogPlugin;
