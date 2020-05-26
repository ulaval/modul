import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_RESOURCE_UNAVAILABLE_NAME } from '../../component-names';
import MessagePagePlugin, { Link } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-resource-unavailable.html';


@WithRender
@Component
export class MErrorResourceUnavailable extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-resource-unavailable:title')
    })
    public title: string;

    @Prop({
        default: () => [
            new Link((Vue.prototype).$i18n.translate('m-error-resource-unavailable:home-label'), `\\`)]
    })
    public links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-resource-unavailable:hint.primary')]
    })
    public hints: string[];

    readonly state: string = MMessageState.Warning;

    beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-resource-unavailable', require('./message-error-resource-unavailable.svg'));
    }

    readonly svgName: string = 'message-error-resource-unavailable';
}

const ErrorResourceUnavailablePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MessagePagePlugin);
        v.component(ERROR_RESOURCE_UNAVAILABLE_NAME, MErrorResourceUnavailable);
    }
};

export default ErrorResourceUnavailablePlugin;
