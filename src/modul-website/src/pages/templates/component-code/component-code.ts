
import { ComponentMeta } from '@/content/components.meta.loader';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { MetaComponent } from 'meta-generator/dist/model';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './component-code.html';

@WithRender
@Component
export class MWComponentCode extends ModulVue {

    @Prop()
    component: ComponentMeta;

    get componentMetas(): MetaComponent[] {
        return this.component.components.map(tag => {
            return this.$meta.metaService.findMetaComponentByTagName(tag);
        });
    }

}
