import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import * as _ from 'lodash';
import { MetaArgument, MetaComponent, MetaEvent } from 'meta-generator/dist';
import { Component, Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../../modul-website';
import WithRender from './component-events.html?style=./component-events.scss';

export interface ComponentEvents {
    name: string;
    arguments: string;
    description?: string;
    inheritFrom?: string;
}

@WithRender
@Component
export class MComponentEvents extends ModulWebsite {

    @Prop()
    componentName: string;

    get componentMeta(): MetaComponent {
        return this.$meta.metaService.findMetaComponentByTagName(this.componentName);
    }

    get columns(): MColumnTable[] {
        return [
            { id: 'name', title: 'Nom', dataProp: 'name' },
            { id: 'value', title: 'Arguments', dataProp: 'value', centered: true },
            { id: 'description', title: 'Description', dataProp: 'description', centered: true }
        ];
    }

    get events(): ComponentEvents[] {
        let events: ComponentEvents[] = this.mapMetaComponentEvent(this.componentMeta);

        if (this.componentMeta.mixins && this.componentMeta.mixins.length > 0) {
            this.componentMeta.mixins.forEach(mixinName => {
                const mixinMetaComponent: MetaComponent = this.$meta.metaService.findMetaComponentByTagName(_.kebabCase(mixinName));
                if (mixinMetaComponent.events && Object.keys(mixinMetaComponent.events).length > 0) {
                    events = events.concat(this.mapMetaComponentEvent(mixinMetaComponent, true));

                }
            });
        }
        return events;
    }

    private mapMetaComponentEvent(metaComponent: MetaComponent, inheritFrom = false): ComponentEvents[] {
        return Object.keys(metaComponent.events).map((eventName) => ({
            name: _.kebabCase(eventName),
            inheritFrom: inheritFrom ? _.kebabCase(metaComponent.componentName) : undefined,
            arguments: this.getArguments(metaComponent.events[eventName]),
            description: metaComponent.events[eventName].description ? metaComponent.events[eventName].description : undefined
        }));
    }

    private getArguments(event: MetaEvent): string {

        if (event.arguments && event.arguments.length > 0) {
            return event.arguments.map((value: MetaArgument) => (`${value.name}:${value.type}`)).join('&nbsp;/ ');
        } else {
            return '-';
        }
    }
}