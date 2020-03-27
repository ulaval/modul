import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import kebabCase from 'lodash/kebabCase';
import sortBy from 'lodash/sortBy';
import { MetaComponent } from 'meta-generator/dist';
import { Component, Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../../modul-website';
import WithRender from './component-slots.html?style=./component-slots.scss';

export interface ComponentSlot {
    name: string;
    description?: string;
}

@WithRender
@Component
export class MComponentSlots extends ModulWebsite {

    @Prop()
    componentName: string;

    get componentMeta(): MetaComponent {
        return this.$meta.metaService.findMetaComponentByTagName(this.componentName);
    }

    get columns(): MColumnTable[] {
        return [
            { id: 'name', title: this.$i18n.translate('modul:slots-name'), dataProp: 'name' },
            { id: 'description', title: this.$i18n.translate('modul:description'), dataProp: 'description' }
        ];
    }

    get slots(): ComponentSlot[] {
        let slots: ComponentSlot[] = this.mapMetaComponentSlot(this.componentMeta);

        if (this.componentMeta.mixins && this.componentMeta.mixins.length > 0) {
            this.componentMeta.mixins.forEach(mixinName => {
                const mixinMetaComponent: MetaComponent = this.$meta.metaService.findMetaComponentByTagName(kebabCase(mixinName));
                if (mixinMetaComponent.slots && Object.keys(mixinMetaComponent.slots).length > 0) {
                    slots = slots.concat(this.mapMetaComponentSlot(mixinMetaComponent, true));

                }
            });
        }
        return slots;
    }

    private mapMetaComponentSlot(metaComponent: MetaComponent, inheritFrom = false): ComponentSlot[] {
        let slots: ComponentSlot[] = Object.keys(metaComponent.slots).map((slotName) => ({
            name: kebabCase(slotName),
            inheritFrom: inheritFrom ? kebabCase(metaComponent.componentName) : undefined,
            description: metaComponent.slots[slotName].description ? metaComponent.slots[slotName].description : undefined
        }));

        return sortBy(slots, (slot: ComponentSlot) => slot.name);
    }
}
