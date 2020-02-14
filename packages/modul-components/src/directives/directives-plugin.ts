import Vue, { PluginObject } from 'vue';
import PopupPlugin from '../components/popup/popup';
import LoggerPlugin from '../utils/logger/logger';
import I18nDirectivePlugin from './i18n/i18n';
import TextareaAutoHeightPlugin from './textarea-auto-height/textarea-auto-height';


const DirectivesPlugin: PluginObject<any> = {
    install(v, options): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        Vue.use(PopupPlugin);
        Vue.use(TextareaAutoHeightPlugin);
        Vue.use(I18nDirectivePlugin);
    }
};

export default DirectivesPlugin;
