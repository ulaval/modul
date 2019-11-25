import Vue, { PluginObject } from 'vue';
import ComponentsPlugin from './components/components-plugin';
import DirectivesPlugin from './directives/directives-plugin';
import FiltersPlugin from './filters/filters-plugin';
import { DialogService } from './utils/dialog/dialog-service';
import { FileService } from './utils/file/file';
import { HttpService } from './utils/http/http';
import { FRENCH, Messages } from './utils/i18n/i18n';
import { L10n } from './utils/l10n/l10n';
import { Logger } from './utils/logger/logger';
import { MediaQueries } from './utils/media-queries/media-queries';
import { Modul } from './utils/modul/modul';
import { ScrollTo } from './utils/scroll-to/scroll-to';
import DefaultSpritesPlugin from './utils/svg/default-sprites';
import { SpritesService } from './utils/svg/sprites';
import ToastService from './utils/toast/toast-service';
import ToastServicePlugin from './utils/toast/toast-service.plugin';
import UtilsPlugin, { UtilsPluginOptions } from './utils/utils-plugin';


/**
 * we re-export enums, complex components props and others types here..
 */
export * from './components/autocomplete';
export * from './components/table';
export * from './components/toggle-buttons';
export * from './components/tree';
export * from './lang';
export * from './utils/form';


/**
 * Vue instance augmentation.
 */
declare module 'vue/types/vue' {
    interface Vue {
        $modul: Modul;
        $log: Logger;
        $i18n: Messages;
        $l10n: L10n;
        $http: HttpService;
        $mq: MediaQueries;
        $svg: SpritesService;
        $scrollTo: ScrollTo;
        $file: FileService;
        $toast: ToastService;
        $dialog: DialogService;
    }
}


export interface ModulComponentPluginOptions {
    curLang?: string;
}

export const ModulComponentPlugin: PluginObject<ModulComponentPluginOptions | undefined> = {
    install(v, options: ModulComponentPluginOptions | undefined = { curLang: FRENCH }): void {

        const utilsPluginOptions: UtilsPluginOptions = {
            i18PluginOptions: {
                curLang: options.curLang
            },
            propagateVueParserErrors: false
        };

        Vue.use(UtilsPlugin, utilsPluginOptions);

        Vue.use(DefaultSpritesPlugin);
        Vue.use(ComponentsPlugin);
        Vue.use(DirectivesPlugin);
        Vue.use(FiltersPlugin);
        Vue.use(ToastServicePlugin);
    }

};

export default ModulComponentPlugin;

