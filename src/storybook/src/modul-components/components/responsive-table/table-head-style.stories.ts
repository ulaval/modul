import { RESPONSIVE_TABLE_NAME, TABLE_HEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeadRows, MTableHeadStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COMPLEX_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Prop head-style`,
    parameters: { fileName: __filename }
};

const COMPLEX_HEAD_ROWS_TEXT: string = 'Complex head-rows - ';

const getTemplate: (
    headStyle: MTableHeadStyle,
    headRows: MTableHeadRows
) => VueConstructor = (
    headStyle: MTableHeadStyle,
    headRows: MTableHeadRows
): VueConstructor => {
    return Vue.extend({
        data: () => ({
            headStyle,
            headRows
        }),
        template: `<${TABLE_HEAD_NAME}
            :id="headStyles"
            :head-rows="headRows"
            :head-style="headStyle"
        />`
    });
};

export const Any = () => {
    return getTemplate(MTableHeadStyle.Any, DEFAULT_TABLE_HEAD_ROWS);
};

export const Dark = () => {
    return getTemplate(MTableHeadStyle.Dark, DEFAULT_TABLE_HEAD_ROWS);
};

export const Light = () => {
    return getTemplate(MTableHeadStyle.Light, DEFAULT_TABLE_HEAD_ROWS);
};

export const Lightest = () => {
    return getTemplate(MTableHeadStyle.Lightest, DEFAULT_TABLE_HEAD_ROWS);
};

export const AnyComplex = () => {
    return getTemplate(MTableHeadStyle.Any, COMPLEX_TABLE_HEAD_ROWS);
};

AnyComplex.story = {
    name: `${COMPLEX_HEAD_ROWS_TEXT} ${MTableHeadStyle.Any}`
};

export const DarkComplex = () => {
    return getTemplate(MTableHeadStyle.Dark, COMPLEX_TABLE_HEAD_ROWS);
};

DarkComplex.story = {
    name: `${COMPLEX_HEAD_ROWS_TEXT} ${MTableHeadStyle.Dark}`
};

export const LightComplex = () => {
    return getTemplate(MTableHeadStyle.Light, COMPLEX_TABLE_HEAD_ROWS);
};

LightComplex.story = {
    name: `${COMPLEX_HEAD_ROWS_TEXT} ${MTableHeadStyle.Light}`
};

export const LightestComplex = () => {
    return getTemplate(MTableHeadStyle.Lightest, COMPLEX_TABLE_HEAD_ROWS);
};

LightestComplex.story = {
    name: `${COMPLEX_HEAD_ROWS_TEXT} ${MTableHeadStyle.Lightest}`
};
