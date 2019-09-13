import uuid from '@ulaval/modul-components/dist/utils/uuid/uuid';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './dynamic-template.html';

@WithRender
@Component
export class MDynamicTemplate extends Vue {
    @Prop()
    public template: string;

    private tag: string = 'm-dt-' + uuid.generate();

    protected mounted(): void {
        this.$emit('mounted', this.$children);
    }

    protected updated(): void {
        this.$emit('updated', this.$children);
    }

    private get internalTemplate(): string {
        if (typeof this.template === 'string') {
            Vue.component(this.tag, {
                template: `<div>${this.template}</div>`
            });
        } else {
            Vue.component(this.tag, this.template);
        }
        return this.tag;
    }
}
