import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { ModulVue } from '../../utils/vue/vue';
import { MESSAGE_PAGE_NAME } from '../component-names';
import IconPlugin from '../icon/icon';
import LinkPlugin from '../link/link';
import { MMessageState } from '../message/message';
import ModalPlugin from '../modal/modal';
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

@WithRender
@Component({
    components: { MSvg }
})
export class MMessagePage extends ModulVue {

    @Prop({
        default: 'error',
        validator: value =>
            value === MMessageState.Information ||
            value === MMessageState.Warning ||
            value === MMessageState.Confirmation ||
            value === MMessageState.Error
    })
    public state: string;

    @Prop({
        default: MMessagePageSkin.Default,
        validator: value =>
            value === MMessagePageSkin.Default ||
            value === MMessagePageSkin.Light
    })
    public skin: string;

    @Prop()
    public iconName: string;

    @Prop({})
    public svgName: string;

    @Prop()
    public imageSize: string;

    @Prop()
    public title: string;

    @Prop({ default: () => [] })
    public hints: string[];

    @Prop({ default: () => [] })
    public links: Link[];

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

    public isTargetExternal(isExternal: boolean): string {
        return isExternal ? '_blank' : '';
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

    public get iconNameProp(): string {
        if (this.iconName) {
            return this.iconName;
        } else {
            switch (this.state) {
                case MMessageState.Confirmation:
                    return ModulIconName.ConfirmationWhiteFilled;
                case MMessageState.Information:
                    return ModulIconName.InformationWhiteFilled;
                case MMessageState.Warning:
                    return ModulIconName.WarningWhiteFilled;
                default:
                    return ModulIconName.ErrorWhiteFilled;
            }
        }
    }
}

const MessagePagePlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(MESSAGE_PAGE_NAME, 'plugin.install');
        v.use(LinkPlugin);
        v.use(IconPlugin);
        v.use(ModalPlugin);
        v.component(MESSAGE_PAGE_NAME, MMessagePage);
    }
};

export default MessagePagePlugin;
