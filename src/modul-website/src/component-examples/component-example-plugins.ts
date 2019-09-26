import { PluginObject } from 'vue';
import { MWAutocompleteExample } from './autocomplete/autocomplete.example';
import { MWShowmoreExample } from './show-more/show-more.example';
import { MWToastExample } from './toast/toast.example';
import { MWToggleButtonsExample } from './toggle-buttons/toggle-buttons.example';
import { MWTransitionExample } from './transition/transition.example';
import { MWTreeExample } from './tree/tree.example';

const ComponentExamplesPlugin: PluginObject<any> = {
    install(v): void {
        v.component('mw-tree-example', MWTreeExample);
        v.component('mw-toast-example', MWToastExample);
        v.component('mw-transition-example', MWTransitionExample);
        v.component('mw-toggle-buttons-example', MWToggleButtonsExample);
        v.component('mw-autocomplete-example', MWAutocompleteExample);
        v.component('mw-show-more-example', MWShowmoreExample);
    }
};

export default ComponentExamplesPlugin;
