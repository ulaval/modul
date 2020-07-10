import Vue, { CreateElement, PluginObject, VNode } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { DYNAMIC_TEMPLATE_NAME } from '../component-names';
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
            if (Vue.compile !== undefined) {
                Vue.component(this.tag, {
                    template: `<div>${this.template}</div>`
                });
            } else {
                const innerHTML: string = this.template;

                Vue.component(this.tag, {
                    render: function(createElement: CreateElement): VNode {
                        return createElement('div', { domProps: { innerHTML } });
                    }
                });
            }
        } else {
            Vue.component(this.tag, this.template);
        }
        return this.tag;
    }
}

const DynamicTemplatePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(DYNAMIC_TEMPLATE_NAME, MDynamicTemplate);
    }
};

export default DynamicTemplatePlugin;
