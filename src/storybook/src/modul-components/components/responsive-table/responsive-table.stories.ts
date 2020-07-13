import { actions } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableColumn, MTableEmptyArea, MTableHeaderStyle, MTableHeadStyle, MTableRow, MTableRowsGroup, MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import './group-header-custom-class-name.css';
import { COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS, DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE, DEFAULT_TABLE_ROWS, DEFAULT_TABLE_ROW_1, DEFAULT_TABLE_ROW_2, DEFAULT_TABLE_ROW_3, DEFAULT_TABLE_ROW_GROUPS_2, getScopeSlotTemplate } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}`,
    parameters: { fileName: __filename }
};

export const Sandbox = () => ({
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
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.AlternateBackground
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
        slotHeadCell: {
            default: boolean('Slot head-cell', false)
        },
        slotHeadCellWithColumn: {
            default: boolean('Slot head-cell.<column.name>', false)
        },
        slotGroupHeaderTitle: {
            default: boolean('Slot group-header-title', false)
        },
        slotGroupHeaderTitleWithRowsGroup: {
            default: boolean('Slot group-header-title.<rowsGroup.name>', false)
        },
        slotGroupHeaderCell: {
            default: boolean('Slot group-header-cell', false)
        },
        slotGroupHeaderCellWithColumn: {
            default: boolean('Slot group-header-cell.<column.name>', false)
        },
        slotGroupHeaderCellWithRowsGroup: {
            default: boolean('Slot group-header-cell.<column.name>.<rowsGroup.name>', false)
        },
        slotRowCell: {
            default: boolean('Slot row-cell', false)
        },
        slotRowCellWithColumn: {
            default: boolean('Slot row-cell.<column.name>', false)
        },
        slotRowCellWithRowsGroup: {
            default: boolean(`Slot row-cell.<column.name>.<rowsGroup.name>`, false)
        },
        columns: {
            default: object<MTableColumn[]>('Prop head-rows', DEFAULT_TABLE_COLUMNS)
        },
        rowGroups: {
            default: object<MTableRowsGroup[]>('Prop row-groups', DEFAULT_TABLE_ROW_GROUPS_2)
        },
        defaultEmptyArea: {
            default: object<MTableEmptyArea>('Prop default-empty-area', {
                svgName: 'm-svg__file'
            })
        }
    },
    methods: actions(
        'emitScrollbarWidth',
        'emitSort',
        'emitOpenAccordion',
        'emitCloseAccordion'
    ),
    computed: {
        rows(): MTableRow[] | undefined {
            const _this: any = this;
            return (_this.rowsGroup as MTableRowsGroup).rows;
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="Sandbox"
        :columns="columns"
        :row-groups="rowGroups"
        :first-column-fixed="firstColumnFixed"
        :waiting="waiting"
        :table-min-width="'1000px'"
        :default-empty-area="defaultEmptyArea"
        :head-style="headStyle"
        :rows-style="rowsStyle"
        :group-header-style="groupHeaderStyle"
        :group-header-class-name="groupHeaderClassName"
        :row-highlighted-on-hover="rowHighlightedOnHover"
        @scrollbar-width="emitScrollbarWidth"
        @sort="emitSort"
        @open-accordion="emitOpenAccordion"
        @close-accordion="emitCloseAccordion"
    >
        <template
            v-if="slotHeadCell"
            v-for="(column, columnIndex) in columns"
            #head-cell="{ column }"
        >
            ${ getScopeSlotTemplate('{{ column.value }} (Slot head-cell)')}
        </template>

        <template
            v-if="slotHeadCellWithColumn"
            v-for="(column, columnIndex) in columns"
            :slot="'head-cell.' + column.name"
            slot-scope="{ column }"
        >
            ${ getScopeSlotTemplate('{{ column.value }} (Slot head-cell.{{column.name}})')}
        </template>

        <template
            v-if="slotGroupHeaderTitle"
            #group-header-title="{ rowsGroup, title, column }"
        >
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-title)')}
        </template>
        <template
            v-if="slotGroupHeaderTitleWithRowsGroup"
            v-for="rowsGroup in rowGroups"
            :slot="'group-header-title.' + rowsGroup.name"
            slot-scope="{ rowsGroup, title, column }"
        >
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-title.{{ rowsGroup.name }})')}
        </template>

        <template
            v-if="slotGroupHeaderCell"
            #group-header-cell="{ rowsGroup, header, cell }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell)')}
        </template>

        <template
            v-if="slotGroupHeaderCellWithColumn"
            v-for="(column, columnIndex) in columns"
            :slot="'group-header-cell.' + column.name"
            slot-scope="{ rowsGroup, header, cell }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.{{column.name}})')}
        </template>
        <template
            v-if="slotGroupHeaderCellWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'group-header-cell.' + column.name + '.' + rowGroups[1].name"
            slot-scope="{ rowsGroup, header, cell }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.{{column.name}}.{{rowsGroup.name}})')}
        </template>
        <template
            v-if="slotRowCell"
            #row-cell="{ rowsGroup, row, cell }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell)')}
        </template>
        <template
            v-if="slotRowCellWithColumn"
            v-for="(column, columnIndex) in columns"
            :slot="'row-cell.' + column.name"
            slot-scope="{ rowsGroup, row, cell }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.{{column.name}})')}
        </template>
        <template
            v-if="slotRowCellWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'row-cell.' + column.name + '.' + rowGroups[0].name"
            slot-scope="{ rowsGroup, row, cell }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.{{column.name}}.{{rowsGroup.name}})')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

export const Default = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rows: DEFAULT_TABLE_ROWS
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="Default"
        :columns="columns"
        :rows="rows"
    />`
});

export const Sortable = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS,
        rows: DEFAULT_TABLE_ROWS
    }),
    methods: actions(
        'emitSort'
    ),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="Sortable"
        :columns="columns"
        :rows="rows"
        @sort="emitSort"
    />`
});

export const Waiting = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rows: DEFAULT_TABLE_ROWS
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="Waiting"
        :columns="columns"
        :rows="rows"
        :waiting="true"
    />`
});

export const ComplexHeadRows = () => ({
    data: () => ({
        headRows: COMPLEX_TABLE_HEAD_ROWS,
        rows: COMPLEX_TABLE_ROWS
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="ComplexHeadRows"
        :head-rows="headRows"
        :rows="rows"
    />`
});

export const RowGroupsWithHeader = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            {
                name: 'group01',
                header: {
                    title: 'Group #1'
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            },
            {
                name: 'group02',
                header: {
                    title: 'Group #2'
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            },
            {
                name: 'group03',
                header: {
                    title: 'Group #3'
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            }
        ]
    }),
    props: {
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowGroupsWithHeader"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    />`
});

export const RowGroupsWithHeaderCell = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            {
                name: 'group01',
                header: {
                    title: 'Group #1',
                    cells: {
                        id: {
                            value: 'Identification'
                        }
                    }
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            },
            {
                name: 'group02',
                header: {
                    title: 'Group #2',
                    cells: {
                        id: {
                            value: 'Identification'
                        }
                    }
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            }
        ]
    }),
    props: {
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowGroupsWithHeaderCell"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    />`
});

export const RowGroupsWithAccordion = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            {
                name: 'group01',
                header: {
                    title: 'Group #1'
                },
                accordion: {
                    open: true
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            },
            {
                name: 'group02',
                header: {
                    title: 'Group #2'
                },
                accordion: {
                    open: false
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2
                ]
            }
        ]
    }),
    props: {
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowGroupsWithAccordion"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    />`
});

