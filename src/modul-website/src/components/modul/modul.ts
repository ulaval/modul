import { ComponentMeta } from '@/content/components.meta.loader';
import { ROUTER_PHILOSOPHY } from '@/router';
import { InputManagement } from '@ulaval/modul-components/dist/mixins/input-management/input-management';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import debounce from 'lodash/debounce';
import deburr from 'lodash/deburr';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './modul.html?style=./modul.scss';

console.debug('TODO: eliminate regex to identify current page');

// animation constant shared with css in header.scss and menu.scss
const CSS_ANIMATION_MENU_DURATION: number = 650;

type SearchResultComponent = {
    tag: string;
    category: string;
    text: string;
    url: string;
};

@WithRender
@Component({
    mixins: [MediaQueries]
})
export default class Modul extends ModulWebsite {

    $refs: {
        header: HTMLElement;
        searchfield: InputManagement;
    };

    searchOpen: boolean = false;
    searchModel: string = '';
    searchWidth: string = '400px';

    searchResult: SearchResultComponent[] = [];

    public logoUl: any = require('./logo-ul-blanc.svg');

    get isHomePage(): boolean {
        return this.$route.path == '/';
    }

    get isPhilosophyPage(): boolean {
        return this.$route.path === this.$routerIndex.for(ROUTER_PHILOSOPHY);
    }

    get searchData(): SearchResultComponent[] {
        let results: SearchResultComponent[] = [];
        this.$meta.categories.forEach(category => {
            this.$meta.componentState[category].forEach((componentMeta: ComponentMeta) => {
                if (componentMeta.components && componentMeta.components.length > 0) {
                    componentMeta.components.forEach(tag => {
                        results.push({
                            tag: tag,
                            category: category,
                            text: componentMeta.name,
                            url: componentMeta.url
                        });
                    });
                } else {
                    results.push({
                        tag: '',
                        category: category,
                        text: componentMeta.name,
                        url: componentMeta.url
                    });
                }
            });
        });
        return results;
    }

    getRouterIndex(tag: string): string {
        return this.$routerIndex.for(tag);
    }

    get isSearchOpen(): boolean {
        return this.searchOpen;
    }

    toggleSearch(): void {
        this.searchOpen = !this.searchOpen;
    }

    @Watch('searchModel')
    onSearcModelChange(searchTerm: string) {
        this.debouncedSearchFunction();
    }

    onSearch() {
        if (this.searchModel != '' && this.searchModel.length > 2) {
            this.searchResult = this.searchData.filter((searchResultComponent: SearchResultComponent) => {
                let textToSearch = searchResultComponent.category + ' ' + searchResultComponent.text + ' ' + searchResultComponent.tag;
                return deburr(textToSearch.toLowerCase()).match(deburr(this.searchModel.toLowerCase()));
            });
        }
    }

    debouncedSearchFunction = debounce(() => {
        this.onSearch();
    }, 300);

    openSearch(): void {
        this.searchOpen = true;
        setTimeout(() => {
            this.$refs.searchfield.focusInput();
        }, CSS_ANIMATION_MENU_DURATION);
    }

    closeSearch(): void {
        this.searchOpen = false;
        setTimeout(() => {
            this.searchModel = '';
            this.searchResult = [];
        }, CSS_ANIMATION_MENU_DURATION);
    }
}
