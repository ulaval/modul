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
    public selectedElement: MQAElement | null = null;
}

// todo: toast
