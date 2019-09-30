import { array, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ERROR_CONFLICT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorConflictPlugin from '@ulaval/modul-components/dist/components/error-pages/error-conflict/error-conflict';
import { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(ErrorConflictPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}/m-error-pages/${ERROR_CONFLICT_NAME}`, module)


    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-conflict></m-error-conflict>
                   </div>`
    }))
    .add('title', () => ({
        props: {
            title: {
                default: text('Title', 'A Custom Title')
            }
        },
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-conflict :title="title"></m-error-conflict>
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
                        <m-error-conflict :links="links"></m-error-conflict>
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
                        <m-error-conflict :hints="hints"></m-error-conflict>
                   </div>`
    }));
