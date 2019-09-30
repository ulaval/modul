import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ERROR_SESSION_EXPIRED_NAME } from '../../component-names';
import I18nPlugin from '../../i18n/i18n';
import LinkPlugin from '../../link/link';
import MessagePlugin from '../../message/message';
import WithRender from './error-session-expired.html';



@WithRender
@Component
export class MErrorSessionExpired extends Vue {
    @Prop({
        default: () => Vue.prototype.$i18n.translate('m-session-expired:back-to-portal')
    })
    public backToLabel: string;
}

const SessionExpiredPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(I18nPlugin);
        v.use(LinkPlugin);
        v.use(MessagePlugin);
        v.component(ERROR_SESSION_EXPIRED_NAME, MErrorSessionExpired);
    }
};

export default SessionExpiredPlugin;
