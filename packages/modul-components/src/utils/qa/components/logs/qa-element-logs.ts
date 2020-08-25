import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
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

    public selectedLog: MQAElementLog | null = null;

    public onAddClick(): void {
        this.selectedLog = { author: this.user };
    }
}
