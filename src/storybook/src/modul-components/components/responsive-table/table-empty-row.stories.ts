import { RESPONSIVE_TABLE_NAME, TABLE_EMPTY_ROW_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_EMPTY_ROW_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        emptyArea: {
            text: 'texte',
            iconName: 'm-svg__clock'
        }
    }),
    template: `<${TABLE_EMPTY_ROW_NAME}
        :empty-area="emptyArea"
        :table-component-width="'400px'"
        :current-scroll-left="10"
        :nb-columns="3"
    />`
});

defaultStory.story = {
    name: 'default'
};
