import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

import { BREADCRUMBS_NAME } from '../component-names';
import LinkPlugin, { MLinkIconPosition, MLinkMode } from '../link/link';
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
@Component
export class MBreadcrumbs extends Vue implements BreadcrumbsProps {

    @Prop({ default: [] })
    public items!: BreadcrumbItem[];

    @Prop({ default: '/' })
    public divider!: string;

    @Prop({ default: false })
    public disabled!: boolean;

    get definedItems(): BreadcrumbItem[] {
        return this.items.filter((item: BreadcrumbItem) => item.text || item.iconName);
    }

    linkMode: MLinkMode = MLinkMode.Link;
    iconPosition: MLinkIconPosition = MLinkIconPosition.Left;
}

const BreadcrumbsPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(BREADCRUMBS_NAME, 'plugin.install');
        v.use(LinkPlugin);
        v.component(BREADCRUMBS_NAME, MBreadcrumbs);
    }
};

export default BreadcrumbsPlugin;
