import { CALENDAR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${CALENDAR_NAME}`
};

export const sandbox: any = () => '<m-calendar-sandbox></m-calendar-sandbox>';

sandbox.story = {
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};
