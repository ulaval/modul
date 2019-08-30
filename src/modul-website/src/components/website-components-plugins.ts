import Vue, { PluginObject } from 'vue';
import { MWCard, MWCARD_NAME } from './card/card';
import { COLOR_NAME, MColor } from './color/color';
import { COMPONENT_API_NAME, MComponentApi } from './component-api/component-api';
import { DEMO_NAME, MDemo } from './demo/demo';
import { DO_NAME, MDo } from './do/do';
import { DONT_NAME, MDont } from './dont/dont';
import { MDynamicTemplate } from './dynamic-template/dynamic-template';
import { MWExpandablePanel } from './expendable-panel/expandable-panel';
import { GO_NAME, MGo } from './go/go';
import { MWHeader, MWHEADER_NAME } from './header/header';
import { HIGHLIGHT_NAME, MHighlight } from './highlight/highlight';
import { ICON_GALLERY_NAME, MIconGallery } from './icon-gallery/icon-gallery';
import { MWLogo, MWLOGO_NAME } from './logo/logo';
import { MARKDOWN_NAME, MMarkdown } from './markdown/markdown';
import { MWMegaMenu, MWMEGAMENU_NAME } from './mega-menu/mega-menu';
import { MWPanel, MWPANEL_NAME } from './panel/panel';
import { MPreview, PREVIEW_NAME } from './preview/preview';
import SliderPlugin from './slider/slider';

const WebsiteComponentsPlugin: PluginObject<any> = {
    install(v): void {
        Vue.component(COLOR_NAME, MColor);
        Vue.component(DEMO_NAME, MDemo);
        Vue.component(DO_NAME, MDo);
        Vue.component(DONT_NAME, MDont);
        Vue.component(GO_NAME, MGo);
        Vue.component(MARKDOWN_NAME, MMarkdown);
        Vue.component(PREVIEW_NAME, MPreview);
        Vue.component(MWHEADER_NAME, MWHeader);
        Vue.component(MWMEGAMENU_NAME, MWMegaMenu);
        Vue.component(MWLOGO_NAME, MWLogo);
        Vue.component(MWCARD_NAME, MWCard);
        Vue.component(MWPANEL_NAME, MWPanel);
        Vue.component(HIGHLIGHT_NAME, MHighlight);
        Vue.component(ICON_GALLERY_NAME, MIconGallery);
        Vue.component(COMPONENT_API_NAME, MComponentApi);
        Vue.component('mw-dynamic-template', MDynamicTemplate);
        Vue.component('mw-expandable-panel', MWExpandablePanel);
        Vue.component('mw-expandable-panel', MWExpandablePanel);
        Vue.use(SliderPlugin);
    }
};

export default WebsiteComponentsPlugin;
