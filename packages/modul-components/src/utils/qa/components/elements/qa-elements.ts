import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MQAElement } from '../../qa-def';
import WithRender from './qa-elements.html?style=./qa-elements.scss';

@WithRender
@Component
export class MQAElements extends Vue {
    @Prop({ required: true })
    public elements: MQAElement[];

    public elementHasError(element: MQAElement): boolean {
        return element.logs.some(l => l.type === 'error');
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
}
