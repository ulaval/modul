// import MetaAll from '@/meta/meta-all';
import { ComponentMeta } from '@/content/components.meta.loader';
import { ROUTER_PHILOSOPHY, ROUTER_STANDARDS_ACCESSIBILITY, ROUTER_STANDARDS_ACCESSIBILITY_CHEATSHEET, ROUTER_STANDARDS_ACCESSIBILITY_IMPLEMENTATION, ROUTER_STANDARDS_ACCESSIBILITY_WHY, ROUTER_STANDARDS_DEVELOPMENT, ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS, ROUTER_STANDARDS_DEVELOPMENT_TYPESCRIPT, ROUTER_STANDARDS_EDITORIAL, ROUTER_STANDARDS_EDITORIAL_FORMAT, ROUTER_STANDARDS_EDITORIAL_GLOSSARY, ROUTER_STANDARDS_EDITORIAL_MESSAGE_BANK, ROUTER_STANDARDS_EDITORIAL_MESSAGE_PUNCTUATION, ROUTER_STANDARDS_EDITORIAL_TONE, ROUTER_STANDARDS_UI, ROUTER_STANDARDS_UI_BREAKPOINTS, ROUTER_STANDARDS_UI_COLORS, ROUTER_STANDARDS_UI_ICONOGRAPHY, ROUTER_STANDARDS_UI_TYPOGRAPHY } from '@/router';
import IconButtonPlugin from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import _ from 'lodash';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { ModulWebsite } from '../modul-website';
import WithRender from './mega-menu.html?style=./mega-menu.scss';

type Page = {
    id: string;
    text: string;
};

type Category = {
    id: string;
    text: string;
    pages?: Page[];
};

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWMegaMenu extends ModulWebsite {

    categoriesComponent: Category[] = [];
    pagesStandards: Category[] = [];
    menuSection: string = '';
    menuLevelOne: boolean = true;

    @Prop()
    public type: string;

    @Prop({ default: false })
    public open: boolean;

    beforeMount(): void {

        _.sortBy(this.$meta.categories, name => _.deburr(this.$i18n.translate(`categories:${name}`))).forEach(category => {
            this.categoriesComponent.push({
                id: category,
                text: this.$i18n.translate(`categories:${category}`)
            });
        });

        this.pagesStandards.push(
            {
                id: ROUTER_STANDARDS_UI,
                text: this.$i18n.translate(`website:standards-ui`),
                pages: [
                    {
                        id: ROUTER_STANDARDS_UI_COLORS,
                        text: this.$i18n.translate('website:standards-colors-and-themes')
                    },
                    {
                        id: ROUTER_STANDARDS_UI_ICONOGRAPHY,
                        text: this.$i18n.translate('website:standards-iconography')
                    },
                    {
                        id: ROUTER_STANDARDS_UI_TYPOGRAPHY,
                        text: this.$i18n.translate('website:standards-typography-and-styles')
                    },
                    {
                        id: ROUTER_STANDARDS_UI_BREAKPOINTS,
                        text: this.$i18n.translate('website:standards-breakpoints')
                    }
                ]
            },
            {
                id: ROUTER_STANDARDS_EDITORIAL,
                text: this.$i18n.translate(`website:standards-editorial`),
                pages: [
                    {
                        id: ROUTER_STANDARDS_EDITORIAL_TONE,
                        text: this.$i18n.translate('website:standards-editorial-tone')
                    },
                    {
                        id: ROUTER_STANDARDS_EDITORIAL_FORMAT,
                        text: this.$i18n.translate('website:standards-editorial-format')
                    },
                    {
                        id: ROUTER_STANDARDS_EDITORIAL_GLOSSARY,
                        text: this.$i18n.translate('website:standards-editorial-glossary')
                    },
                    {
                        id: ROUTER_STANDARDS_EDITORIAL_MESSAGE_BANK,
                        text: this.$i18n.translate('website:standards-editorial-message-bank')
                    },
                    {
                        id: ROUTER_STANDARDS_EDITORIAL_MESSAGE_PUNCTUATION,
                        text: this.$i18n.translate('website:standards-editorial-punctuation')
                    }
                ]
            }
            ,
            {
                id: ROUTER_STANDARDS_DEVELOPMENT,
                text: this.$i18n.translate(`website:standards-development`),
                pages: [
                    {
                        id: ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS,
                        text: this.$i18n.translate('website:standards-development-css-sass')
                    },
                    {
                        id: ROUTER_STANDARDS_DEVELOPMENT_TYPESCRIPT,
                        text: this.$i18n.translate('website:standards-development-typescript')
                    }
                ]
            }
            ,
            {
                id: ROUTER_STANDARDS_ACCESSIBILITY,
                text: this.$i18n.translate(`website:accessibility-standards`),
                pages: [
                    {
                        id: ROUTER_STANDARDS_ACCESSIBILITY_WHY,
                        text: this.$i18n.translate('website:accessibility-standards-why')
                    },
                    {
                        id: ROUTER_STANDARDS_ACCESSIBILITY_CHEATSHEET,
                        text: this.$i18n.translate('website:accessibility-standards-cheatsheet')
                    },
                    {
                        id: ROUTER_STANDARDS_ACCESSIBILITY_IMPLEMENTATION,
                        text: this.$i18n.translate('website:accessibility-standards-implementation')
                    }
                ]
            }
        );

    }

    getCategoryComponents(category): ComponentMeta[] {
        return this.$meta.componentState[category];
    }

    getRouterIndex(tag: string): string {
        return this.$routerIndex.for(tag);
    }

    get isOpen(): boolean {
        return this.open;
    }

    getCategoryRoute(categories: string): string {
        return this.$routerIndex.for(`router:${categories}`);
    }

    get routerPhilosophy(): string {
        return this.$routerIndex.for(ROUTER_PHILOSOPHY);
    }

    set isOpen(value: boolean) {
        this.$emit('update:open', value);
    }

    showMenuLevelTwo(menuSection: string): void {
        this.menuSection = menuSection;
        this.menuLevelOne = false;
    }

    showMenuLevelOne(): void {
        this.menuLevelOne = true;
    }

    @Watch('$route')
    close(value: boolean) {
        this.isOpen = false;
        this.menuLevelOne = true;
    }
}

export const MWMEGAMENU_NAME: string = 'mw-mega-menu';

const MWMegaMenuPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(IconButtonPlugin);
        v.component(MWMEGAMENU_NAME, MWMegaMenu);
    }
};

export default MWMegaMenuPlugin;
