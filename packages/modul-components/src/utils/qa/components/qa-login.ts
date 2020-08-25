import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import { MButton } from '../../../components/button/button';
import { MForm } from '../../../components/form/form';
import { MIcon } from '../../../components/icon/icon';
import { MInputGroup } from '../../../components/input-group/input-group';
import { MTextfield } from '../../../components/textfield/textfield';
import { FormControl, FormGroup, RequiredValidator } from '../../form';
import WithRender from './qa-login.html?style=./qa-login.scss';

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
export class MQAlogin extends Vue {
    @Action
    public login: (payload: { username: string, password: string }) => void;

    public formGroup: FormGroup = new FormGroup({
        username: new FormControl<string>([RequiredValidator()]),
        password: new FormControl<string>([RequiredValidator()])
    });

    public get usernameControl(): FormControl<string> {
        return this.formGroup.getControl('username') as FormControl<string>;
    }

    public get passwordControl(): FormControl<string> {
        return this.formGroup.getControl('password') as FormControl<string>;
    }

    public submit(): void {
        this.login(this.formGroup.value);
    }
}
