import ButtonPlugin from '@ulaval/modul-components/dist/components/button/button';
import FrenchPlugin from '@ulaval/modul-components/dist/lang/fr';
import '@ulaval/modul-components/dist/styles/main.scss';
import { FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import '@ulaval/modul-components/dist/utils/polyfills';
import DefaultSpritesPlugin from '@ulaval/modul-components/dist/utils/svg/default-sprites';
import UtilsPlugin, { UtilsPluginOptions } from '@ulaval/modul-components/dist/utils/utils-plugin';
import Vue, { PluginObject } from 'vue';


export const ModulPlugin: PluginObject<any> = {
    install(v, options): void {

        Vue.config.productionTip = false;

        let utilsOptions: UtilsPluginOptions = {
            propagateVueParserErrors: false,
            i18PluginOptions: {
                curLang: FRENCH
            }
        };

        Vue.use(UtilsPlugin, utilsOptions);
        Vue.use(FrenchPlugin);
        Vue.use(DefaultSpritesPlugin);


        Vue.use(ButtonPlugin);

    }
};
