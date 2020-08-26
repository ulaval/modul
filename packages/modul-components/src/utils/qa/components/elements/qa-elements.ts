import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { QAElement } from '../../qa-def';
import WithRender from './qa-elements.html?style=./qa-elements.scss';

@WithRender
@Component
export class MQAElements extends Vue {
    @Prop({ required: true })
    public elements: QAElement[];

    public elementIsStable(element: QAElement): boolean {
        return !element.logs.some(l => !l.resolved && l.needResolve === true);
    }

    public onElementMouseEnter(id: string): void {
        const element: HTMLElement = document.querySelector(
            `[data-qa='${id}']`
        )! as HTMLElement;

        if (!element) {
            return;
        }

        element.style.border = '2px red solid';
    }

    public onElementMouseLeave(id: string): void {
        const element: HTMLElement = document.querySelector(
            `[data-qa='${id}']`
        )! as HTMLElement;

        if (!element) {
            return;
        }

        element.style.border = 'none';
    }

    public onElementMouseClick(id: string): void {
        this.onElementMouseLeave(id);
        this.$emit('element-selected', this.elements.find(e => e.id === id));
    }
}
