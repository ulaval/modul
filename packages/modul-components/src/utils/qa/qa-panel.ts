import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import { MButton } from '../../components/button/button';
import { MForm } from '../../components/form/form';
import { MIcon } from '../../components/icon/icon';
import { MInputGroup } from '../../components/input-group/input-group';
import { MTextfield } from '../../components/textfield/textfield';
import { MQAElement, MQAUser } from './qa-def';
import WithRender from './qa-panel.html?style=./qa-panel.scss';

@WithRender
@Component({
    components: {
        MForm,
        MButton,
        MTextfield,
        MIcon,
        MInputGroup
    }
})
export class MQAPanel extends Vue {
    @Getter('elements')
    public elements: MQAElement[];
    @Getter('user')
    public user: MQAUser;

    public expanded: boolean = true;
    public stableModel: string[] = ['stable', 'unstable'];
    public selectedElement: MQAElement | null = null;

    public get inputClass(): string {
        return !this.expanded ? 'm-qa-panel' : 'm-qa-panel m-qa-panel--extended';
    }

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
