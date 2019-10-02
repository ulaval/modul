import { storiesOf } from '@storybook/vue';
import { POWERED_BY_GOOGLE } from '@ulaval/modul-components/dist/components/component-names';
import PoweredByGooglePlugin from '@ulaval/modul-components/dist/components/powered-by-google/powered-by-google';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PoweredByGooglePlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${POWERED_BY_GOOGLE}`, module)
    .add('default', () => ({
        template: '<m-powered-by-google></m-powered-by-google>'
    }));
