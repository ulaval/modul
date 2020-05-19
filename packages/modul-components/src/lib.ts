import Vue, { PluginObject } from 'vue';
import ComponentsPlugin from './components/components-plugin';
import DirectivesPlugin from './directives/directives-plugin';
import FiltersPlugin from './filters/filters-plugin';
import { ModulComponentOptions } from './utils/component/component-mixin';
import { DialogService } from './utils/dialog/dialog-service';
import { FileService } from './utils/file/file';
import { HttpService } from './utils/http/http';
import { FRENCH, Messages } from './utils/i18n/i18n';
import { L10n } from './utils/l10n/l10n';
import { Logger } from './utils/logger/logger';
import { MediaQueries } from './utils/media-queries/media-queries';
import { Modul } from './utils/modul/modul';
import { ScrollTo } from './utils/scroll-to/scroll-to';
import { SpritesService } from './utils/svg/sprites';
import ToastService from './utils/toast/toast-service';
import ToastServicePlugin from './utils/toast/toast-service.plugin';
import UtilsPlugin, { UtilsPluginOptions } from './utils/utils-plugin';

/**
 * we re-export components plugins, enums, props and others types here..
 * Everything listed here will be included in the packaged library
 */

/**
 * Components
 */
export * from './components/autocomplete/autocomplete';
export { default as ComponentsPlugin } from './components/components-plugin';
export * from './components/table/table';
export * from './components/toggle-buttons/toggle-buttons';
export * from './components/tree/tree';
/**
 * directives
 */
export { default as DirectivesPlugin } from './directives/directives-plugin';
/**
 * filters
 */
export { default as FiltersPlugin } from './filters/filters-plugin';
/**
 * Services
 */
export { default as EnglishPlugin } from './lang/en';
export { default as FrenchPlugin } from './lang/fr';
export { default as DialogServicePlugin } from './utils/dialog/dialog-service';
export * from './utils/form';
export { ENGLISH, FRENCH } from './utils/i18n/i18n';
export { SpritesService } from './utils/svg/sprites';
export { default as ToastServicePlugin } from './utils/toast/toast-service.plugin';
export { default as UtilsPlugin, UtilsPluginOptions } from './utils/utils-plugin';





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

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        modul?: ModulComponentOptions;
    }
}

/**
 * @deprecated
 */
export interface ModulComponentPluginOptions {
    curLang?: string;
}


/**
 * @deprecated
 */
// tslint:disable-next-line: deprecation
export const ModulComponentPlugin: PluginObject<ModulComponentPluginOptions | undefined> = {
    // tslint:disable-next-line: deprecation
    install(v, options: ModulComponentPluginOptions | undefined = { curLang: FRENCH }): void {

        // tslint:disable-next-line: no-console
        console.error('@deprecated  ModulComponentPlugin will be removed in v2 , please use individual plugins instead');

        const utilsPluginOptions: UtilsPluginOptions = {
            i18PluginOptions: {
                curLang: options.curLang
            },
            propagateVueParserErrors: false
        };

        Vue.use(UtilsPlugin, utilsPluginOptions);

        Vue.use(ComponentsPlugin);
        Vue.use(DirectivesPlugin);
        Vue.use(FiltersPlugin);
        Vue.use(ToastServicePlugin);
    }

};

export default ModulComponentPlugin;

