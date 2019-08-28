import { ROUTER_PHILOSOPHY } from '@/router';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { normalizeString } from '@ulaval/modul-components/dist/utils/str/str';
import Component from 'vue-class-component';
import { ModulWebsite } from '../modul-website';
import WithRender from './modul.html?style=./modul.scss';

console.debug('TODO: eliminate regex to identify current page');

// animation constant shared with css in header.scss and menu.scss
const CSS_ANIMATION_MENU_DURATION: number = 650;

type Component = {
    tag: string;
    category: string;
    text: string;
};

@WithRender
@Component({
    mixins: [MediaQueries]
})
export default class Modul extends ModulWebsite {

    private searchOpen: boolean = false;
    private searchModel: string = '';
    private searchWidth: string = '400px';

    private components: Component[] = [];
    public logoUl: any = require('./logo-ul-blanc.svg');

    // get modulVersion() {
    //     return MetaAll.getModulVersion();
    // }

    public get isHomePage(): boolean {
        return this.$route.path == '/';
    }

    public get isPhilosophyPage(): boolean {
        return this.$route.path === this.$routerIndex.for(ROUTER_PHILOSOPHY);
    }

    // TODO: another way to index?
    // private searchData(): any[] {
    //     return MetaAll.getAllMeta().map(metaData => {
    //         let nameObj: {};
    //         if (metaData.name && metaData.category) {
    //             nameObj = {
    //                 tag: metaData.tag,
    //                 category: this.$i18n.translate(metaData.category),
    //                 text: this.$i18n.translate(metaData.name)
    //             };
    //         } else {
    //             nameObj = {
    //                 tag: metaData.tag,
    //                 category: undefined,
    //                 text: undefined
    //             };
    //         }
    //         return nameObj;
    //     });
    // }

    private get searchResult(): any[] {
        let filtereComponents: any[] = [];
        if (this.searchModel != '') {
            filtereComponents = this.components.filter((element) => {
                let textToSearch = element.category + ' ' + element.text + ' ' + element.tag;
                return normalizeString(textToSearch).match(normalizeString(this.searchModel));
            });
        }
        return filtereComponents;
    }

    private get isSearchOpen(): boolean {
        return this.searchOpen;
    }

    // private isProduction(status): boolean {
    //     return status === ModulComponentStatus.Production;
    // }

    private toggleSearch(): void {
        this.searchOpen = !this.searchOpen;
        // if (this.searchOpen) {
        //     this.components = this.searchData();
        // }
    }

    private openSearch(): void {
        this.searchOpen = true;
        setTimeout(() => {
            (this.$refs.search as HTMLInputElement).focus();
        }, CSS_ANIMATION_MENU_DURATION);
    }

    private closeSearch(): void {
        this.searchOpen = false;
        setTimeout(() => {
            this.searchModel = '';
        }, CSS_ANIMATION_MENU_DURATION);
    }
}
