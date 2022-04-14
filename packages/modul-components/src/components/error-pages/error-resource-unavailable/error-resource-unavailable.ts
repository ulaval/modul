import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_RESOURCE_UNAVAILABLE_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-resource-unavailable.html';
@WithRender
@Component({
    components: {
        MMessagePage
    }
})
export class MErrorResourceUnavailable extends ModulVue {
    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-resource-unavailable:title')
    })
    public readonly title: string;

    @Prop({
        default: () => [
            new Link((Vue.prototype).$i18n.translate('m-error-resource-unavailable:home-label'), `\\`)]
    })
    public readonly links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-resource-unavailable:hint.primary')]
    })
    public readonly hints: string[];

    public readonly state: string = MMessageState.Warning;
    public readonly svgName: string = 'message-error-resource-unavailable';

    public beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-resource-unavailable', require('./message-error-resource-unavailable.svg'));
    }
}

const ErrorResourceUnavailablePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_RESOURCE_UNAVAILABLE_NAME, MErrorResourceUnavailable);
    }
};

export default ErrorResourceUnavailablePlugin;
