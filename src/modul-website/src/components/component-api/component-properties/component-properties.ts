import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import * as _ from 'lodash';
import { MetaComponent, MetaProps } from 'meta-generator/dist';
import { Component, Prop } from 'vue-property-decorator';
import { ModulWebsite } from '../../modul-website';
import WithRender from './component-properties.html?style=./component-properties.scss';

const BOOLEAN_TYPE: string = 'boolean';

export interface ComponentProperties {
    name: string;
    type: string;
    values: string;
    defaultValue?: string;
    description?: string;
    inheritFrom?: string;
}

@WithRender
@Component
export class MComponentProperties extends ModulWebsite {

    @Prop()
    componentName: string;

    get componentMeta(): MetaComponent {
        return this.$meta.metaService.findMetaComponentByTagName(this.componentName);
    }

    get columns(): MColumnTable[] {
        return [
            { id: 'name', title: this.$i18n.translate('modul:slots-name'), dataProp: 'name' },
            { id: 'value', title: this.$i18n.translate('modul:value'), dataProp: 'value', centered: true },
            { id: 'description', title: this.$i18n.translate('modul:description'), dataProp: 'description', centered: true }
        ];
    }

    get properties(): ComponentProperties[] {
        let properties: ComponentProperties[] = this.mapMetaComponentProps(this.componentMeta);

        if (this.componentMeta.mixins && this.componentMeta.mixins.length > 0) {
            this.componentMeta.mixins.forEach(mixinName => {
                const mixinMetaComponent: MetaComponent = this.$meta.metaService.findMetaComponentByTagName(_.kebabCase(mixinName));
                if (mixinMetaComponent.props && Object.keys(mixinMetaComponent.props).length > 0) {
                    properties = properties.concat(this.mapMetaComponentProps(mixinMetaComponent, true));

                }
            });
        }
        return properties;
    }

    private mapMetaComponentProps(mixinMetaComponent: MetaComponent, inheritFrom = false): ComponentProperties[] {
        let props: ComponentProperties[] = Object.keys(mixinMetaComponent.props).map((propName) => ({
            name: _.kebabCase(propName),
            inheritFrom: inheritFrom ? _.kebabCase(mixinMetaComponent.componentName) : undefined,
            type: mixinMetaComponent.props[propName].type ? mixinMetaComponent.props[propName].type : 'string',
            values: this.getValues(mixinMetaComponent.props[propName]),
            defaultValue: mixinMetaComponent.props[propName].default ? mixinMetaComponent.props[propName].default : undefined,
            description: mixinMetaComponent.props[propName].description ? mixinMetaComponent.props[propName].description : undefined
        }));

        return _.sortBy(props, (prop: ComponentProperties) => prop.name);
    }

    private getValues(attribute: MetaProps): string {
        let values = [];
        if (attribute.type == BOOLEAN_TYPE) {
            values = ['true', 'false'];
        } else {
            if (attribute.values && attribute.values.length > 0) {
                values = [...attribute.values];
            } else {
                values = ['-'];
            }
        }
        return values.map((value) => value.replace('-', '&#8209;')).join('&nbsp;/ ');
    }
}
