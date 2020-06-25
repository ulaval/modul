import { FILE_SELECT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FILE_SELECT_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    template: '<m-file-select></m-file-select>'
});

defaultStory.story = {
    name: 'default'
};

