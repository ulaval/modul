import Vue, { PluginObject } from 'vue';
import LoggerPlugin from '../utils/logger/logger';


const DirectivesPlugin: PluginObject<any> = {
    install(v, options): void {
        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin);
        }

        // Vue.use(BadgePlugin);
        // Vue.use(DragAndDropPlugin);
        // Vue.use(FileDropPlugin);
        // Vue.use(PopupPlugin);
        // Vue.use(RemoveUserSelectPlugin);
        // Vue.use(RippleEffectPlugin);
        // Vue.use(ScrollToPlugin);
        // Vue.use(SortablePlugin);
        // Vue.use(TextareaAutoHeightPlugin);
        // Vue.use(I18nDirectivePlugin);
    }
};

export default DirectivesPlugin;
