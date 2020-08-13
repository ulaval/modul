import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableGroupHeaderStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_ROW_GROUPS_2 } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Prop group-header-style`,
    parameters: { fileName: __filename }
};

const getTemplate: (
    groupHeaderStyle: MTableGroupHeaderStyle
) => VueConstructor = (
    groupHeaderStyle: MTableGroupHeaderStyle
): VueConstructor => {
    return Vue.extend({
        data: () => ({
            groupHeaderStyle,
            headRows: DEFAULT_TABLE_HEAD_ROWS,
            rowGroups: DEFAULT_TABLE_ROW_GROUPS_2
        }),
        template: `<${RESPONSIVE_TABLE_NAME}
            :id="groupHeaderStyle"
            :head-rows="headRows"
            :group-header-style="groupHeaderStyle"
            :row-groups="rowGroups"
        />`
    });
};

export const Any = () => {
    return getTemplate(MTableGroupHeaderStyle.Any);
};

export const Dark = () => {
    return getTemplate(MTableGroupHeaderStyle.Dark);
};

export const Light = () => {
    return getTemplate(MTableGroupHeaderStyle.Light);
};
