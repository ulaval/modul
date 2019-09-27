import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';
import { ERROR_SESSION_EXPIRED_NAME } from '../../component-names';
import ErrorSessionExpiredPlugin from './error-session-expired';

Vue.use(ErrorSessionExpiredPlugin);

storiesOf(`${componentsHierarchyRootSeparator}/error-pages/${ERROR_SESSION_EXPIRED_NAME}`, module)
    .add('default', () => ({
        template: `<div style="border: solid 1px black; padding: 10px; width: 600px;">
                        <m-error-session-expired></m-error-session-expired>
                   </div>`
    }));
