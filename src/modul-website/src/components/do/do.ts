import Vue from 'vue';
import Component from 'vue-class-component';
import WithRender from './do.html?style=./do.scss';

@WithRender
@Component
export class MDo extends Vue {
}

export const DO_NAME: string = 'modul-do';
