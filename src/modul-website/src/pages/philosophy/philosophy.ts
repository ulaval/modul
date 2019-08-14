
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import WithRender from './philosophy.html?style=./philosophy.scss';

@WithRender
@Component
export class MWPhilosophyPage extends ModulVue {
}
