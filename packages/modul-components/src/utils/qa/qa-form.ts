import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { MModal } from '../../components/modal/modal';
import { MTextfield } from '../../components/textfield/textfield';
import { FormControl, FormGroup, RequiredValidator } from '../form';
import WithRender from './qa-form.html?style=./qa-form.scss';

@WithRender
@Component({
    components: {
        'm-modal': MModal,
        'm-textfield': MTextfield
    }
})
export class MQAForm extends Vue {
    @Prop({ default: false })
    public openProp: boolean;

    public formGroup: FormGroup = new FormGroup({
        message: new FormControl<string>([RequiredValidator()])
    });

    @Emit('submited')
    public emitSubmited(): void {
        this.$emit(this.formGroup!.value);
    }

    public onSubmit(): void {
        if (!this.formGroup!.valid) {
            return;
        }

        this.emitSubmited();
    }
}
