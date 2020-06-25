import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_ACCESS_DENIED_NAME } from '../../component-names';
import MessagePagePlugin, { Link } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-access-denied.html';


@WithRender
@Component
export class MErrorAccessDenied extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-access-denied:title')
    })
    public title: string;

    @Prop()
    public links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-access-denied:hint.primary')]
    })
    public hints: string[];

    readonly state: string = MMessageState.Information;

    beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-access-denied', require('./message-error-access-denied.svg'));
    }

    readonly svgName: string = 'message-error-access-denied';
}

const ErrorAccessDeniedPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MessagePagePlugin);
        v.component(ERROR_ACCESS_DENIED_NAME, MErrorAccessDenied);
    }
};

export default ErrorAccessDeniedPlugin;
