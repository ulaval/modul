import { Messages } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import { VueRouter } from 'vue-router/types/router';
import { MIconGallery } from './components/icon-gallery/icon-gallery';
import { ComponentMeta } from './content/components.meta.loader';
import { ModulMeta } from './modul-meta';
import { MWComponentsPage } from './pages/components/components';
import { MWHomePage } from './pages/home/home';
import { MWPhilosophyPage } from './pages/philosophy/philosophy';
import { MWStandardsPage } from './pages/standards/standards';
import { MWStandardsUiIconographyPage } from './pages/standards/visual-standards/visual-standards-iconography/standards-ui-iconography';
import { MWComponentCode } from './pages/templates/component-code/component-code';
import { MWComponentOverview } from './pages/templates/component-overview/component-overview';
import { MWMarkdownPage } from './pages/templates/markdown-page/markdown-page';

declare module 'vue/types/vue' {
    interface Vue {
        $routerIndex: RouteIndex;
    }
}

Vue.use(Router);
export interface RoutePath {
    path: string;
    hasParent: boolean;
    staticParent: string | undefined;
}

export type RoutePathMap = {
    [key: string]: RoutePath;
};

export type ParentCallbackFn = (key: string) => string | undefined;

export class RouteIndex {
    constructor(private index: RoutePathMap) {
    }

    public for(key: string, parentKeyCallback?: ParentCallbackFn): string {
        let result: string = '';
        let k: string = key;

        while (k) {
            let path: RoutePath = this.index[k];
            k = undefined;
            if (path) {
                result = path.path + '/' + result;

                if (path.hasParent) {
                    if (!parentKeyCallback && !path.staticParent) {
                        throw new Error(`Parent callback must be provided for key ${key}`);
                    } else {
                        k = parentKeyCallback ? parentKeyCallback(k) : path.staticParent;
                    }
                }
            }
        }
        return result;
    }
}

export interface ModulRouter {
    index: RouteIndex;
    router: VueRouter;
}

// must match router.<lang>.json
export const ROUTER_COMPONENTS: string = 'router:components';
export const ROUTER_COMPONENTS_UI: string = 'router:components-ui';
export const ROUTER_COMPONENTS_UTILS: string = 'router:components-utils';
export const ROUTER_OVERVIEW: string = 'router:overview';
export const ROUTER_CODE: string = 'router:code';
export const ROUTER_PHILOSOPHY: string = 'router:philosophy';
export const ROUTER_STANDARDS: string = 'router:standards';

export const ROUTER_STANDARDS_UI: string = 'router:standards-ui';
export const ROUTER_STANDARDS_UI_COLORS: string = 'router:standards-ui-colors';
export const ROUTER_STANDARDS_UI_ICONOGRAPHY: string = 'router:standards-ui-iconography';
export const ROUTER_STANDARDS_UI_TYPOGRAPHY: string = 'router:standards-ui-typography';
export const ROUTER_STANDARDS_UI_BREAKPOINTS: string = 'router:standards-ui-breakpoints';
export const ROUTER_STANDARDS_UI_ICONOGRAPHY_DOCUMENTATION: string = 'router:standards-ui-iconography-documentation';
export const ROUTER_STANDARDS_UI_ICONOGRAPHY_ICONS: string = 'router:standards-ui-iconography-icons';

export const ROUTER_STANDARDS_EDITORIAL: string = 'router:standards-editorial';
export const ROUTER_STANDARDS_EDITORIAL_TONE: string = 'router:standards-editorial-tone';
export const ROUTER_STANDARDS_EDITORIAL_FORMAT: string = 'router:standards-editorial-format';
export const ROUTER_STANDARDS_EDITORIAL_GLOSSARY: string = 'router:standards-editorial-glossary';
export const ROUTER_STANDARDS_EDITORIAL_MESSAGE_BANK: string = 'router:standards-editorial-message-bank';
export const ROUTER_STANDARDS_EDITORIAL_MESSAGE_PUNCTUATION: string = 'router:standards-editorial-punctuation';

export const ROUTER_STANDARDS_DEVELOPMENT: string = 'router:development-standards';
export const ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS: string = 'router:development-standards-css-sass';
export const ROUTER_STANDARDS_DEVELOPMENT_TYPESCRIPT: string = 'router:development-standards-typescript';

export const ROUTER_STANDARDS_ACCESSIBILITY: string = 'router:accessibility-standards';
export const ROUTER_STANDARDS_ACCESSIBILITY_CHEATSHEET: string = 'router:accessibility-standards-cheatsheet';
export const ROUTER_STANDARDS_ACCESSIBILITY_IMPLEMENTATION: string = 'router:accessibility-standards-implementation';
export const ROUTER_STANDARDS_ACCESSIBILITY_WHY: string = 'router:accessibility-standards-why';

type RouterFactoryFn = (meta: ModulMeta) => ModulRouter;
type PushRouteFn = (key: string, routesConfig: RouteConfig[], config: RouteConfig, staticParent?: string) => RouteConfig;

const routerFactory: RouterFactoryFn = (meta: ModulMeta) => {

    const modulRoutes: RouteConfig[] = [];

    let i18n: Messages = Vue.prototype.$i18n;
    let componentsRoute: string = i18n.translate(ROUTER_COMPONENTS);
    let componentsUiRoute: string = i18n.translate(ROUTER_COMPONENTS_UI);
    let overviewRoute: string = i18n.translate(ROUTER_OVERVIEW);
    let CodeRoute: string = i18n.translate(ROUTER_CODE);

    let routeIndex: RoutePathMap = {};

    let pushRoute: PushRouteFn = (key, routesConfig, config, staticParent) => {
        if (routesConfig) {
            routesConfig.push(config);
        }
        let routePath: RoutePath = {
            path: config.path,
            hasParent: config.path.length === 0 || config.path[0] !== '/',
            staticParent: staticParent
        };
        if (routePath.staticParent && !routePath.hasParent) {
            throw new Error('Static parent should not be provided if route path is not a child path');
        }
        routeIndex[key] = routePath;
        return config;
    };

    pushRoute('/', modulRoutes, {
        path: '/',
        component: MWHomePage
    });

    pushRoute(ROUTER_PHILOSOPHY, modulRoutes, {
        path: '/' + i18n.translate(ROUTER_PHILOSOPHY),
        component: MWPhilosophyPage
    });

    Object.keys(meta.componentState).forEach(category => {
        let categoryRoute: string = i18n.translate(`categories:${category}-route`);
        meta.componentState[category].forEach((components: ComponentMeta) => {
            let config: RouteConfig = pushRoute(components.url, modulRoutes, {
                path: `/${componentsRoute}/${componentsUiRoute}/${categoryRoute}/${components.url}`,
                meta: {
                    title: components.name
                },
                props: {
                    component: components
                },
                component: MWComponentsPage
            });
            config.children = [];
            pushRoute(ROUTER_OVERVIEW + components.url, config.children, {
                name: ROUTER_OVERVIEW + components.url,
                path: overviewRoute,
                meta: {
                    title: `${components.name} - ${i18n.translate('website:overview')}`
                },
                props: {
                    component: components
                },
                component: MWComponentOverview
            });
            pushRoute(ROUTER_CODE + components.url, config.children, {
                name: ROUTER_CODE + components.url,
                path: CodeRoute,
                meta: {
                    title: `${components.name} - ${i18n.translate('website:code')}`
                },
                props: {
                    component: components
                },
                component: MWComponentCode
            });
            config.children.push({
                path: '',
                redirect: overviewRoute
            });
        });
    });

    pushRoute(ROUTER_STANDARDS, modulRoutes, {
        path: '/' + i18n.translate(ROUTER_STANDARDS),
        component: MWStandardsPage,
        children: [
            {
                path: '',
                redirect: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_COLORS)}`
            },
            {
                name: ROUTER_STANDARDS_UI,
                path: `${i18n.translate(ROUTER_STANDARDS_UI)}`,
                redirect: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_COLORS)}`
            },
            {
                name: ROUTER_STANDARDS_UI_COLORS,
                path: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_COLORS)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-colors-and-themes'),
                    markupFileName: 'standards/visual-standards/visual-standards.colors.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_UI_ICONOGRAPHY,
                path: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY)}`,
                redirect: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY)}/${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY_DOCUMENTATION)}`,
                component: MWStandardsUiIconographyPage,
                meta: {
                    title: i18n.translate('website:standards-iconography')
                },
                props: {
                    markupFileName: 'standards/visual-standards/visual-standards.iconography.fr.md'
                },
                children: [
                    {
                        path: '',
                        redirect: `${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY_DOCUMENTATION)}`
                    },
                    {
                        name: ROUTER_STANDARDS_UI_ICONOGRAPHY_DOCUMENTATION,
                        path: `${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY_DOCUMENTATION)}`,
                        component: MWMarkdownPage,
                        meta: {
                            title: i18n.translate('website:standards-iconography'),
                            markupFileName: 'standards/visual-standards/visual-standars-iconography/visual-standars-iconography-documentations.fr.md'
                        }
                    }, {
                        name: ROUTER_STANDARDS_UI_ICONOGRAPHY_ICONS,
                        path: `${i18n.translate(ROUTER_STANDARDS_UI_ICONOGRAPHY_ICONS)}`,
                        component: MIconGallery,
                        meta: {
                            title: i18n.translate('website:standards-iconography')
                        }
                    }]
            },
            {
                name: ROUTER_STANDARDS_UI_TYPOGRAPHY,
                path: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_TYPOGRAPHY)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-typography-and-styles'),
                    markupFileName: 'standards/visual-standards/visual-standards.typography-styles.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_UI_BREAKPOINTS,
                path: `${i18n.translate(ROUTER_STANDARDS_UI)}/${i18n.translate(ROUTER_STANDARDS_UI_BREAKPOINTS)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-breakpoints'),
                    markupFileName: 'standards/visual-standards/visual-standards.breakpoints.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}`,
                redirect: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_TONE)}`
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL_TONE,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_TONE)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-editorial-tone'),
                    markupFileName: 'standards/editorial-standards/editorial-standards.tone.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL_FORMAT,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_FORMAT)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-editorial-format'),
                    markupFileName: 'standards/editorial-standards/editorial-standards.formats.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL_GLOSSARY,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_GLOSSARY)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-editorial-glossary'),
                    markupFileName: 'standards/editorial-standards/editorial-standards.glossary.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL_MESSAGE_BANK,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_MESSAGE_BANK)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-editorial-message-bank'),
                    markupFileName: 'standards/editorial-standards/editorial-standards.message-bank.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_EDITORIAL_MESSAGE_PUNCTUATION,
                path: `${i18n.translate(ROUTER_STANDARDS_EDITORIAL)}/${i18n.translate(ROUTER_STANDARDS_EDITORIAL_MESSAGE_PUNCTUATION)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-editorial-punctuation'),
                    markupFileName: 'standards/editorial-standards/editorial-standards.punctuation.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_DEVELOPMENT,
                path: `${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT)}`,
                redirect: `${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT)}/${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS)}`
            },
            {
                name: ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS,
                path: `${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT)}/${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT_CSS_SASS)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-development-css-sass'),
                    markupFileName: 'standards/developement-standards/developement-standards.css-sass.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_DEVELOPMENT_TYPESCRIPT,
                path: `${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT)}/${i18n.translate(ROUTER_STANDARDS_DEVELOPMENT_TYPESCRIPT)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:standards-development-typescript'),
                    markupFileName: 'standards/developement-standards/developement-standards.typescript.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_ACCESSIBILITY,
                path: `${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY)}`,
                redirect: `${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY)}/${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY_WHY)}`
            },
            {
                name: ROUTER_STANDARDS_ACCESSIBILITY_WHY,
                path: `${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY)}/${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY_WHY)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:accessibility-standards-why'),
                    markupFileName: 'standards/accessibility-standards/accessibility-standards.why.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_ACCESSIBILITY_CHEATSHEET,
                path: `${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY)}/${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY_CHEATSHEET)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:accessibility-standards-cheatsheet'),
                    markupFileName: 'standards/accessibility-standards/accessibility-standards.cheatsheet.fr.md'
                }
            },
            {
                name: ROUTER_STANDARDS_ACCESSIBILITY_IMPLEMENTATION,
                path: `${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY)}/${i18n.translate(ROUTER_STANDARDS_ACCESSIBILITY_IMPLEMENTATION)}`,
                component: MWMarkdownPage,
                meta: {
                    title: i18n.translate('website:accessibility-standards-implementation'),
                    markupFileName: 'standards/accessibility-standards/accessibility-standards.implementation.fr.md'
                }
            }
        ]
    });

    let vueRouter: VueRouter = new Router({
        mode: 'history',
        routes: modulRoutes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition;
            }
            if (to.hash) {
                return { selector: to.hash };
            }
            return { x: 0, y: 0 };
        }
    });

    vueRouter.beforeEach((to, from, next) => {

        let title = '';

        if (to.meta && to.meta.title) {
            document.title = `${to.meta.title} - MODUL`;
        } else {
            document.title = i18n.translate('website:title');
        }

        next();
    });

    return {
        router: vueRouter,
        index: new RouteIndex(routeIndex)
    };
};

export default routerFactory;
