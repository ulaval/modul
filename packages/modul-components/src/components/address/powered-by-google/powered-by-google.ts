import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { ModulVue } from '../../../utils/vue/vue';
import { POWERED_BY_GOOGLE } from '../../component-names';
import WithRender from './powered-by-google.html';

@WithRender
@Component
export class MPoweredByGoogle extends ModulVue { }

const PoweredByGooglePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(POWERED_BY_GOOGLE, MPoweredByGoogle);
    }
};

export default PoweredByGooglePlugin;
