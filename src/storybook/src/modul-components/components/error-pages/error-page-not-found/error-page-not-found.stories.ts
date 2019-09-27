import { array, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ERROR_PAGE_NOT_FOUND_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorPageNotFoundPlugin from '@ulaval/modul-components/dist/components/error-pages/error-page-not-found/error-page-not-found';
import { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(ErrorPageNotFoundPlugin);



storiesOf(`${modulComponentsHierarchyRootSeparator}/error-pages/${ERROR_PAGE_NOT_FOUND_NAME}`, module)


    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-page-not-found></m-error-page-not-found>
                   </div>`
    }))
    .add('title', () => ({
        props: {
            title: {
                default: text('Title', 'A Custom Title')
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-page-not-found :title="title"></m-error-page-not-found>
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
                        <m-error-page-not-found :links="links"></m-error-page-not-found>
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
                        <m-error-page-not-found :hints="hints"></m-error-page-not-found>
                   </div>`
    }));
