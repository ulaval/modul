import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, Getter } from 'vuex-class';
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

    @Getter('editedElement')
    public editedElement: QAElement | null;

    @Getter('editedElementLog')
    public editedElementLog: QAElementLog | null;

    @Action('updateSelectedElement')
    public updateSelectedElement: (payload: { element: QAElement | null }) => void;

    @Action('updateEditedElement')
    public updateEditedElement: (payload: { element: QAElement | null }) => void;

    @Action('updateEditedElementLog')
    public updateEditedElementLog: (payload: { elementLog: QAElementLog | null }) => void;

    public positionRight: boolean = true;
    public expanded: boolean = false;

    public get activeClass(): string {
        if (this.expanded) {
            return `m-qa-panel m-qa-panel--${this.positionRight ? 'right' : 'left'}`;
        }
        return 'm-qa-panel--collapsed';
    }

    public onBackClick(): void {
        if (this.editedElementLog) {
            this.updateEditedElementLog({ elementLog: null });
        } else if (this.editedElement) {
            this.updateEditedElement({ element: null });
        } else if (this.selectedElement) {
            this.updateSelectedElement({ element: null });
        }
    }

    public changeDock(): void {
        this.positionRight = !this.positionRight;
    }

    public toggle(): void {
        this.expanded = !this.expanded;
    }
}
