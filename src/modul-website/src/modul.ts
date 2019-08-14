import AccordionPlugin from '@ulaval/modul-components/dist/components/accordion/accordion';
import ButtonPlugin from '@ulaval/modul-components/dist/components/button/button';
import DropdownPlugin from '@ulaval/modul-components/dist/components/dropdown/dropdown';
import ExpandableLayoutPlugin from '@ulaval/modul-components/dist/components/expandable-layout/expandable-layout';
import I18nPlugin from '@ulaval/modul-components/dist/components/i18n/i18n';
import IconButtonPlugin from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import IconPlugin from '@ulaval/modul-components/dist/components/icon/icon';
import LinkPlugin from '@ulaval/modul-components/dist/components/link/link';
import MenuPlugin from '@ulaval/modul-components/dist/components/menu/menu';
import MessagePlugin from '@ulaval/modul-components/dist/components/message/message';
import ModalPlugin from '@ulaval/modul-components/dist/components/modal/modal';
import NavbarPlugin from '@ulaval/modul-components/dist/components/navbar/navbar';
import PanelPlugin from '@ulaval/modul-components/dist/components/panel/panel';
import SearchfieldPlugin from '@ulaval/modul-components/dist/components/searchfield/searchfield';
import SliderPlugin from '@ulaval/modul-components/dist/components/slider/slider';
import TextfieldPlugin from '@ulaval/modul-components/dist/components/textfield/textfield';
import { UtilsPlugin } from '@ulaval/modul-components/dist/utils';
import Vue, { PluginObject } from 'vue';

const ModulPlugin: PluginObject<any> = {
    install(v, options): void {

        Vue.use(UtilsPlugin, { propagateVueParserErrors: false, i18PluginOptions: { curLang: options.curLang } });
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(IconButtonPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(NavbarPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ModalPlugin);
        Vue.use(SliderPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(TextfieldPlugin);
        Vue.use(MenuPlugin);
        Vue.use(PanelPlugin);
        Vue.use(MessagePlugin);
        Vue.use(SearchfieldPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(ExpandableLayoutPlugin);
    }
};

export default ModulPlugin;
