import { storiesOf } from '@storybook/vue';
import { WYSIWYG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${WYSIWYG_NAME}`, module)
    .add('default', () => ({
        template: `<m-wysiwyg></m-wysiwyg>`
    }));
