import { array } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ERROR_ACCESS_DENIED_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorAccessDeniedPlugin from '@ulaval/modul-components/dist/components/error-pages/error-access-denied/error-access-denied';
import { Link } from '@ulaval/modul-components/dist/components/message-page/message-page';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(ErrorAccessDeniedPlugin);


storiesOf(`${modulComponentsHierarchyRootSeparator}/m-error-pages/${ERROR_ACCESS_DENIED_NAME}`, module)


    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-access-denied></m-error-access-denied>
                   </div>`
    }))
    .add('title', () => ({

        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-access-denied :title="title"></m-error-access-denied>
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
                        <m-error-access-denied :links="links"></m-error-access-denied>
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
                        <m-error-access-denied :hints="hints"></m-error-access-denied>
                   </div>`
    }));
