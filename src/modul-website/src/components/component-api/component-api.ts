import { ComponentMeta } from '@/content/components.meta.loader';
import { MetaComponent } from 'meta-generator/dist';
import { Component, Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './component-api.html?style=./component-api.scss';
import { MComponentEvents } from './component-events/component-events';
import { MComponentProperties } from './component-properties/component-properties';
import { MComponentSlots } from './component-slots/component-slots';

@WithRender
@Component({
    components: {
        'modul-component-properties': MComponentProperties,
        'modul-component-events': MComponentEvents,
        'modul-component-slots': MComponentSlots
    }
})
export class MComponentApi extends ModulWebsite {

    @Prop()
    component: ComponentMeta;

    componentMeta: MetaComponent = null;

    beforeMount() {
        if (this.componentMetas && this.componentMetas.length > 0) {
            this.componentMeta = this.componentMetas[0];
        }
    }

    get componentMetas(): MetaComponent[] {
        return this.component.components.map(tag => {
            return this.$meta.metaService.findMetaComponentByTagName(tag);
        });
    }
}

export const COMPONENT_API_NAME: string = 'mw-component-api';
