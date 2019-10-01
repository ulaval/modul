import { storiesOf } from '@storybook/vue';
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${NAVBAR_NAME}`, module)
    .addDecorator(storyRouterDecorator())
    .add('default', () => ({
        data: () => ({
            selected: 'home'
        }),
        template: `<m-navbar :selected.sync="selected">
                       <m-navbar-item value="home">Home</m-navbar-item>
                       <m-navbar-item value="about">About</m-navbar-item>
                       <m-navbar-item value="contact">Contact</m-navbar-item>
                   </m-navbar>
                   `
    }))
    .add('url', () => ({
        data: () => ({
            selected: '/story/components-m-navbar--url'
        }),
        template: `<m-navbar :selected="selected">
                       <m-navbar-item value="/story/components-m-navbar--url" url="/story/components-m-navbar--url">Home</m-navbar-item>
                       <m-navbar-item value="about" url="/">About</m-navbar-item>
                       <m-navbar-item value="contact" url="/">Contact</m-navbar-item>
                   </m-navbar>`
    }))
    .add('multiline', () => ({
        data: () => ({
            selected: 1,
            multiline: true
        }),
        methods: {
            toggleMultiline(): void {
                let _this: any = this as any;
                _this.multiline = !_this.multiline;
            }
        },
        template: `<div>
                        <m-navbar :selected.sync="selectedItem"
                                skin="nav-main"
                                :multiline="multiline">
                            <m-navbar-item v-for="i in 5" :value="i">Very very very long text #{{i}}</m-navbar-item>
                        </m-navbar>
                        <m-button @click="toggleMultiline">{{ multiline ? 'Remove' : 'Add' }} multiline</m-button>
                    </div>`
    }))
    .add('Scroll to last item', () => ({
        data: () => ({
            selected: 20
        }),
        template: `<m-navbar :selected.sync="selected">
                        <m-navbar-item v-for="i in 20" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${NAVBAR_NAME}/skin`, module)
    .addDecorator(storyRouterDecorator())
    .add(MNavbarSkin.NavMain, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.NavMain
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.NavSoft, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.NavSoft
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin"
                             style="background: #09f;">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.NavSub, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.NavSub
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.Plain, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.Plain
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.TabArrow, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.TabArrow
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.TabDark, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.TabDark
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.TabLight, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.TabLight
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.TabSoft, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.TabSoft
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }))
    .add(MNavbarSkin.TabUnderline, () => ({
        data: () => ({
            selected: 1,
            skin: MNavbarSkin.TabUnderline
        }),
        template: `<m-navbar :selected.sync="selected"
                             :skin="skin">
                        <m-navbar-item v-for="i in 10" :value="i">Item navbar #{{i}}</m-navbar-item>
                   </m-navbar>`
    }));
