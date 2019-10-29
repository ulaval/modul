import Vue, { PluginObject } from 'vue';
import ComponentsPlugin from './components';
import DirectivesPlugin from './directives';
import FiltersPlugin from './filters';
import FrenchPlugin from './lang';
import EnglishPlugin from './lang/en';
import UtilsPlugin, { UtilsPluginOptions } from './utils';
import { FRENCH } from './utils/i18n/i18n';
import './utils/polyfills';
import DefaultSpritesPlugin from './utils/svg/default-sprites';


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
        Vue.use(FrenchPlugin);
        Vue.use(EnglishPlugin);
        Vue.use(DefaultSpritesPlugin);
        Vue.use(ComponentsPlugin);
        Vue.use(DirectivesPlugin);
        Vue.use(FiltersPlugin);
    }

};

export default ModulComponentPlugin;

