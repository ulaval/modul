
import { MWExpandablePanel } from '@/components/expendable-panel/expandable-panel';
import { ModulWebsite } from '@/components/modul-website';
import { ComponentMeta } from '@/content/components.meta.loader';
import _ from 'lodash';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MWComponent } from './component/component-details';
import WithRender from './components.html?style=./components.scss';

@WithRender
@Component({
    components: { 'mw-component-details': MWComponent }
})
export class MWComponentsPage extends ModulWebsite {

    @Prop()
    component: ComponentMeta;

    $refs: {
        expandablePanel: MWExpandablePanel;
        prevLink: Vue;
        nextLink: Vue;
    };

    fullPath: string;

    get componentCategoryIds(): string[] {
        return _.sortBy(this.$meta.categories, name => _.deburr(this.$i18n.translate(`categories:${name}`)));
    }

    get componentsNavigationOrder(): ComponentMeta[] {
        let components: ComponentMeta[] = [];
        this.componentCategoryIds.forEach(category => {
            this.$meta.componentState[category].forEach((componentMeta: ComponentMeta) => {
                components.push(componentMeta);
            });
        });
        return components;
    }

    get currentComponentNavigationIndex(): number {
        return _.findIndex(this.componentsNavigationOrder, (c: ComponentMeta) => {
            return this.component.name === c.name;
        });
    }

    get prevComponent(): ComponentMeta {
        let index = this.currentComponentNavigationIndex;

        // if this is the first item return the last
        if (index - 1 < 0) {
            return this.componentsNavigationOrder[this.componentsNavigationOrder.length - 1];
        } else {
            return this.componentsNavigationOrder[index - 1];
        }
    }

    get nextComponent(): ComponentMeta {
        let index = this.currentComponentNavigationIndex;

        // if this is the last item return the first
        if (index + 1 >= this.componentsNavigationOrder.length - 1) {
            return this.componentsNavigationOrder[0];
        } else {
            return this.componentsNavigationOrder[index + 1];
        }
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

    onPrevLinkClick() {
        (this.$refs.prevLink.$el as HTMLElement).blur();
    }

    onNextLinkClick() {
        (this.$refs.nextLink.$el as HTMLElement).blur();
    }

    @Watch('$route', { immediate: true })
    private routeChanged(): void {
        this.fullPath = this.$route.fullPath;
    }
}
