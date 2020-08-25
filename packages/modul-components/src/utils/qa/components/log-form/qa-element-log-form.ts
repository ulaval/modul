import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { FormControl, FormGroup, RequiredValidator } from '../../../form';
import { MQAElementLog } from '../../qa-def';
import WithRender from './qa-element-log-form.html?style=./qa-element-log-form.scss';

@WithRender
@Component
export class MQAElementLogForm extends Vue {
    @Prop({ required: true })
    public elementId: string;

    @Prop({ required: true })
    public log: MQAElementLog;

    @Action('updateLog')
    public updateLog: (payload: { elementId: string, log: MQAElementLog }) => void;

    public formGroup: FormGroup | null = null;
    public types = ['error', 'question', 'comments'];

    protected created(): void {
        this.formGroup = new FormGroup({
            body: new FormControl<string>([RequiredValidator()], { initialValue: this.log.body }),
            type: new FormControl<string>([RequiredValidator()], { initialValue: this.log.type || 'error' }),
            needResolve: new FormControl<boolean>([], { initialValue: this.log.needResolve || true }),
        });
    }

    public get bodyControl(): FormControl<string> {
        return this.formGroup!.getControl('body') as FormControl<string>;
    }

    public get typeControl(): FormControl<string> {
        return this.formGroup!.getControl('type') as FormControl<string>;
    }

    public get needResolveControl(): FormControl<boolean> {
        return this.formGroup!.getControl('needResolve') as FormControl<boolean>;
    }

    public onTypeChange(type: string): void {
        if (this.typeControl.value === 'error') {
            this.needResolveControl.value = true;
        }
    }

    public submit(): void {
        const clone = Object.assign(this.log, this.formGroup!.value);
        this.updateLog({ elementId: this.elementId, log: clone });
        this.formGroup = null;
        this.$emit('back');
    }
}
