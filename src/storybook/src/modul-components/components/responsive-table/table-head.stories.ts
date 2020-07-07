import { actions } from '@storybook/addon-actions';
import { boolean, object, select } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_HEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeadRows, MTableHeadStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COMPLEX_TABLE_HEAD_ROWS, DEFAULT_HEAD_ROWS, MAIN_ROW, ROWS_GROUP } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_HEAD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        firstColumnFixed: {
            default: boolean('Prop first-column-fixed', false)
        },
        headStyle: {
            default: select(
                'Prop head-style',
                Enums.toValueArray(MTableHeadStyle),
                MTableHeadStyle.Light
            )
        },
        slotTableHead: {
            default: boolean('Slot table-head', true)
        }
    },
    data: () => ({
        rows: ROWS_GROUP,
        headRows: DEFAULT_HEAD_ROWS,
        columns: DEFAULT_HEAD_ROWS[MAIN_ROW].columns
    }),
    methods: actions(
        'emitSort'
    ),
    template: `<${TABLE_HEAD_NAME}
        id="sandbox"
        :head-rows.sync="headRows"
        :head-style="headStyle"
        :first-column-fixed="firstColumnFixed"
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

defaultStory.story = {
    name: 'Sandbox'
};

export const ComplexeHeadRows = () => ({
    props: {
        headRows: {
            default: object<MTableHeadRows>('Prop head-rows', COMPLEX_TABLE_HEAD_ROWS)
        }
    },
    template: `<${TABLE_HEAD_NAME}
        id="complexeHeadRows"
        :head-rows="headRows"
    />`
});
