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
import { SvgSpriteService } from './utils/svg/svg-sprite';
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
export * from './components/accordion-group/accordion-group';
export * from './components/accordion/accordion';
export * from './components/add/add';
export * from './components/autocomplete/autocomplete';
export * from './components/avatar/avatar';
export * from './components/button/button';
export * from './components/calendar/calendar';
export * from './components/carousel/carousel';
export * from './components/character-count/character-count';
export * from './components/checkbox/checkbox';
export * from './components/chip/chip';
export { default as ComponentsPlugin } from './components/components-plugin';
export * from './components/datepicker/datepicker';
export * from './components/daterangepicker/daterangepicker';
export * from './components/decimalfield/decimalfield';
export * from './components/dialog/dialog';
export * from './components/dropdown/dropdown';
export * from './components/dropdown/dropdown-item/dropdown-item';
export * from './components/error-pages/error-access-denied/error-access-denied';
export * from './components/error-pages/error-browser-not-supported/error-browser-not-supported';
export * from './components/error-pages/error-config-not-supported/error-config-not-supported';
export * from './components/error-pages/error-conflict/error-conflict';
export * from './components/error-pages/error-cookies-not-supported/error-cookies-not-supported';
export * from './components/error-pages/error-page-not-found/error-page-not-found';
export * from './components/error-pages/error-resource-unavailable/error-resource-unavailable';
export * from './components/error-pages/error-session-expired/error-session-expired';
export * from './components/error-pages/error-technical-difficulty/error-technical-difficulty';
export * from './components/expandable-layout/expandable-layout';
export * from './components/file-select/file-select';
export * from './components/file-upload/file-upload';
export * from './components/form/form';
export * from './components/form/form.plugin';
export * from './components/i18n/i18n';
export * from './components/icon-button/icon-button';
export * from './components/icon-file/icon-file';
export * from './components/icon/icon';
export * from './components/inplace-edit/inplace-edit';
export * from './components/input-group/input-group';
export * from './components/integerfield/integerfield';
export * from './components/limit-text/limit-text';
export * from './components/link/link';
export * from './components/list-item/list-item';
export * from './components/menu/menu';
export * from './components/menu/menu-item/menu-item';
export * from './components/message-page/message-page';
export * from './components/message/message';
export * from './components/modal/modal';
export * from './components/moneyfield/moneyfield';
export * from './components/multi-select/multi-select';
export * from './components/navbar/navbar';
export * from './components/navbar/navbar-item/navbar-item';
export * from './components/option/option';
export * from './components/option/option-item/option-item';
export * from './components/option/option-item/option-item-add';
export * from './components/option/option-item/option-item-archive';
export * from './components/option/option-item/option-item-delete';
export * from './components/option/option-item/option-item-edit';
export * from './components/option/option-item/option-item-predefined';
export * from './components/option/option-separator/option-separator';
export * from './components/option/option-title/option-title';
export * from './components/organize-table-columns-modal/organize-table-columns-modal';
export * from './components/overlay/overlay';
export * from './components/pagination/pagination';
export * from './components/panel/panel';
export * from './components/periodpicker/periodpicker';
export * from './components/popup/popup';
export * from './components/postalcodefield/postalcodefield';
export * from './components/progress/progress';
export * from './components/radio-group/radio-group';
export * from './components/radio/radio';
export { default as RichTextLicensePlugin } from './components/rich-text-editor/rich-text-license-plugin';
export * from './components/rich-text/rich-text';
export * from './components/scroll-top/scroll-top';
export * from './components/searchfield/searchfield';
export * from './components/show-more/show-more';
export * from './components/sidebar/sidebar';
export * from './components/spinner/spinner';
export * from './components/steppers/steppers';
export * from './components/steppers/steppers-item/steppers-item';
export * from './components/switch/switch';
export * from './components/table-header/table-header';
export * from './components/table/table';
export * from './components/textarea/textarea';
export * from './components/textfield/textfield';
export * from './components/timepicker/timepicker';
export * from './components/toast/toast';
export * from './components/toggle-buttons/toggle-buttons';
export * from './components/tooltip/tooltip';
export * from './components/transitions/accordion-transition/accordion-transition';
export * from './components/transitions/opacity-transition/opacity-transition';
export * from './components/transitions/slide-transition/slide-transition';
export * from './components/tree/tree';
export * from './components/typeahead/typeahead';
export * from './components/validation-message/validation-message';
export * from './directives/badge/badge';
/**
 * directives
 */
export { default as DirectivesPlugin } from './directives/directives-plugin';
export * from './directives/i18n/i18n';
export * from './directives/popup/popup';
export * from './directives/textarea-auto-height/textarea-auto-height';
/**
 * filters
 */
export { default as FiltersPlugin } from './filters/filters-plugin';
export * from './filters/i18n/i18n';
/**
 * Services and utils
 */
export { default as DialogServicePlugin } from './utils/dialog/dialog-service.plugin';
export { FileService } from './utils/file/file';
export * from './utils/form';
export { default as HttpPlugin, HttpPluginOptions } from './utils/http/http';
export { DebugMode, default as I18nPlugin, ENGLISH, FRENCH, I18nPluginOptions } from './utils/i18n/i18n';
export { default as L10nPlugin, L10nPluginOptions } from './utils/l10n/l10n';
export { ConsoleOptions, default as LoggerPlugin } from './utils/logger/logger';
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
        $svgSprite: SvgSpriteService;
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
        console.warn('@deprecated ModulComponentPlugin will be removed in v2 , please use individual plugins instead');

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

