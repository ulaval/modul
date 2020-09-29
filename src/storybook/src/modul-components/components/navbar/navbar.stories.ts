import { boolean, select, text } from '@storybook/addon-knobs';
import { MAutoHorizontalScrollGradientStyle } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { NAVBAR_ITEM_NAME, NAVBAR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MNavbarSkin } from '@ulaval/modul-components/dist/components/navbar/navbar';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
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
    props: {
        skin: {
            default: select(
                'Prop skin',
                Enums.toValueArray(MNavbarSkin),
                MNavbarSkin.NavMain
            )
        },
        multiline: {
            default: boolean(
                'Prop multiline',
                false
            )
        },
        maxWidth: {
            default: text(
                'Prop text',
                '1200px'
            )
        }
    },
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
        :multiline="multiline"
        :max-width="maxWidth"
    >
        <${NAVBAR_ITEM_NAME}
            value="home"
        >
            Home
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            value="about"
        >
            About
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            value="contact"
        >
            Contact
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            v-for="i in 4"
            :key="i"
            :value="i"
            :label="'Very very very very long text #' + i" />
    </${NAVBAR_NAME}>`
});

defaultStory.story = {
    name: 'default'
};

export const url = () => ({
    data: () => ({
        selected: '/story/components-m-navbar--url'
    }),
    template: `<${NAVBAR_NAME}
        :selected="selected"
    >
        <${NAVBAR_ITEM_NAME}
            value="/story/components-m-navbar--url"
            url="/story/components-m-navbar--url"
        >
            Home
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            value="about"
            url="/"
        >
            About
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            value="contact"
            url="/"
        >
            Contact
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

url.story = {
    decorators: [storyRouterDecorator()]
};

export const multiline = () => ({
    data: () => ({
        selectedItem: 1,
        multiline: true
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selectedItem"
        skin="${MNavbarSkin.NavMain}"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 5"
            :key="i"
            :value="i"
            :label="'Very very very very very very long text #' + i"
            :multiline="true" />
    </${NAVBAR_NAME}>`
});

export const noMultiline = () => ({
    data: () => ({
        selectedItem: 1,
        multiline: true
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selectedItem"
        skin="${MNavbarSkin.NavMain}"
        :multiline="false"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 5"
            :key="i"
            :value="i"
        >
            Very very very long text #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const ScrollToLastItem = () => ({
    data: () => ({
        selected: 20
    }),
    template: `<${NAVBAR_NAME} :selected.sync="selected">
        <${NAVBAR_ITEM_NAME}
            v-for="i in 20"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinNavMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavMain
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinNavSoft = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavSoft
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
        style="background: #09f;"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinNavSub = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.NavSub
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinPlain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.Plain
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});


export const SkinTabArrow = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabArrow
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinTabDarkMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabDarkMain
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinTabLightMain = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabLightMain
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinTabSoft = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabSoft
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const SkinTabUnderline = () => ({
    data: () => ({
        selected: 1,
        skin: MNavbarSkin.TabUnderline
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selected"
        :skin="skin"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 10"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const slotLeftContain = () => ({
    data: () => ({
        selectedItem: 1
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selectedItem"
        skin="nav-main"
    >
        <${NAVBAR_ITEM_NAME}
            :value="1"
            label="Clock"
        >
            <m-icon
                class="m-u--margin-right--s"
                slot="leftContain"
                name="m-svg__clock" />
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            :value="2"
            label="Logout"
        >
            <m-icon
                class="m-u--margin-right--s"
                slot="leftContain"
                name="m-svg__logout" />
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const slotRightContain = () => ({
    data: () => ({
        selectedItem: 1
    }),
    template: `<${NAVBAR_NAME}
        :selected.sync="selectedItem"
        skin="nav-main"
    >
        <${NAVBAR_ITEM_NAME}
            :value="1"
            label="Clock"
        >
            <m-icon
                class="m-u--margin-left--s"
                slot="rightContain"
                name="m-svg__clock" />
        </${NAVBAR_ITEM_NAME}>
        <${NAVBAR_ITEM_NAME}
            :value="2"
            label="Logout"
        >
            <m-icon
                class="m-u--margin-left--s"
                slot="rightContain"
                name="m-svg__logout" />
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});

export const propButtonGradientStyle = () => ({
    data: () => ({
        selectedItem: 8
    }),
    props: {
        buttonGradientStyle: {
            default: select(
                'button-gradient-style',
                Enums.toValueArray(MAutoHorizontalScrollGradientStyle),
                MAutoHorizontalScrollGradientStyle.InteractiveDarker
            )
        }
    },
    template: `<${NAVBAR_NAME}
        :selected.sync="selectedItem"
        :button-gradient-style="buttonGradientStyle"
        skin="${MNavbarSkin.NavMain}"
    >
        <${NAVBAR_ITEM_NAME}
            v-for="i in 20"
            :key="i"
            :value="i"
        >
            Item navbar #{{i}}
        </${NAVBAR_ITEM_NAME}>
    </${NAVBAR_NAME}>`
});
