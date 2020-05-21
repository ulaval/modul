import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulIconName } from '../../../utils/modul-icons/modul-icons';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_CONFLICT_NAME } from '../../component-names';
import MessagePagePlugin, { Link } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-conflict.html';

@WithRender
@Component
export class MErrorOperationFailed extends ModulVue {

    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-conflict:title')
    })
    public title: string;

    @Prop()
    public links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-conflict:hint.primary')]
    })
    public hints: string[];

    readonly state: string = MMessageState.Warning;

    readonly svgName: string = ModulIconName.MessageErrorConflict;
}

const ErrorOperationFailedPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MessagePagePlugin);
        v.component(ERROR_CONFLICT_NAME, MErrorOperationFailed);
    }
};

export default ErrorOperationFailedPlugin;
