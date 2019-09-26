import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import WithRender from './welcome.html?style=./welcome.scss';

@WithRender
@Component
export class Welcome extends ModulVue {

}
