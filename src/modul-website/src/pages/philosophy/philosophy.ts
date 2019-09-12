
import { ROUTER_STANDARDS_UI_BREAKPOINTS } from '@/router';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import WithRender from './philosophy.html?style=./philosophy.scss';

@WithRender
@Component
export class MWPhilosophyPage extends ModulVue {

    public get breakpoints(): any {
        return { name: ROUTER_STANDARDS_UI_BREAKPOINTS };
    }
}
