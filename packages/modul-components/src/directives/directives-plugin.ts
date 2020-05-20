import Vue, { PluginObject } from 'vue';
import LoggerPlugin from '../utils/logger/logger';
import BadgePlugin from './badge/badge';
import I18nDirectivePlugin from './i18n/i18n';
import PopupPlugin from './popup/popup';
import TextareaAutoHeightPlugin from './textarea-auto-height/textarea-auto-height';


const DirectivesPlugin: PluginObject<any> = {
    install(v, options): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        Vue.use(PopupPlugin);
        Vue.use(TextareaAutoHeightPlugin);
        Vue.use(I18nDirectivePlugin);
        Vue.use(BadgePlugin)
    }
};

export default DirectivesPlugin;
