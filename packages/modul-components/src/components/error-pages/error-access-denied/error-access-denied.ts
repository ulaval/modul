import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_ACCESS_DENIED_NAME, MESSAGE_PAGE_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-access-denied.html';


@WithRender
@Component({
    components: {
        [MESSAGE_PAGE_NAME]: MMessagePage
    }
})
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

    readonly svgName: string = 'm-svg__error-access-denied';
}

const ErrorAccessDeniedPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_ACCESS_DENIED_NAME, MErrorAccessDenied);
    }
};

export default ErrorAccessDeniedPlugin;
