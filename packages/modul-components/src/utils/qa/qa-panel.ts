import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import { MQAElement } from './qa-def';
import WithRender from './qa-panel.html?style=./qa-panel.scss';

@WithRender
@Component
export class MQAPanel extends Vue {
    @Getter('elements')
    public elements: MQAElement[];

    public expanded: boolean = true;

    public get inputClass(): string {
        return !this.expanded ? 'm-qa-panel' : 'm-qa-panel m-qa-panel--extended';
    }
}
