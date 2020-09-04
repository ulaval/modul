import { actions } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { MAutoHorizontalScrollGradientStyle } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MLinkMode } from '@ulaval/modul-components/dist/components/link/link';
import { MTableColumn, MTableEmptyArea, MTableGroupHeaderStyle, MTableHeadStyle, MTableRow, MTableRowsGroup, MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { importAllSvg } from '../svg/svg-importation';
import './group-header-custom-class-name.css';
import { COMPLEX_TABLE_HEAD_ROWS, COMPLEX_TABLE_ROWS, DEFAULT_EMPTY_AREA, DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE, DEFAULT_TABLE_ROWS, DEFAULT_TABLE_ROWS_GROUP_3, DEFAULT_TABLE_ROWS_GROUP_EMPTY_1, DEFAULT_TABLE_ROW_1, DEFAULT_TABLE_ROW_2, DEFAULT_TABLE_ROW_3, DEFAULT_TABLE_ROW_GROUPS_2, getScopeSlotTemplate } from './responsive-table-data';

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
                MTableHeadStyle.Dark
            )
        },
        groupHeaderClassName: {
            default: text('Prop group-header-class-name', '')
        },
        groupHeaderStyle: {
            default: select(
                'Prop group-header-style',
                Enums.toValueArray(MTableGroupHeaderStyle),
                MTableGroupHeaderStyle.Light
            )
        },
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        },
        waiting: {
            default: boolean('Prop waiting', false)
        },
        firstColumnFixedActive: {
            default: boolean('Prop first-column-fixed-active', true)
        },
        tableMinWidth: {
            default: text('Prop table-min-width', '1200px')
        },
        rowHighlightedOnHover: {
            default: boolean('Prop row-highlighted-on-hover', true)
        },
        dragActive: {
            default: boolean('Prop drag-active', true)
        },
        previousButtonActive: {
            default: boolean('Prop previous-button-active', false)
        },
        nextButtonActive: {
            default: boolean('Prop next-button-active', false)
        },
        previousButtonText: {
            default: text('Prop previous-button-text', 'Previous')
        },
        nextButtonText: {
            default: text('Prop next-button-text', 'Next')
        },
        leftGradientActive: {
            default: boolean('Prop left-gradient-active', true)
        },
        rightGradientActive: {
            default: boolean('Prop right-gradient-active', true)
        },
        gradientStyle: {
            default: select(
                'Prop gradient-style',
                Enums.toValueArray(
                    MAutoHorizontalScrollGradientStyle
                ),
                MAutoHorizontalScrollGradientStyle.White
            )
        },
        displayHorizontalScrollbar: {
            default: boolean('Prop display-horizontal-scrollbar', true)
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
        'emitHorizontalScollbarWidth',
        'emitSort',
        'emitOpenAccordion',
        'emitCloseAccordion',
        'emitPreviousButtonClick',
        'emitNextButtonClick'
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
        :first-column-fixed-active="firstColumnFixedActive"
        :table-min-width="tableMinWidth"
        :waiting="waiting"
        :default-empty-area="defaultEmptyArea"
        :head-style="headStyle"
        :rows-style="rowsStyle"
        :group-header-style="groupHeaderStyle"
        :group-header-class-name="groupHeaderClassName"
        :row-highlighted-on-hover="rowHighlightedOnHover"
        :drag-active="dragActive"
        :left-gradient-active="leftGradientActive"
        :right-gradient-active="rightGradientActive"
        :previous-button-active="previousButtonActive"
        :next-button-active="nextButtonActive"
        :previous-button-text="previousButtonText"
        :next-button-text="nextButtonText"
        :gradient-style="gradientStyle"
        :display-horizontal-scrollbar="displayHorizontalScrollbar"
        @horizontal-scollbar-width="emitHorizontalScollbarWidth"
        @sort="emitSort"
        @open-accordion="emitOpenAccordion"
        @close-accordion="emitCloseAccordion"
        @previous-button-click="emitPreviousButtonClick"
        @next-button-click="emitNextButtonClick"
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

export const TableWithData = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rows: DEFAULT_TABLE_ROWS
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="TableWithData"
        :columns="columns"
        :rows="rows"
    />`
});

export const TableWithoutHead = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rows: DEFAULT_TABLE_ROWS
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="TableWithData"
        :display-table-head="false"
        :columns="columns"
        :rows="rows"
    />`
});

export const TableWithoutData = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        defaultEmptyArea: DEFAULT_EMPTY_AREA
    }),
    methods: actions('emitEmptyButtonClick'),
    beforeCreate() {
        importAllSvg();
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="TableWithoutData"
        :columns="columns"
        :default-empty-area="defaultEmptyArea"
        :rows="[]"
        @empty-button-click="emitEmptyButtonClick"
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

export const WaitingWithoutData = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        defaultEmptyArea: DEFAULT_EMPTY_AREA
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="WaitingWithoutData"
        :columns="columns"
        :default-empty-area="defaultEmptyArea"
        :rows="[]"
        :waiting="true"
    />`
});

export const ComplexHeadRows = () => ({
    data: () => ({
        headRows: COMPLEX_TABLE_HEAD_ROWS,
        rows: COMPLEX_TABLE_ROWS,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="ComplexHeadRows"
        :head-rows="headRows"
        :rows="rows"
        :rows-style="rowsStyle"
        :first-column-fixed-active="true"
        table-min-width="900px"
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

export const RowGroupsEmpty = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            DEFAULT_TABLE_ROWS_GROUP_EMPTY_1,
            DEFAULT_TABLE_ROWS_GROUP_3
        ]
    }),
    beforeCreate() {
        importAllSvg();
    },
    methods: actions('emitEmptyButtonClick'),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowGroupsEmpty"
        :columns="columns"
        :row-groups="rowGroups"
        table-min-width="820px"
        @empty-button-click="emitEmptyButtonClick"
    />`
});

export const RowGroupsWithHeaderCell = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [1, 2, 3].map((e: number) => (
        {
            name: `group${e}`,
            header: {
                title: `Group #${e}`,
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
        }))
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

export const RowGroupsSpacingTop = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [1, 2, 3, 4, 5, 6].map((e: number) => (
        {
            name: `group${e}`,
            header: {
                title: `Group #${e}`,
                cells: {
                    id: {
                        value: 'Identification'
                    }
                }
            },
            rows: [
                DEFAULT_TABLE_ROW_1,
                DEFAULT_TABLE_ROW_2
            ],
            spacingTop: `${5 * e}px`,
            spacingClassName: 'test-red-background'
        }))
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
        :first-column-fixed-active="true"
        table-min-width="1100px"
    />`
});

export const RowGroupsWithAccordion = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            {
                name: 'group01',
                header: {
                    title: 'Group #1',
                    cells: {
                        phoneNumber: {
                            value: 'Google link',
                            data: {
                                url: 'https://www.google.ca/'
                            }
                        }
                    }
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
    >
        <template #group-header-cell.phoneNumber="{ cell }">
            <m-link :url="cell.data.url" target="_blank" mode="${MLinkMode.Link}">{{ cell.value }}</m-link>
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

