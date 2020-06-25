
import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { I18N_NAME } from '../../filters/filter-names';
import { i18nFilter } from '../../filters/i18n/i18n';
import { ICON_BUTTON_NAME, ICON_NAME, MESSAGE_NAME, MESSAGE_PAGE_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MMessagePage, MMessagePageSkin } from '../message-page/message-page';
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
        [ICON_NAME]: MIcon,
        [ICON_BUTTON_NAME]: MIconButton,
        [MESSAGE_PAGE_NAME]: MMessagePage
    },
    filters: {
        [I18N_NAME]: i18nFilter
    }
})
export class MMessage extends Vue {
    @Prop({
        default: MMessageState.Confirmation,
        validator: value =>
            value === MMessageState.Confirmation ||
            value === MMessageState.Information ||
            value === MMessageState.Warning ||
            value === MMessageState.Error
    })
    public state: MMessageState;

    @Prop({
        default: MMessageSkin.Default,
        validator: value =>
            value === MMessageSkin.Default ||
            value === MMessageSkin.Light ||
            value === MMessageSkin.PageLight ||
            value === MMessageSkin.Page
    })
    public skin: MMessageSkin;

    @Prop({ default: true })
    public icon: boolean;

    @Prop()
    public title: string;

    @Prop()
    public closeButton: boolean;

    @Prop({ default: true })
    public visible: boolean;

    private internalVisible: boolean = true;
    private animReady: boolean = false;

    @Emit('close')
    onClose(event: Event): void {
        this.propVisible = false;
    }

    protected mounted(): void {
        this.propVisible = this.visible;
        setTimeout(() => {
            this.animReady = true;
        });
    }

    @Watch('visible')
    private onVisibleChange(value: boolean): void {
        this.propVisible = value;
    }

    private get propVisible(): boolean {
        return this.internalVisible;
    }

    private set propVisible(visible: boolean) {
        this.internalVisible = visible === undefined ? true : visible;
        this.$emit('update:visible', this.internalVisible);
    }

    private getIcon(): string {
        let icon: string = '';
        switch (this.state) {
            case MMessageState.Confirmation:
                icon = 'm-svg__confirmation';
                break;
            case MMessageState.Information:
                icon = 'm-svg__information';
                break;
            case MMessageState.Warning:
                icon = 'm-svg__warning';
                break;
            case MMessageState.Error:
                icon = 'm-svg__error';
                break;
            default:
                break;
        }
        return icon;
    }

    private get isSkinDefault(): boolean {
        return this.skin === MMessageSkin.Default;
    }

    private get isSkinLight(): boolean {
        return this.skin === MMessageSkin.Light;
    }

    private get isNotSkinPage(): boolean {
        return !this.isSkinPage && !this.isSkinPageLight;
    }

    private get skinPageValue(): string {
        return this.isSkinPage ? MMessagePageSkin.Default : MMessagePageSkin.Light;
    }

    private get isSkinPage(): boolean {
        return this.skin === MMessageSkin.Page;
    }

    private get isSkinPageLight(): boolean {
        return this.skin === MMessageSkin.PageLight;
    }

    private get isStateInformation(): boolean {
        return this.state === MMessageState.Information;
    }

    private get isStateWarning(): boolean {
        return this.state === MMessageState.Warning;
    }

    private get isStateError(): boolean {
        return this.state === MMessageState.Error;
    }

    private get isStateConfirmation(): boolean {
        return this.state === MMessageState.Confirmation;
    }

    private get showCloseButton(): boolean {
        return this.skin === MMessageSkin.Default && this.closeButton;
    }
}

const MessagePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(MESSAGE_NAME, MMessage);
    }
};

export default MessagePlugin;
