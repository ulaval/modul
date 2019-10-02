import { RICH_TEXT_EDITOR_NAME } from '@ulaval/modul-rich-text-editor/dist/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulRichTextHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulRichTextHierarchyRootSeparator}${RICH_TEXT_EDITOR_NAME}`
};

export const sandbox: any = () => '<m-rich-text-editor-sandbox></m-rich-text-editor-sandbox>';

sandbox.story = {
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
