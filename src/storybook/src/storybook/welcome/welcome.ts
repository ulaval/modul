import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Component from 'vue-class-component';
import WithRender from './welcome.html?style=./welcome.scss';

declare var COMMITHASH: string;
declare var BRANCH: string;
declare var BUILDDATE: string;
declare var MODULVERSION: string;

@WithRender
@Component
export class Welcome extends ModulVue {


    public date: string = BUILDDATE;
    public modulVersion: string = MODULVERSION;
    public gitRevisionBranch: string = BRANCH;
    public gitCommitHash: string = COMMITHASH;
}
