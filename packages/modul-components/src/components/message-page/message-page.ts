import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { ModulVue } from '../../utils/vue/vue';
import { MESSAGE_PAGE_NAME } from '../component-names';
import { MLink } from '../link/link';
import { MSvg } from './../svg/svg';
import WithRender from './message-page.html?style=./message-page.scss';

/**
 * Utility class to manage the properties related to the link displayed in the error pages.
 */
export class Link {
    /**
     * Constructor
     * @param label Label for the url link to display.
     * @param url Target for the location to navigate to, can be relative.
     * @param external Defines to the target is external (opens in new tab), or internal (opens in same tab) to the application.
     */
    constructor(public label: string, public url: string, public external: boolean = false) {
    }
}

export enum MMessagePageSkin {
    Default = 'default',
    Light = 'light'
}

export enum MMessagePageImageSize {
    Default = '130px',
    Small = '76px'
}

export enum MMessagePageState {
    Information = 'information',
    Warning = 'warning',
    Confirmation = 'confirmation',
    Error = 'error'
}

@WithRender
@Component({
    components: {
        MLink,
        MSvg
    }
})
export class MMessagePage extends ModulVue {
    @Prop({
        default: 'error',
        validator: value => Enums.toValueArray(MMessagePageState).includes(value)
    })
    public readonly state: MMessagePageState;

    @Prop({
        default: MMessagePageSkin.Default,
        validator: value => Enums.toValueArray(MMessagePageSkin).includes(value)
    })
    public readonly skin: string;

    @Prop()
    public readonly iconName: string;

    @Prop()
    public readonly svgName: string;

    @Prop()
    public readonly imageSize: string;

    @Prop()
    public readonly title: string;

    @Prop({ default: () => [] })
    public readonly hints: string[];

    @Prop({ default: () => [] })
    public readonly links: Link[];

    protected beforeCreate(): void {
        if (!this.$svgSprite) {
            return;
        }
        this.$svgSprite.addSvg(ModulIconName.ConfirmationWhiteFilled, require('../../assets/icons/svg/confirmation-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.InformationWhiteFilled, require('../../assets/icons/svg/information-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.WarningWhiteFilled, require('../../assets/icons/svg/warning-white-filled.svg'));
        this.$svgSprite.addSvg(ModulIconName.ErrorWhiteFilled, require('../../assets/icons/svg/error-white-filled.svg'));
    }

    public get hasHints(): boolean {
        return this.hints.length > 0;
    }

    public get hasLinks(): boolean {
        return this.links.length > 0;
    }

    public get propImageSize(): string {
        if (this.imageSize) {
            return this.imageSize;
        }
        return this.isSkinLight ? MMessagePageImageSize.Small : MMessagePageImageSize.Default;
    }

    public get hasLinksAndSlot(): boolean {
        return this.hasLinks || !!this.$slots.default;
    }

    public get hasBody(): boolean {
        return this.hasHints || this.hasLinks || !!this.$slots.default;
    }

    public get isSkinDefault(): boolean {
        return this.skin === MMessagePageSkin.Default;
    }

    public get isSkinLight(): boolean {
        return this.skin === MMessagePageSkin.Light;
    }

    public get isStateInformation(): boolean {
        return this.state === MMessagePageState.Information;
    }

    public get isStateWarning(): boolean {
        return this.state === MMessagePageState.Warning;
    }

    public get isStateError(): boolean {
        return this.state === MMessagePageState.Error;
    }

    public get isStateConfirmation(): boolean {
        return this.state === MMessagePageState.Confirmation;
    }

    public get iconNameProp(): string {
        if (this.iconName) {
            return this.iconName;
        }
        switch (this.state) {
            case MMessagePageState.Confirmation:
                return ModulIconName.ConfirmationWhiteFilled;
            case MMessagePageState.Information:
                return ModulIconName.InformationWhiteFilled;
            case MMessagePageState.Warning:
                return ModulIconName.WarningWhiteFilled;
            default:
                return ModulIconName.ErrorWhiteFilled;
        }
    }

    public isTargetExternal(isExternal: boolean): string {
        return isExternal ? '_blank' : '';
    }
}

const MessagePagePlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(MESSAGE_PAGE_NAME, 'plugin.install');
        v.component(MESSAGE_PAGE_NAME, MMessagePage);
    }
};

export default MessagePagePlugin;
