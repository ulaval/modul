import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ERROR_SESSION_EXPIRED_NAME, I18N_NAME, LINK_NAME, MESSAGE_PAGE_NAME } from '../../component-names';
import { MI18n } from '../../i18n/i18n';
import { MLink } from '../../link/link';
import { MMessagePage } from '../../message-page/message-page';
import WithRender from './error-session-expired.html';

@WithRender
@Component({
    components: {
        [MESSAGE_PAGE_NAME]: MMessagePage,
        [I18N_NAME]: MI18n,
        [LINK_NAME]: MLink
    }
})
export class MErrorSessionExpired extends Vue {
    @Prop({
        default: () => Vue.prototype.$i18n.translate('m-session-expired:back-to-portal')
    })
    public backToLabel: string;

    @Prop({ default: '/' })
    public url: string | Location;

    @Prop()
    public target: string;

    @Emit('click')
    public onClick(event: Event): void { }
}

const SessionExpiredPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_SESSION_EXPIRED_NAME, MErrorSessionExpired);
    }
};

export default SessionExpiredPlugin;
