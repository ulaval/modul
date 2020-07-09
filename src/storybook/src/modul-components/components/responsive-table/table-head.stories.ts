import { actions } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_HEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableColumn, MTableHeadRows, MTableHeadStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import Vue, { VueConstructor } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COMPLEX_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS, MAIN_ROW } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_HEAD_NAME}`,
    parameters: { fileName: __filename }
};

const getTemplate: (
    headRows: MTableHeadRows,
    columns: MTableColumn[],
    slotTableHead?: boolean,
    disabled?: boolean
) => VueConstructor = (
    headRows: MTableHeadRows,
    columns: MTableColumn[],
    slotTableHead: boolean = false,
    disabled: boolean = false
): VueConstructor => {
    return Vue.extend({
        props: {
            firstColumnFixed: {
                default: boolean('Prop first-column-fixed', false)
            },
            disabled: {
                default: boolean('Prop disabled', disabled)
            },
            headStyle: {
                default: select(
                    'Prop head-style',
                    Enums.toValueArray(MTableHeadStyle),
                    MTableHeadStyle.Light
                )
            },
            slotTableHead: {
                default: boolean('Slot table-head', slotTableHead)
            }
        },
        data: () => ({
            headRows: headRows,
            columns: columns
        }),
        methods: actions(
            'emitSort'
        ),
        template: `<${TABLE_HEAD_NAME}
            id="testTableHead"
            :head-rows.sync="headRows"
            :head-style="headStyle"
            :first-column-fixed="firstColumnFixed"
            :disabled="disabled"
            @sort="emitSort"
        >
            <template
                v-if="slotTableHead"
                v-for="(column, columnIndex) in columns"
                :slot="'table-head.' + column.id"
                slot-scope="{ column }"
            >
                <template v-if="column && column.value">
                    <m-checkbox
                        v-if="columnIndex == 0"
                        :key="columnIndex"
                    >{{column.value}}
                    </m-checkbox>
                    <template v-else>
                        {{column.value}}
                    </template>
                    (Slot table-head.{{column.id}})
                </template>
            </template>
        </${TABLE_HEAD_NAME}>`
    });
};

export const Sandbox = () => {
    return getTemplate(DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS[MAIN_ROW].columns);
};

export const ComplexeHeadRows = () => {
    return getTemplate(COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_HEAD_ROWS[MAIN_ROW].columns);
};

export const CustomHTML = () => {
    return getTemplate(DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS[MAIN_ROW].columns, true);
};

CustomHTML.story = {
    name: 'Custom HTML - Use scope slot'
};

export const PropDisabled = () => {
    return getTemplate(DEFAULT_TABLE_HEAD_ROWS, DEFAULT_TABLE_HEAD_ROWS[MAIN_ROW].columns, false, true);
};



