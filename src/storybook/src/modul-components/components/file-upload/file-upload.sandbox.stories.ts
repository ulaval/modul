import { FILE_UPLOAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FILE_UPLOAD_NAME}`
};

export const sandbox: any = () => '<m-file-upload-sandbox></m-file-upload-sandbox>';

sandbox.story = {
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
