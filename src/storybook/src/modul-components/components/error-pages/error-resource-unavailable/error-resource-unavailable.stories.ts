import { array, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ERROR_RESOURCE_UNAVAILABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorResourceUnavailablePlugin from '@ulaval/modul-components/dist/components/error-pages/error-resource-unavailable/error-resource-unavailable';
import { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(ErrorResourceUnavailablePlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}/m-error-pages/${ERROR_RESOURCE_UNAVAILABLE_NAME}`, module)
    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-resource-unavailable></m-error-resource-unavailable>
                   </div>`
    }))
    .add('title', () => ({
        props: {
            title: {
                default: text('Title', 'A Custom Title')
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-resource-unavailable :title="title"></m-error-resource-unavailable>
                   </div>`
    }))
    .add('links', () => ({
        props: {
            links: {
                default: [new Link('The first custom link', 'http://www.ulaval.ca', true), new Link(`The second custom
                link`, 'http://www.google.com', true)]
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-resource-unavailable :links="links"></m-error-resource-unavailable>
                   </div>`
    }))
    .add('hints', () => ({
        props: {
            hints: {
                default: array('Hints[Array]', ['My only custom hint', `My second (long) custom hint.Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Nulla egestas urna rhoncus ipsum congue lobortis. `])
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-resource-unavailable :hints="hints"></m-error-resource-unavailable>
                   </div>`
    }));
