import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_ROWS } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Prop rows-style`,
    parameters: { fileName: __filename }
};

const COMPLEX_HEAD_ROWS_TEXT: string = '(complex head-rows)';

const getTemplate: (
    rowsStyle: MTableRowsStyle
) => VueConstructor = (
    rowsStyle: MTableRowsStyle
): VueConstructor => {
    return Vue.extend({
        data: () => ({
            rowsStyle,
            headRows: DEFAULT_TABLE_HEAD_ROWS,
            rows: DEFAULT_TABLE_ROWS
        }),
        template: `<${RESPONSIVE_TABLE_NAME}
            :id="rowsStyle"
            :head-rows="headRows"
            :rows="rows"
            :rows-style="rowsStyle"
        />`
    });
};

export const AlternateBackground = () => {
    return getTemplate(MTableRowsStyle.AlternateBackground);
};

export const Borders = () => {
    return getTemplate(MTableRowsStyle.Borders);
};

export const CellBorders = () => {
    return getTemplate(MTableRowsStyle.CellBorders);
};
