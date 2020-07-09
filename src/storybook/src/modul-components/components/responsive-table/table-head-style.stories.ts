import { RESPONSIVE_TABLE_NAME, TABLE_HEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeadRows, MTableHeadStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COMPLEX_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_HEAD_NAME}/PropHeadStyle`,
    parameters: { fileName: __filename }
};

const getTemplate: (
    headRows: MTableHeadRows
) => VueConstructor = (
    headRows: MTableHeadRows
): VueConstructor => {
        return Vue.extend({
            data: () => ({
                headStyles: Enums.toValueArray(MTableHeadStyle),
                headRows: headRows
            }),
            template: `<div>
            <div v-for="(headStyle, index) in headStyles" :key="index">
                <p
                    :class="index === 0 ? 'm-u--no-margin': 'm-u--margin-top--l'"
                >
                    Prop head-style =  {{headStyle}}
                </p>
                <${TABLE_HEAD_NAME}
                    :id="'default-' + index"
                    :head-rows="headRows"
                    :head-style="headStyle"
                />
            </div>
        </div>`
        });
    };

export const AllHeadStyle: () => VueConstructor = (): VueConstructor => {
    return getTemplate(DEFAULT_TABLE_HEAD_ROWS);
};

export const AllHeadStyleWithMultipleRows: () => VueConstructor = (): VueConstructor => {
    return getTemplate(COMPLEX_TABLE_HEAD_ROWS);
};
