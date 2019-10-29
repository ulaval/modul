import Vue, { PluginObject } from 'vue';
import ComponentsPlugin from './components/components-plugin';
import DirectivesPlugin from './directives/directives-plugin';
import FiltersPlugin from './filters/filters-plugin';
import { FRENCH } from './utils/i18n/i18n';
import './utils/polyfills';
import DefaultSpritesPlugin from './utils/svg/default-sprites';
import UtilsPlugin, { UtilsPluginOptions } from './utils/utils-plugin';

export { default as EnglishPlugin } from './lang/en';
export { default as FrenchPlugin } from './lang/fr';

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
    }

};

export default ModulComponentPlugin;

