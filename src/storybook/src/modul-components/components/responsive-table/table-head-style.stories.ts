import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeadRows, MTableHeadStyle, MTableRow } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS, DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_ROWS } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Prop head-style`,
    parameters: { fileName: __filename }
};

const COMPLEX_HEAD_ROWS_TEXT: string = '(complex head-rows)';

const getTemplate: (
    headStyle: MTableHeadStyle,
    headRows?: MTableHeadRows,
    rows?: MTableRow[]
) => VueConstructor = (
    headStyle: MTableHeadStyle,
    headRows: MTableHeadRows = DEFAULT_TABLE_HEAD_ROWS,
    rows: MTableRow[] = DEFAULT_TABLE_ROWS
): VueConstructor => {
    return Vue.extend({
        data: () => ({
            headStyle,
            headRows,
            rows
        }),
        template: `<${RESPONSIVE_TABLE_NAME}
            :id="headStyle"
            :head-rows="headRows"
            :head-style="headStyle"
            :rows="rows"
        />`
    });
};

export const Any = () => {
    return getTemplate(MTableHeadStyle.Any);
};

export const Dark = () => {
    return getTemplate(MTableHeadStyle.Dark);
};

export const Light = () => {
    return getTemplate(MTableHeadStyle.Light);
};

export const Lightest = () => {
    return getTemplate(MTableHeadStyle.Lightest);
};

export const AnyComplex = () => {
    return getTemplate(MTableHeadStyle.Any, COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS);
};

AnyComplex.story = {
    name: `Any ${COMPLEX_HEAD_ROWS_TEXT}`
};

export const DarkComplex = () => {
    return getTemplate(MTableHeadStyle.Dark, COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS);
};

DarkComplex.story = {
    name: `Dark ${COMPLEX_HEAD_ROWS_TEXT}`
};

export const LightComplex = () => {
    return getTemplate(MTableHeadStyle.Light, COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS);
};

LightComplex.story = {
    name: `Light ${COMPLEX_HEAD_ROWS_TEXT}`
};

export const LightestComplex = () => {
    return getTemplate(MTableHeadStyle.Lightest, COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS);
};

LightestComplex.story = {
    name: `Lightest ${COMPLEX_HEAD_ROWS_TEXT}`
};
