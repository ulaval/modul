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

    public positionRight: boolean = true;
    public expanded: boolean = false;
    public selectedElement: MQAElement | null = null;

    public get activeClass(): string {
        if (this.expanded) {
            return `m-qa-panel m-qa-panel--${this.positionRight ? 'right' : 'left'}`;
        }
        return '';
    }

    public changeDock(): void {
        this.positionRight = !this.positionRight;
    }

    public toggle(): void {
        this.expanded = !this.expanded;
    }
}

// todo: toast
