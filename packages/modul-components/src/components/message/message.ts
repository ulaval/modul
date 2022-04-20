
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { ModulVue } from '../../utils/vue/vue';
import { MESSAGE_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MMessagePage, MMessagePageSkin } from '../message-page/message-page';
import { MSvg } from '../svg/svg';
import WithRender from './message.html?style=./message.scss';

export enum MMessageState {
    Confirmation = 'confirmation',
    Information = 'information',
    Warning = 'warning',
    Error = 'error'
}

export enum MMessageSkin {
    Default = 'default',
    Light = 'light',
    PageLight = 'page-light',
    Page = 'page'
}

@WithRender
@Component({
    components: {
        MSvg,
        MIconButton,
        MMessagePage
    }
})
export class MMessage extends ModulVue {
    @Prop({
        default: MMessageState.Confirmation,
        validator: value => Enums.toValueArray(MMessageState).includes(value)
    })
    public readonly state!: MMessageState;

    @Prop({
        default: MMessageSkin.Default,
        validator: value => Enums.toValueArray(MMessageSkin).includes(value)
    })
    public readonly skin!: MMessageSkin;

    @Prop({ default: true })
    public readonly icon!: boolean;

    @Prop()
    public readonly title: string;

    @Prop()
    public readonly closeButton: boolean;

    @Prop({ default: true })
    public readonly visible: boolean;

    public animReady: boolean = false;
    private internalVisible: boolean = true;

    @Emit('close')
    public emitClose(_event: Event): void {
        this.propVisible = false;
    }

    @Emit('update:visible')
    public emitUpdateVisible(_isVisible: Boolean): void { }

    protected beforeCreate(): void {
        if (!this.$svgSprite) {
            return;
        }
        this.$svgSprite.addSvg(ModulIconName.ConfirmationWhiteFilled, require('../../assets/icons/svg/confirmation-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.InformationWhiteFilled, require('../../assets/icons/svg/information-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.WarningWhiteFilled, require('../../assets/icons/svg/warning-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.ErrorWhiteFilled, require('../../assets/icons/svg/error-white-filled.svg'));
    }

    protected mounted(): void {
        this.propVisible = this.visible;
        setTimeout(() => {
            this.animReady = true;
        });
    }

    @Watch('visible')
    public onVisibleChange(value: boolean): void {
        this.propVisible = value;
    }

    public get propVisible(): boolean {
        return this.internalVisible;
    }

    public set propVisible(visible: boolean) {
        this.internalVisible = visible === undefined ? true : visible;
        this.emitUpdateVisible(this.internalVisible);
    }

    public get isSkinDefault(): boolean {
        return this.skin === MMessageSkin.Default;
    }

    public get isSkinLight(): boolean {
        return this.skin === MMessageSkin.Light;
    }

    public get isNotSkinPage(): boolean {
        return !this.isSkinPage && !this.isSkinPageLight;
    }

    public get skinPageValue(): string {
        return this.isSkinPage ? MMessagePageSkin.Default : MMessagePageSkin.Light;
    }

    public get isSkinPage(): boolean {
        return this.skin === MMessageSkin.Page;
    }

    public get isSkinPageLight(): boolean {
        return this.skin === MMessageSkin.PageLight;
    }

    public get isStateInformation(): boolean {
        return this.state === MMessageState.Information;
    }

    public get isStateWarning(): boolean {
        return this.state === MMessageState.Warning;
    }

    public get isStateError(): boolean {
        return this.state === MMessageState.Error;
    }

    public get isStateConfirmation(): boolean {
        return this.state === MMessageState.Confirmation;
    }

    public get showCloseButton(): boolean {
        return this.skin === MMessageSkin.Default && this.closeButton;
    }

    public getIcon(): string {
        switch (this.state) {
            case MMessageState.Confirmation:
                return ModulIconName.ConfirmationWhiteFilled;
            case MMessageState.Information:
                return ModulIconName.InformationWhiteFilled;
            case MMessageState.Warning:
                return ModulIconName.WarningWhiteFilled;
            case MMessageState.Error:
                return ModulIconName.ErrorWhiteFilled;
            default:
                return '';
        }
    }
}

const MessagePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(MESSAGE_NAME, MMessage);
    }
};

export default MessagePlugin;
