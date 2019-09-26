import { RICH_TEXT_EDITOR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../../conf/storybook/utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RICH_TEXT_EDITOR_NAME}`
};

export const sandbox: any = () => '<m-rich-text-editor-sandbox></m-rich-text-editor-sandbox>';

sandbox.story = {
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
