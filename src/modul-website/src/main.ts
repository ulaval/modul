
import '@ulaval/modul-components/dist/styles/main.scss';
import { FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import '@ulaval/modul-components/dist/utils/polyfills';
import Vue from 'vue';
import { VueRouter } from 'vue-router/types/router';
import Vuex, { Store } from 'vuex';
import Modul from './components/modul/modul';
import WebsiteComponentsPlugin from './components/website-components-plugins';
import ModulPlugin from './modul';
import { ModulMeta } from './modul-meta';
import routerFactory, { ModulRouter } from './router';
import { ComponentsModulePlugin } from './store/modules/components/components-module';
import './styles/main.scss';
import SvgPlugin from './utils/svg';

Vue.config.productionTip = false;
const curLang: string = localStorage.getItem('lang') || FRENCH;

Vue.use(ModulPlugin, { curLang });
Vue.use(SvgPlugin);
Vue.use(WebsiteComponentsPlugin);
Vue.use(Vuex);

const store: Store<any> = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production'
});

Vue.use(ComponentsModulePlugin, { store });

let langPromise: Promise<any>;

if (curLang === FRENCH) {
    langPromise = import(/* webpackChunkName: "fr" */ './lang/fr/fr');
} else {
    throw Error('English not set!');
}

langPromise.then((langPlugin: any) => {
    Vue.use(langPlugin.default);

    let modulRouter: ModulRouter = routerFactory(langPlugin.meta as ModulMeta);
    let router: VueRouter = modulRouter.router;

    const vue = new Vue({
        store,
        router,
        template: '<modul></modul>',
        components: { Modul }
    });

    Vue.prototype.$routerIndex = modulRouter.index;

    vue.$mount('#vue');
});
