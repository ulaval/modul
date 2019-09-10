import { array, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';
import { ERROR_RESOURCE_UNAVAILABLE_NAME } from '../../component-names';
import { Link } from '../../message-page/message-page';
import ErrorResourceUnavailablePlugin from './error-resource-unavailable';

Vue.use(ErrorResourceUnavailablePlugin);

storiesOf(`${componentsHierarchyRootSeparator}${ERROR_RESOURCE_UNAVAILABLE_NAME}`, module)
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
                default: array('Links[Array]', [new Link('The first custom link', 'http://www.ulaval.ca', true), new Link(`The second custom
                link`, 'http://www.google.com', true)])
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
