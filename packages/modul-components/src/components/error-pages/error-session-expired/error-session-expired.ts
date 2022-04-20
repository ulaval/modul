import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ERROR_SESSION_EXPIRED_NAME } from '../../component-names';
import { MLink } from '../../link/link';
import { MMessage } from '../../message/message';
import WithRender from './error-session-expired.html';

@WithRender
@Component({
    components: {
        MMessage,
        MLink
    }
})
export class MErrorSessionExpired extends Vue {
    @Prop({
        default: () => Vue.prototype.$i18n.translate('m-session-expired:back-to-portal')
    })
    public readonly backToLabel: string;

    @Prop({ default: '/' })
    public readonly url: string | Location;

    @Prop()
    public readonly target: string;

    @Emit('click')
    public onClick(event: Event): void { }
}

const SessionExpiredPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ERROR_SESSION_EXPIRED_NAME, MErrorSessionExpired);
    }
};

export default SessionExpiredPlugin;
