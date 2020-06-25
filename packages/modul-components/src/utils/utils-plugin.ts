import Vue, { PluginObject } from 'vue';
import ComponentMixinPlugin from './component/component-mixin';
import { WindowErrorHandler } from './errors/window-error-handler';
import HttpPlugin, { HttpPluginOptions, HttpService } from './http/http';
import I18nPlugin, { I18nPluginOptions, Messages } from './i18n/i18n';
import L10nPlugin, { L10n, L10nPluginOptions } from './l10n/l10n';
import LoggerPlugin, { ConsoleOptions, Logger } from './logger/logger';
import MediaQueriesPlugin, { MediaQueries } from './media-queries/media-queries';
import ModulPlugin, { Modul, ModulPluginOptions } from './modul/modul';
import ScrollToPlugin, { ScrollTo } from './scroll-to/scroll-to';
import SpritesPlugin, { SpritesService } from './svg/sprites';
import SvgSpritePlugin, { SvgSpriteService } from './svg/svg-sprite';

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
    }
}

export interface UtilsPluginOptions {
    httpPluginOptions?: HttpPluginOptions;
    consoleOptions?: ConsoleOptions;
    i18PluginOptions?: I18nPluginOptions;
    l10nPluginOptions?: L10nPluginOptions;
    propagateVueParserErrors?: boolean;
    modulPluginOptions?: ModulPluginOptions;
}

const UtilsPlugin: PluginObject<any> = {
    install(v, options: UtilsPluginOptions): void {
        if (!options || options.propagateVueParserErrors === undefined || options.propagateVueParserErrors) {
            // Vue parser errors do not propagate to window.onError by default
            Vue.config.errorHandler = (err, vm, info) => {
                WindowErrorHandler.onError(new ErrorEvent('error', { error: err }));
            };
        }

        if (!v.prototype.$log) {
            Vue.use(LoggerPlugin, options ? options.consoleOptions : undefined);
        } else if (options) {
            v.prototype.$log.setConsoleOptions(options.consoleOptions);
        }

        Vue.use(I18nPlugin, options.i18PluginOptions);
        Vue.use(L10nPlugin, options.l10nPluginOptions);
        Vue.use(HttpPlugin, options.httpPluginOptions);
        Vue.use(MediaQueriesPlugin);
        Vue.use(SpritesPlugin);
        Vue.use(ModulPlugin, options.modulPluginOptions);
        Vue.use(SvgSpritePlugin);
        Vue.use(ScrollToPlugin);
        Vue.use(ComponentMixinPlugin);
    }
};

export default UtilsPlugin;
