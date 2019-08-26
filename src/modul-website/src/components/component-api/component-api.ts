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

    private selectedItem: string = 'props';

    @Prop()
    componentName: string;

    get componentMeta(): MetaComponent {
        return this.$meta.metaService.findMetaComponentByTagName(this.componentName);
    }
}

export const COMPONENT_API_NAME: string = 'mw-component-api';
