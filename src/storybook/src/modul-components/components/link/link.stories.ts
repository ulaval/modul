import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { LINK_NAME } from '@ulaval/modul-components/dist/components/component-names';
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${LINK_NAME}`, module)
    .add('default', () => ({
        template: '<m-link mode="link" url="#">A link</m-link>'
    }))
    .add('url', () => ({
        props: {
            url: {
                default: text('url', 'http://www.google.ca')
            }
        },
        template: '<m-link mode="link" :url="url">A link</m-link>'
    }))
    .add('disabled', () => ({
        template: '<m-link mode="link" url="#" :disabled="true">A link</m-link>'
    }))
    .add('unvisited', () => ({
        template: '<m-link mode="link" url="#" :unvisited="true">A link</m-link>'
    }))
    .add('underline', () => ({
        template: '<m-link mode="link" url="#" :underline="false">A link</m-link>'
    }))
    .add('target', () => ({
        props: {
            target: {
                default: select('target', {
                    'self': '_self',
                    'blank': '_blank',
                    'parent': '_parent',
                    'top': '_top'
                }, 'self')
            }
        },
        template: '<m-link :target="target" mode="link" url="#">A link</m-link>'
    }))
    .add('bullet-point', () => ({
        template: '<m-link mode="link" url="#" :bullet-point="true">A link</m-link>'
    }))
    .add('icon-size', () => ({
        props: {
            iconSize: {
                default: text('iconSize', '20px')
            }
        },
        template: '<m-link icon-name="m-svg__calendar" mode="link" url="#" :icon-size="iconSize">A link</m-link>'
    }))
    .add('icon-name', () => ({
        props: {
            iconName: {
                default: select('iconName', {
                    'profile': 'm-svg__profile',
                    'information': 'm-svg__information',
                    'confirmation': 'm-svg__confirmation',
                    'warning': 'm-svg__warning',
                    'error': 'm-svg__error',
                    'calendar': 'm-svg__calendar',
                    'hint': 'm-svg__hint',
                    'clock': 'm-svg__clock'
                }, 'profile')
            }
        },
        template: '<m-link :icon-name="iconName" mode="link" url="#" >A link</m-link>'
    }))
    .add('icon-position="right"', () => ({
        template: '<m-link mode="link" url="#" icon-name="m-svg__chevron--right" icon-position="right">A link</m-link>'
    }))
    .add('tabindex="1"', () => ({
        template: '<m-link mode="link" url="#" tabindex="1">A link</m-link>'
    }))
    .add('skin="default"', () => ({
        template: '<m-link mode="link" url="#">A link</m-link>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LINK_NAME}/skin="light"`, module)
    .add('default', () => ({
        template: `<div style="background: grey;">
                        <m-link mode="link" url="#" skin="light">A link</m-link>
                   </div>`
    }))
    .add('bullet-point', () => ({
        template: `<div style="background: grey;">
                        <m-link :bullet-point="true" mode="link" url="#" skin="light">A link</m-link>
                   </div>`
    }))
    .add('icon-position="right"', () => ({
        template: `<div style="background: grey;">
                        <m-link icon-name="m-svg__chevron--right" icon-position="right" mode="link" url="#" skin="light">A link</m-link>
                   </div>`
    }))
    .add('icon-name="m-svg__clock"', () => ({
        template: `<div style="background: grey;">
                        <m-link icon-name="m-svg__clock" mode="link" url="#" skin="light">A link</m-link>
                   </div>`
    }))
    .add('icon-size="20px"', () => ({
        template: `<div style="background: grey;">
                        <m-link icon-name="m-svg__clock" icon-size="20px" mode="link" url="#" skin="light">A link</m-link>
                   </div>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LINK_NAME}/skin="text"`, module)
    .add('default', () => ({
        template: '<m-link mode="link" url="#" skin="text">A link</m-link>'
    }))
    .add('bullet-point', () => ({
        template: '<m-link :bullet-point="true" mode="link" url="#" skin="text">A link</m-link>'
    }))
    .add('icon-name="m-svg__clock"', () => ({
        template: '<m-link :icon-name="m-svg__clock" mode="link" url="#" skin="text">A link</m-link>'
    }))
    .add('icon-position="right"', () => ({
        template: '<m-link icon-position="right" icon-name="m-svg__chevron--right" mode="link" url="#" skin="text">A link</m-link>'
    }))
    .add('icon-size="20px"', () => ({
        template: '<m-link icon-size="20px" icon-name="m-svg__clock" mode="link" url="#" skin="text">A link</m-link>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LINK_NAME}/mode`, module)
    .addDecorator(storyRouterDecorator())
    .add('default (router-link)', () => ({
        data: () => ({
            routerLink: { name: 'router-storybook', path: 'components/m-link' }
        }),
        template: `<m-link :url="routerLink">A link</m-link>`
    }))
    .add('mode="link', () => ({
        template: '<m-link mode="link" url="http://www.google.ca">A link</m-link>'
    }))
    .add('mode="button"', () => ({
        template: '<m-link mode="button" url="http://www.google.ca">A link</m-link>'
    }));
