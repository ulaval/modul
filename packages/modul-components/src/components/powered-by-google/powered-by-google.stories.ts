import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { POWERED_BY_GOOGLE } from '../component-names';
import PoweredByGooglePlugin from './powered-by-google';

Vue.use(PoweredByGooglePlugin);

storiesOf(`${componentsHierarchyRootSeparator}${POWERED_BY_GOOGLE}`, module)
    .add('default', () => ({
        template: '<m-powered-by-google></m-powered-by-google>'
    }));
