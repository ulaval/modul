import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MQAElement } from '../../qa-def';
import WithRender from './qa-element-details.html?style=./qa-element-details.scss';

@WithRender
@Component
export class MQAElementDetails extends Vue {
    @Prop({ required: true })
    public element: MQAElement;

    public editing: boolean = false;
}
