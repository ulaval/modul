import { DIALOG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${DIALOG_NAME}/sandboxes`,
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};

export const dialogService: any = () => `<m-dialog-service-sandbox></m-dialog-service-sandbox>`;
