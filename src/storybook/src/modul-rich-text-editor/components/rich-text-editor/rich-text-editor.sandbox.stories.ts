import { RICH_TEXT_EDITOR_NAME } from '@ulaval/modul-rich-text-editor/dist/components/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulRteHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulRteHierarchyRootSeparator}${RICH_TEXT_EDITOR_NAME}`
};

export const sandbox: any = () => '<m-rich-text-editor-sandbox></m-rich-text-editor-sandbox>';

sandbox.story = {
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
