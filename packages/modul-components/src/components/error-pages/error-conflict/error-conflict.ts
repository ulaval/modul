import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ERROR_CONFLICT_NAME } from '../../component-names';
import { Link, MMessagePage } from '../../message-page/message-page';
import { MMessageState } from '../../message/message';
import WithRender from './error-conflict.html';

@WithRender
@Component({
    components: {
        MMessagePage
    }
})
export class MErrorOperationFailed extends ModulVue {
    @Prop({
        default: () => (Vue.prototype).$i18n.translate('m-error-conflict:title')
    })
    public readonly title: string;

    @Prop()
    public readonly links: Link[];

    @Prop({
        default: () => [
            (Vue.prototype).$i18n.translate('m-error-conflict:hint.primary')]
    })
    public readonly hints: string[];

    public readonly state: string = MMessageState.Warning;
    public readonly svgName: string = 'message-error-conflict';

    public beforeCreate(): void {
        this.$svgSprite.addSvg('message-error-conflict', require('./message-error-conflict.svg'));
    }
}

const ErrorOperationFailedPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_CONFLICT_NAME, MErrorOperationFailed);
    }
};

export default ErrorOperationFailedPlugin;
