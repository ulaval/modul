import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { BreadcrumbItem } from '@ulaval/modul-components/dist/components/breadcrumbs/breadcrumbs';
import { BREADCRUMBS_NAME } from '@ulaval/modul-components/dist/components/component-names';
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

const itemWithDivider: BreadcrumbItem = {
    divider: '<',
    iconName: '',
    disabled: false,
    text: 'itemWithDivider',
    url: '#'
};

const itemDisabled: BreadcrumbItem = {
    divider: '',
    iconName: '',
    disabled: true,
    text: 'itemDisabled',
    url: '#'
};

const itemWithoutText: BreadcrumbItem = {
    divider: '',
    iconName: '',
    disabled: false,
    text: '',
    url: ''
};

const itemWithIcon: BreadcrumbItem = {
    divider: '',
    iconName: 'm-svg__add-circle-filled',
    disabled: false,
    text: 'itemWithIcon',
    url: '#'
};

const itemWithoutUrl: BreadcrumbItem = {
    divider: '',
    iconName: '',
    disabled: false,
    text: 'itemWithoutUrl',
    url: ''
};

const breadcrumbItems: BreadcrumbItem[] = [itemWithDivider, itemDisabled, itemWithoutText, itemWithIcon, itemWithoutUrl];

storiesOf(`${modulComponentsHierarchyRootSeparator}${BREADCRUMBS_NAME}`, module)
    .addDecorator(storyRouterDecorator())
    .add('Default', () => ({
        props: {
            divider: {
                default: text('Divider', '/')
            }
        },
        data: () => ({
            items: breadcrumbItems
        }),
        template: `<m-breadcrumbs :items="items" :divider="divider"/>`
    }))
    .add('Custom divider', () => ({
        props: {
            divider: {
                default: text('Divider', '$')
            }
        },
        data: () => ({
            items: breadcrumbItems
        }),
        template: `<m-breadcrumbs :items="items" :divider="divider"/>`
    }))
    .add('Disabled', () => ({
        props: {
            divider: {
                default: text('Divider', '/')
            }
        },
        data: () => ({
            items: breadcrumbItems
        }),
        template: `<m-breadcrumbs disabled="true" :items="items" :divider="divider"/>`
    }))
    .add('Divider Slot', () => ({
        props: {
            divider: {
                default: text('Divider', '/')
            }
        },
        data: () => ({
            items: breadcrumbItems
        }),
        template: `<m-breadcrumbs :items="items" :divider="divider">
                        <template #divider><m-icon name="m-svg__close-clear"></m-icon></template>
                    </m-breadcrumbs>`
    }))
    .add('Breadcrumb-item Slot', () => ({
        props: {
            divider: {
                default: text('Divider', '/')
            }
        },
        data: () => ({
            items: breadcrumbItems,
            itemWithIcon
        }),
        template: `<m-breadcrumbs :items="items" :divider="divider">
                        <template v-slot:item="{ item }"><m-button icon-name="m-svg__close-clear" skin="secondary">{{ item.text }}</m-button></template>
                    </m-breadcrumbs>`
    }));
