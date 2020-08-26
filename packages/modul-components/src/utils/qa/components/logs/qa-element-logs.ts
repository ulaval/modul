import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { QAElementLog, QAUser } from '../../qa-def';
import WithRender from './qa-element-logs.html?style=./qa-element-logs.scss';

@WithRender
@Component
export class MQAElementLogs extends Vue {
    @Prop({ required: true })
    public elementId: string;

    @Prop({ required: true })
    public elementLogs: QAElementLog[];

    @Getter('user')
    public user: QAUser;

    @Action('updateElementLog')
    public updateLog: (payload: {
        elementId: string,
        elementLog: QAElementLog
    }) => void;

    @Action('deleteElementLog')
    public deleteLog: (payload: {
        elementId: string,
        elementLogId: string
    }) => void;

    public onAddClick(): void {
        this.$emit('element-log-edited', { author: this.user });
    }

    public onLogClick(log: QAElementLog): void {

    }

    public onResolvedClick(log: QAElementLog): void {
        const clone = Object.assign(log, { resolved: !log.resolved });
        this.updateLog({ elementId: this.elementId, elementLog: clone });
    }

    public onEditClick(log: QAElementLog): void {
        this.$emit('element-log-edited', log);
    }

    public onDeleteClick(log: QAElementLog): void {
        this.deleteLog({
            elementId: this.elementId,
            elementLogId: log.id!
        });
    }
}
