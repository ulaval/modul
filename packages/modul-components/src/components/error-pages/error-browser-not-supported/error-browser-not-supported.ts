import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_BROWSER_NOT_SUPPORTED_NAME, MESSAGE_PAGE_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-browser-not-supported.html';


@WithRender
@Component({
    components: {
        [MESSAGE_PAGE_NAME]: MMessagePage
    },
    mixins: [MediaQueries]
})
export class MErrorBrowserNotSupported extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-browser-not-supported:title')
    })
    public title: string;

    @Prop({
        default: () => [new Link((Vue.prototype).$i18n.translate('m-error-browser-not-supported:update-browser.desktop'), 'http://outdatedbrowser.com/fr', true)]
    })
    public linksDesktop: Link[];

    @Prop({ default: () => [] })
    public linksMobile: Link[];

    @Prop({
        default: () => [(Vue.prototype).$i18n.translate('m-error-browser-not-supported:hint.primary.desktop')]
    })
    public hintsDesktop: string[];

    @Prop({
        default: () => [(Vue.prototype).$i18n.translate('m-error-browser-not-supported:hint.primary.mobile')]
    })
    public hintsMobile: string[];

    readonly state: string = MMessageState.Warning;

    beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-browser-not-supported', require('./message-error-browser-not-supported.svg'));
    }

    readonly svgName: string = 'message-error-browser-not-supported';
}

const ErrorBrowserNotSupported: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_BROWSER_NOT_SUPPORTED_NAME, MErrorBrowserNotSupported);
    }
};

export default ErrorBrowserNotSupported;
