import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_COOKIES_NOT_SUPPORTED_NAME, MESSAGE_PAGE_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-cookies-not-supported.html';


@WithRender
@Component({
    components: {
        [MESSAGE_PAGE_NAME]: MMessagePage
    }
})
export class MErrorCookiesNotSupported extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-cookies-not-supported:title')
    })
    public title: string;

    @Prop({
        default: () => [
            new Link((Vue.prototype).$i18n.translate('m-error-cookies-not-supported:home-label'), '\\')]
    })
    public links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-cookies-not-supported:hint.primary')]
    })
    public hints: string[];

    readonly state: string = MMessageState.Warning;

    beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-cookies-disabled', require('./message-error-cookies-disabled.svg'));
    }

    readonly svgName: string = 'message-error-cookies-disabled';
}

const ErrorCookiesNotSupportedPlugin: PluginObject<any> = {
    install(v, options): void {

        v.component(ERROR_COOKIES_NOT_SUPPORTED_NAME, MErrorCookiesNotSupported);
    }
};

export default ErrorCookiesNotSupportedPlugin;
