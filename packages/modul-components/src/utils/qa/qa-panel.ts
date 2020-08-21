import Vue from 'vue';
import Component from 'vue-class-component';
import { MQAForm } from './qa-form';
import WithRender from './qa-panel.html?style=./qa-panel.scss';
import { QAData } from './qa-service';

@WithRender
@Component({
    components: {
        'm-qa-form': MQAForm
    }
})
export class MQAPanel extends Vue {
    public data: { [id: string]: QAData } = {};
    public expanded: boolean = true;
    public editingItem: QAData | null = null;

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

    public onAddClick(id: string): void {
        this.editingItem = this.data[id];
    }

    public onExpandClick(): void {
        this.expanded = !this.expanded;
    }
}
