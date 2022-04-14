import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_CONFIG_NOT_SUPPORTED_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-config-not-supported.html';

@WithRender
@Component({
    components: {
        MMessagePage
    }
})
export class MErrorConfigNotSupported extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-config-not-supported:title')
    })
    public readonly title: string;

    @Prop({ default: () => [] })
    public readonly links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-config-not-supported:hint.primary'),
            (Vue.prototype).$i18n.translate('m-error-config-not-supported:hint.secondary')]
    })
    public readonly hints: string[];

    public readonly state: string = MMessageState.Warning;
    public readonly svgName: string = 'message-error-config-not-supported';

    public beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-config-not-supported', require('./message-error-config-not-supported.svg'));
    }
}

const ErrorConfigNotSupportedPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_CONFIG_NOT_SUPPORTED_NAME, MErrorConfigNotSupported);
    }
};

export default ErrorConfigNotSupportedPlugin;
