import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeaderStyle, MTableHeadStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_GROUPS, DEFAULT_TABLE_HEAD_ROWS, ROWS_GROUP } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        headRows: DEFAULT_TABLE_HEAD_ROWS,
        columns: DEFAULT_TABLE_COLUMNS,
        rowGroups: DEFAULT_TABLE_GROUPS,
        rows: ROWS_GROUP.rows,
        emptyArea: {
            iconName: 'm-svg__clock'
        }
    }),
    props: {
        headStyle: {
            default: select(
                'Prop head-style',
                Enums.toValueArray(MTableHeadStyle),
                MTableHeadStyle.Light
            )
        },
        groupHeaderClassName: {
            default: text('Prop group-header-class-name', '')
        },
        groupHeaderStyle: {
            default: select(
                'Prop group-header-style',
                Enums.toValueArray(MTableHeaderStyle),
                MTableHeaderStyle.Light
            )
        },
        waiting: {
            default: boolean('Prop waiting', false)
        },
        firstColumnFixed: {
            default: boolean('Prop first-column-fixed', false)
        },
        rowHighlightedOnHover: {
            default: boolean('Prop row-highlighted-on-hover', true)
        },
        slotRowsGroupHeaderTitle: {
            default: boolean('Slot rows-group-header-title', false)
        },
        slotRowsGroupHeaderTitleWithRowsGroup: {
            default: boolean('Slot rows-group-header-title.<rowsGroup.name>', false)
        },
        slotRowsGroupHeaderCell: {
            default: boolean('Slot rows-group-header-cell.<column.name>', false)
        },
        slotRowsGroupHeaderCellWithRowsGroup: {
            default: boolean('Slot rows-group-header-cell.<column.name>.<rowsGroup.name>', false)
        },
        slotRow: {
            default: boolean('Slot row.<column.name>', false)
        },
        slotRowWithRowsGroup: {
            default: boolean(`Slot row.<column.name>.${DEFAULT_TABLE_GROUPS[0].name}`, false)
        }
    },
    methods: actions(
        'emitScrollbarWidth',
        'emitSort',
        'emitOpenAccordion',
        'emitCloseAccordion'
    ),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="tableSnadbox"
        :head-rows="headRows"
        :row-groups="rowGroups"
        :first-column-fixed="firstColumnFixed"
        :waiting="waiting"
        :table-min-width="'1000px'"
        :default-empty-area="emptyArea"
        :head-style="headStyle"
        :group-header-style="groupHeaderStyle"
        :group-header-class-name="groupHeaderClassName"
        :row-highlighted-on-hover="rowHighlightedOnHover"
        @scrollbar-width="emitScrollbarWidth"
        @sort="emitSort"
        @open-accordion="emitOpenAccordion"
        @close-accordion="emitCloseAccordion"
    >
        <template
            v-if="slotRowsGroupHeaderTitle"
            #rows-group-header-title="{ rowsGroup, title }"
        >
            {{ title }} (Slot rows-group-header-title)
        </template>
        <template
            v-if="slotRowsGroupHeaderTitleWithRowsGroup"
            v-for="rowsGroup in rowGroups"
            :slot="'rows-group-header-title.' + rowsGroup.name"
            slot-scope="{ rowsGroup, title }"
        >
            {{ title }} (Slot rows-group-header-title.{{ rowsGroup.name }})
        </template>
        <template
            v-if="slotRowsGroupHeaderCell"
            v-for="(column, columnIndex) in columns"
            :slot="'rows-group-header-cell.' + column.name"
            slot-scope="{ rowsGroup, header, cell }"
        >
            {{ cell.value }} (Slot rows-group-header-cell.{{column.name}})
        </template>
        <template
            v-if="slotRowsGroupHeaderCellWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'rows-group-header-cell.' + column.name + '.' + rowGroups[1].name"
            slot-scope="{ rowsGroup, header, cell }"
        >
            {{ cell.value }} (Slot rows-group-header-cell.{{column.name}}.{{rowsGroup.name}})
        </template>
        <template
            v-if="slotRow"
            v-for="(column, columnIndex) in columns"
            :slot="'row.' + column.name"
            slot-scope="{ rowsGroup, row, cell }">
            {{ cell.value }} (Slot row.{{column.name}})
        </template>
        <template
            v-if="slotRowWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'row.' + column.name + '.' + rowGroups[0].name"
            slot-scope="{ rowsGroup, row, cell }">
            {{ cell.value }} (Slot row.{{column.name}}.{{rowsGroup.name}})
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

// <template #table-head="scope">
//     <template v-if="scope.column && scope.column.title">
//         {{scope.column.value}} (Slot table-head)
//     </template>
// </template>
// <template #table-head.ni="scope">
//     <template v-if="scope.column && scope.column.title">
//         {{scope.column.title}} (Slot table-head.ni)
//     </template>
// </template>
// <template #body-header="scope">
//     <template v-if="scope.header && scope.header.title">
//         {{scope.header.title}} (test)
//     </template>
// </template>
// <template #body-header-title="scope">
//     (Slot body-header-title)
// </template>
// <template #body-header.nrc="scope">
//     <template v-if="scope.header && scope.header.cells && scope.header.cells['nrc']">
//         {{scope.header.cells['nrc'].value}} (Slot body-header.nrc)
//     </template>
// </template>
// <template #rows="scope">
//     <template v-if="scope.row && scope.row.cells && scope.row.cells['nom']">
//         {{scope.row.cells['nom'].value}} (Slot rows)
//     </template>
// </template>
// <template #rows.nom="scope">
//     <template v-if="scope.row && scope.row.cells && scope.row.cells['nom']">
//         {{scope.row.cells['nom'].value}} (Slot rows.nom)
//     </template>
// </template>

defaultStory.story = {
    name: 'default'
};
