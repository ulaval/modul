import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { MQAElementLog, MQAUser } from '../../qa-def';
import WithRender from './qa-element-logs.html?style=./qa-element-logs.scss';

@WithRender
@Component
export class MQAElementLogs extends Vue {
    @Prop({ required: true })
    public elementId: string;

    @Prop({ required: true })
    public logs: MQAElementLog[];

    @Getter('user')
    public user: MQAUser;

    @Action('updateLog')
    public updateLog: (payload: {
        elementId: string,
        log: MQAElementLog
    }) => void;

    @Action('deleteLog')
    public deleteLog: (payload: {
        elementId: string,
        logId: string
    }) => void;

    public selectedLog: MQAElementLog | null = null;

    public onAddClick(): void {
        this.selectedLog = { author: this.user };
    }

    public onLogClick(log: MQAElementLog): void {

    }

    public onResolvedClick(log: MQAElementLog): void {
        const clone = Object.assign(log, { resolved: !log.resolved });
        this.updateLog({ elementId: this.elementId, log: clone });
    }

    public onDeleteClick(log: MQAElementLog): void {
        this.deleteLog({
            elementId: this.elementId,
            logId: log.id!
        });
    }
}
