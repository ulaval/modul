
import { MWExpandablePanel } from '@/components/expendable-panel/expandable-panel';
import { ModulWebsite } from '@/components/modul-website';
import { ComponentMeta } from '@/content/components.meta.loader';
import _ from 'lodash';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MWComponent } from './component/component-details';
import WithRender from './components.html';

@WithRender
@Component({
    components: { 'mw-component-details': MWComponent }
})
export class MWComponentsPage extends ModulWebsite {

    @Prop()
    component: ComponentMeta;

    $refs: {
        expandablePanel: MWExpandablePanel;
    };

    fullPath: string;

    get componentCategoryIds(): string[] {
        return _.sortBy(this.$meta.categories, name => _.deburr(this.$i18n.translate(`categories:${name}`)));
    }

    getRouterIndex(tag: string): string {
        return this.$routerIndex.for(tag);
    }

    getCategoryComponents(category): ComponentMeta[] {
        return this.$meta.componentState[category];
    }

    urlMatchPath(categoryId: string) {
        let path: string = this.$i18n.translate(`categories:${categoryId}-route`);
        return this.fullPath.includes(`/${path}`);
    }

    onSideMenuSelection() {
        this.$refs.expandablePanel.onSideMenuSelection();
    }

    @Watch('$route', { immediate: true })
    private routeChanged(): void {
        this.fullPath = this.$route.fullPath;
    }
}
