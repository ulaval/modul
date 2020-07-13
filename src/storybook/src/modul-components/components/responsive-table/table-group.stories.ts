import { actions } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeaderStyle, MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_ROWS_GROUP_1, getScopeSlotTemplate } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_GROUP_NAME}`,
    parameters: { fileName: __filename }
};

export const Sandbox = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS,
        rowsGroup: DEFAULT_TABLE_ROWS_GROUP_1
    }),
    props: {
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
        rowHighlightedOnHover: {
            default: boolean('Prop row-highlighted-on-hover', true)
        },
        currentScrollLeft: {
            default: number('Prop current-scroll-left', 0)
        },
        tableComponentWidth: {
            default: text('Prop table-component-width', '100%')
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
            default: boolean('Slot row-cell.<column.name>.<rowsGroup.name>', false)
        }
    },
    methods: actions(
        'emitOpenAccordion',
        'emitCloseAccordion'
    ),
    template: `<${TABLE_GROUP_NAME}
        :columns="columns"
        :rows-group="rowsGroup"
        :group-header-style="groupHeaderStyle"
        :group-header-class-name="groupHeaderClassName"
        :row-highlighted-on-hover="rowHighlightedOnHover"
        :current-scroll-left="currentScrollLeft"
        :table-component-width="tableComponentWidth"
        :rows-style="rowsStyle"
        @open-accordion="emitOpenAccordion"
        @close-accordion="emitCloseAccordion"
    >
        <template
            v-if="slotGroupHeaderTitle"
            #group-header-title="{ rowsGroup, title, column }"
        >
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-title)')}
        </template>
        <template
            v-if="slotGroupHeaderTitleWithRowsGroup"
            :slot="'group-header-title.' + rowsGroup.name"
            slot-scope="{ rowsGroup, title, column }"
        >
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-title.{{ rowsGroup.name }})')}
        </template>
        <template
            v-if="slotGroupHeaderCell"
            #group-header-cell="{ rowsGroup, header, cell, column }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell)')}
        </template>
        <template
            v-if="slotGroupHeaderCellWithColumn"
            v-for="(column, columnIndex) in columns"
            :slot="'group-header-cell.' + column.name"
            slot-scope="{ rowsGroup, header, cell, column }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.{{column.name}})')}
        </template>
        <template
            v-if="slotGroupHeaderCellWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'group-header-cell.' + column.name + '.' + rowsGroup.name"
            slot-scope="{ rowsGroup, header, cell, column }"
        >
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.{{column.name}}.{{rowsGroup.name}})')}
        </template>
        <template
            v-if="slotRowCell"
            #row-cell="{ rowsGroup, row, cell, column  }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell)')}
        </template>
        <template
            v-if="slotRowCellWithColumn"
            v-for="(column, columnIndex) in columns"
            :slot="'row-cell.' + column.name"
            slot-scope="{ rowsGroup, row, cell, column  }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.{{column.name}})')}
        </template>
        <template
            v-if="slotRowCellWithRowsGroup"
            v-for="(column, columnIndex) in columns"
            :slot="'row-cell.' + column.name + '.' + rowsGroup.name"
            slot-scope="{ rowsGroup, row, cell, column  }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.{{column.name}}.{{rowsGroup.name}})')}
        </template>
    </${TABLE_GROUP_NAME}>`
});
