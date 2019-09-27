import { storiesOf } from '@storybook/vue';
import { ERROR_SESSION_EXPIRED_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ErrorSessionExpiredPlugin from '@ulaval/modul-components/dist/components/error-pages/error-session-expired/error-session-expired';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(ErrorSessionExpiredPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}/error-pages/${ERROR_SESSION_EXPIRED_NAME}`, module)
    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-session-expired></m-error-session-expired>
                   </div>`
    }));
