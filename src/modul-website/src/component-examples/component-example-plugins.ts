import Vue, { PluginObject } from 'vue';
import { MWAutocompleteExample } from './autocomplete/autocomplete.example';
import { MWMultiSelectExample } from './multi-select/multi-select.example';
import { MWShowmoreExample } from './show-more/show-more.example';
import { MWToastExample } from './toast/toast.example';
import { MWToggleButtonsExample } from './toggle-buttons/toggle-buttons.example';
import { MWTransitionExample } from './transition/transition.example';
import { MWTreeExample } from './tree/tree.example';

const ComponentExamplesPlugin: PluginObject<any> = {
    install(v): void {
        Vue.component('mw-tree-example', MWTreeExample);
        Vue.component('mw-toast-example', MWToastExample);
        Vue.component('mw-transition-example', MWTransitionExample);
        Vue.component('mw-toggle-buttons-example', MWToggleButtonsExample);
        Vue.component('mw-autocomplete-example', MWAutocompleteExample);
        Vue.component('mw-show-more-example', MWShowmoreExample);
        Vue.component('mw-multi-select-example', MWMultiSelectExample);
    }
};

export default ComponentExamplesPlugin;
