import { NAVBAR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MNavbarSkin } from '@ulaval/modul-components/dist/components/navbar/navbar';
import Vue from 'vue';
import VueRouter from 'vue-router';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const storyRouterDecorator: any = (links = {}, routerProps = {}): any => {
    return story => {
        const router: VueRouter = new VueRouter(routerProps);
        const WrappedComponent: any = story();
        return Vue.extend({
            router,
            components: { WrappedComponent },
            template: '<wrapped-component/>'
        });
    };
};

export default {
    title: `${modulComponentsHierarchyRootSeparator}${NAVBAR_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        selected: 'home'
    }),
    template: `<m-navbar :selected.sync="selected">
                    <m-navbar-item value="home">Home</m-navbar-item>
                    <m-navbar-item value="about">About</m-navbar-item>
                    <m-navbar-item value="contact">Contact</m-navbar-item>
                </m-navbar>`
});

defaultStory.story = {
    name: 'default'
};

export const url = () => ({
    data: () => ({
        selected: '/story/components-m-navbar--url'
    }),
    template: `<m-navbar :selected="selected">
                    <m-navbar-item value="/story/components-m-navbar--url" url="/story/components-m-navbar--url">Home</m-navbar-item>
                    <m-navbar-item value="about" url="/">About</m-navbar-item>
                    <m-navbar-item value="contact" url="/">Contact</m-navbar-item>
                </m-navbar>`
});

url.story = {
    decorators: [storyRouterDecorator()]
};

export const multiline = () => ({
    data: () => ({
        selectedItem: 1,
        multiline: true
    }),
    template: `<div>
                    <m-navbar :selected.sync="selectedItem"
                            skin="nav-main">
                        <m-navbar-item v-for="i in 5"
                                       :key="i"
                                       :value="i"
                                       :label="'Very very very very very very long text #' + i"
                                       :multiline="true">
                        </m-navbar-item>
                    </m-navbar>
                </div>`
});

export const noMultiline = () => ({
    data: () => ({
        selectedItem: 1,
        multiline: true
    }),
    template: `<div>
                    <m-navbar :selected.sync="selectedItem"
                            skin="nav-main"
                            :multiline="false">
                        <m-navbar-item v-for="i in 5" :key="i" :value="i">Very very very long text #{{i}}</m-navbar-item>
                    </m-navbar>
                </div>`
});

export const ScrollToLastItem = () => ({
    data: () => ({
        selected: 20
    }),
    template: `<m-navbar :selected.sync="selected">
                    <m-navbar-item v-for="i in 20" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinNavMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavMain
    }),
    template: `<m-navbar :selected.sync="selected"
                         :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinNavSoft = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavSoft
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin"
                            style="background: #09f;">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinNavSub = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavSub
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinPlain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.Plain
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});


export const SkinTabArrow = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabArrow
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinTabDarkMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabDarkMain
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinTabLightMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabLightMain
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinTabSoft = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabSoft
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const SkinTabUnderline = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabUnderline
    }),
    template: `<m-navbar :selected.sync="selected"
                            :skin="skin">
                    <m-navbar-item v-for="i in 10" :key="i" :value="i">Item navbar #{{i}}</m-navbar-item>
                </m-navbar>`
});

export const slotLeftContain = () => ({
    data: () => ({
        selectedItem: 1
    }),
    template: `<div>
                    <m-navbar :selected.sync="selectedItem"
                            skin="nav-main">
                        <m-navbar-item :value="1"
                                       label="Clock">
                            <m-icon class="m-u--margin-right--s"
                                    slot="leftContain"
                                    name="m-svg__clock"></m-icon>
                        </m-navbar-item>
                        <m-navbar-item :value="2"
                                       label="Logout">
                            <m-icon class="m-u--margin-right--s"
                                    slot="leftContain"
                                    name="m-svg__logout"></m-icon>
                        </m-navbar-item>
                    </m-navbar>
                </div>`
});

export const slotRightContain = () => ({
    data: () => ({
        selectedItem: 1
    }),
    template: `<div>
                    <m-navbar :selected.sync="selectedItem"
                            skin="nav-main">
                        <m-navbar-item :value="1"
                                       label="Clock">
                            <m-icon class="m-u--margin-left--s"
                                    slot="rightContain"
                                    name="m-svg__clock"></m-icon>
                        </m-navbar-item>
                        <m-navbar-item :value="2"
                                       label="Logout">
                            <m-icon class="m-u--margin-left--s"
                                    slot="rightContain"
                                    name="m-svg__logout"></m-icon>
                        </m-navbar-item>
                    </m-navbar>
                </div>`
});

