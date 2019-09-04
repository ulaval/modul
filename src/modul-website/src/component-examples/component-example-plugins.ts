import Vue, { PluginObject } from 'vue';
import { MWToastExample } from './toast/toast.example';
import { MWTransitionExample } from './transition/transition.example';
import { MWTreeExample } from './tree/tree.example';

const ComponentExamplesPlugin: PluginObject<any> = {
    install(v): void {
        Vue.component('mw-tree-example', MWTreeExample);
        Vue.component('mw-toast-example', MWToastExample);
        Vue.component('mw-transition-example', MWTransitionExample);
    }
};

export default ComponentExamplesPlugin;
