import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_PAGE_NOT_FOUND_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-page-not-found.html';

@WithRender
@Component({
    components: {
        MMessagePage
    }
})
export class MErrorPageNotFound extends ModulVue {
    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-page-not-found:title')
    })
    public readonly title: string;

    @Prop({
        default: () => [
            new Link((Vue.prototype).$i18n.translate('m-error-page-not-found:home-label'), `\\`)]
    })
    public readonly links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-page-not-found:hint.primary')]
    })
    public readonly hints: string[];

    public readonly state: string = MMessageState.Warning;
    public readonly svgName: string = 'message-error-page-not-found';

    public beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-page-not-found', require('./message-error-page-not-found.svg'));
    }
}

const ErrorPageNotFoundPlugin: PluginObject<any> = {
    install(v, options): void {

        v.component(ERROR_PAGE_NOT_FOUND_NAME, MErrorPageNotFound);
    }
};

export default ErrorPageNotFoundPlugin;
