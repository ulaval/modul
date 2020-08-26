import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { FormControl, FormGroup, RequiredValidator } from '../../../form';
import { QAElementLog, QAElementLogReply, QAUser } from '../../qa-def';
import WithRender from './qa-element-log-thread.html?style=./qa-element-log-thread.scss';

@WithRender
@Component
export class MQAElementLogThread extends Vue {
    @Prop({ required: true })
    public elementId: string;

    @Prop({ required: true })
    public elementLog: QAElementLog;

    @Getter('user')
    public user: QAUser;

    @Action('updateElementLogReplies')
    public updateElementLogReplies: (payload: {
        elementId: string,
        elementLogId: string,
        elementLogReply: QAElementLogReply
    }) => void;

    public formGroup: FormGroup | null = null;

    protected created(): void {
        this.formGroup = new FormGroup({
            body: new FormControl<string>([RequiredValidator()])
        });
    }

    public get bodyControl(): FromControl<string> {
        return this.formGroup!.getControl('body') as FormControl<string>;
    }

    public submit(): void {
        this.updateElementLogReplies({
            elementId: this.elementId,
            elementLogId: this.elementLog.id!,
            elementLogReply: {
                author: this.user,
                body: this.bodyControl.value
            }
        });
        this.formGroup!.reset();
    }
}
