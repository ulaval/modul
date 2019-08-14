
import { ModulWebsite } from '@/components/modul-website';
import { ComponentMeta } from '@/content/components.meta.loader';
import { MediaQueries, MediaQueriesMixin } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { MWComponent } from './component/component-details';
import WithRender from './components.html?style=./components.scss';

@WithRender
@Component({
    components: { 'mw-component-details': MWComponent },
    mixins: [MediaQueries]
})
export class MWComponentsPage extends ModulWebsite {

    @Prop()
    component: ComponentMeta;

    showMenu = false;

    mounted() {
        this.isMqMinMChanged(this.as<MediaQueriesMixin>().isMqMinM);
    }

    @Watch('isMqMinM')
    private isMqMinMChanged(value): void {
        this.showMenu = value;
    }

    get componentCategoryIds(): string[] {
        return Object.keys(this.$meta.componentState);
    }

    getRouterIndex(tag: string): string {
        return this.$routerIndex.for(tag);
    }

    getCategoryComponents(category): ComponentMeta[] {
        return this.$meta.componentState[category].sort((a, b) => {
            return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
        });
    }

    onSideMenuSelection() {
        if (this.showMenu && this.as<MediaQueriesMixin>().isMqMaxM) {
            this.showMenu = false;
        }
    }

    urlMatchPath(categoryId: string) {
        let path: string = this.$i18n.translate(`categories:${categoryId}-route`);
        return this.$route.fullPath.includes(`/${path}`);
    }

    toggleMenu() {
        this.showMenu = !this.showMenu;
    }
}
