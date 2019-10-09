import { storiesOf } from '@storybook/vue';
import { PAGE_NOT_FOUND_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${PAGE_NOT_FOUND_NAME}`, module)
    .add('default', () => ({
        template: '<m-page-not-found>ss</m-page-not-found>'
    }));
