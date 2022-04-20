import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_COOKIES_NOT_SUPPORTED_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-cookies-not-supported.html';

@WithRender
@Component({
    components: {
        MMessagePage
    }
})
export class MErrorCookiesNotSupported extends ModulVue {
    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-cookies-not-supported:title')
    })
    public readonly title: string;

    @Prop({
        default: () => [
            new Link((Vue.prototype).$i18n.translate('m-error-cookies-not-supported:home-label'), '\\')]
    })
    public readonly links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-cookies-not-supported:hint.primary')]
    })
    public readonly hints: string[];

    public readonly state: string = MMessageState.Warning;
    public readonly svgName: string = 'message-error-cookies-disabled';

    public beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-cookies-disabled', require('./message-error-cookies-disabled.svg'));
    }
}

const ErrorCookiesNotSupportedPlugin: PluginObject<any> = {
    install(v, options): void {

        v.component(ERROR_COOKIES_NOT_SUPPORTED_NAME, MErrorCookiesNotSupported);
    }
};

export default ErrorCookiesNotSupportedPlugin;
