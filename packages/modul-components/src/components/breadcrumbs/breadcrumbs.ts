import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { BREADCRUMBS_NAME } from '../component-names';
import { MLink, MLinkIconPosition, MLinkMode } from '../link/link';
import WithRender from './breadcrumbs.html?style=./breadcrumbs.scss';


export interface BreadcrumbItem {
    divider: string;
    iconName: string;
    disabled: boolean;
    text: string;
    url: string;
}

export interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
    divider?: string;
    disabled?: boolean;
}

@WithRender
@Component({
    components: {
        MLink
    }
})
export class MBreadcrumbs extends Vue implements BreadcrumbsProps {
    @Prop({ default: [] })
    public readonly items!: BreadcrumbItem[];

    @Prop({ default: '/' })
    public readonly divider!: string;

    @Prop({ default: false })
    public readonly disabled!: boolean;

    get definedItems(): BreadcrumbItem[] {
        return this.items.filter((item: BreadcrumbItem) => item.text || item.iconName);
    }

    itemDivider(index: number): string {
        return index < this.definedItems.length ? this.definedItems[index].divider || this.divider : '';
    }

    linkMode: MLinkMode = MLinkMode.Link;
    iconPosition: MLinkIconPosition = MLinkIconPosition.Left;
}

const BreadcrumbsPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(BREADCRUMBS_NAME, 'plugin.install');
        v.component(BREADCRUMBS_NAME, MBreadcrumbs);
    }
};

export default BreadcrumbsPlugin;
