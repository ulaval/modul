import { SORTABLE_NAME } from '@ulaval/modul-components/dist/directives/directive-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export const sandbox: any = () => '<m-sortable-sandbox></m-sortable-sandbox>';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SORTABLE_NAME + ' (drag & drop)'}`
};

sandbox.story = {
    name: 'default',
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
