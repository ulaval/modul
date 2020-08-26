import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { FormControl, FormGroup, RequiredValidator } from '../../../form';
import { QAElement } from '../../qa-def';
import WithRender from './qa-element-form.html?style=./qa-element-form.scss';

@WithRender
@Component
export class MQAElementForm extends Vue {
    @Prop({ required: true })
    public element: QAElement;

    @Action('updateElement')
    public updateElement: (payload: { element: QAElement }) => void;

    public formGroup: FormGroup | null = null;

    protected created(): void {
        this.formGroup = new FormGroup({
            name: new FormControl<string>([RequiredValidator()], { initialValue: this.element.name }),
            docUrl: new FormControl<string>([], { initialValue: this.element.docUrl })
        });
    }

    public get nameControl(): FormControl<string> {
        return this.formGroup!.getControl('name') as FormControl<string>;
    }

    public get docUrlControl(): FormControl<string> {
        return this.formGroup!.getControl('docUrl') as FormControl<string>;
    }

    public submit(): void {
        const clone = Object.assign(this.element, this.formGroup!.value);
        this.updateElement(clone);
        this.formGroup = null;
    }
}
