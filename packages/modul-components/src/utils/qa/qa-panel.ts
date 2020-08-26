import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import { QAElement, QAElementLog, QAUser } from './qa-def';
import WithRender from './qa-panel.html?style=./qa-panel.scss';

@WithRender
@Component
export class MQAPanel extends Vue {
    @Getter('user')
    public user: QAUser;

    @Getter('elements')
    public elements: QAElement[];

    @Getter('selectedElement')
    public selectedElement: QAElement | null;

    @Getter('selectedElementLog')
    public selectedElementLog: QAElementLog | null;

    @Getter('editingElement')
    public editingElement: QAElement | null;

    @Getter('editingElementLog')
    public editingElementLog: QAElementLog | null;

    public positionRight: boolean = true;
    public expanded: boolean = false;

    public get activeClass(): string {
        if (this.expanded) {
            return `m-qa-panel m-qa-panel--${this.positionRight ? 'right' : 'left'}`;
        }
        return '';
    }

    public onBackClick(): void {

    }

    public changeDock(): void {
        this.positionRight = !this.positionRight;
    }

    public toggle(): void {
        this.expanded = !this.expanded;
    }
}
