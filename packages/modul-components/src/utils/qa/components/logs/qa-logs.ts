import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MQAElement } from '../../qa-def';
import WithRender from './qa-logs.html?style=./qa-logs.scss';

@WithRender
@Component
export class MQALogs extends Vue {
    @Prop({ required: true })
    public element: MQAElement;
}
