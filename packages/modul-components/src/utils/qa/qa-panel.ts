import Vue from 'vue';
import Component from 'vue-class-component';
import { MTextfield } from '../../components/textfield/textfield';
import WithRender from './qa-panel.html?style=./qa-panel.scss';
import { QAData } from './qa-service';

@WithRender
@Component({
    components: {
        'm-textfield': MTextfield
    }
})
export class MQAPanel extends Vue {
    public expanded: boolean = true;
    public data: { [id: string]: QAData } = {};

    public get dataIds(): string[] {
        return Object.keys(this.data);
    }

    public get inputClass(): string {
        return !this.expanded ? 'm-qa-panel' : 'm-qa-panel m-qa-panel--extended';
    }

    public onMouseEnter(id: string): void {
        this.data[id].el.style.border = '1px red solid';
    }

    public onMouseLeave(id: string): void {
        this.data[id].el.style.border = 'none';
    }

    public onExpandClick(): void {
        this.expanded = !this.expanded;
    }
}
