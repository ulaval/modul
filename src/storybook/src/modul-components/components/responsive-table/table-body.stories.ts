import { actions } from '@storybook/addon-actions';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_BODY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeaderStyle, MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_GROUP_1 } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_BODY_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS,
        rowsGroup: DEFAULT_TABLE_GROUP_1
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
            default: boolean('Slot row.<column.name>.<rowsGroup.name>', false)
        }
    },
    methods: actions(
        'emitOpenAccordion',
        'emitCloseAccordion'
    ),
    template: `<${TABLE_BODY_NAME}
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
            v-if="slotRowsGroupHeaderTitle"
            #rows-group-header-title="{ rowsGroup, title }"
        >
            {{ title }} (Slot rows-group-header-title)
        </template>
        <template
            v-if="slotRowsGroupHeaderTitleWithRowsGroup"
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
            :slot="'rows-group-header-cell.' + column.name + '.' + rowsGroup.name"
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
            :slot="'row.' + column.name + '.' + rowsGroup.name"
            slot-scope="{ rowsGroup, row, cell }">
            {{ cell.value }} (Slot row.{{column.name}}.{{rowsGroup.name}})
        </template>
    </${TABLE_BODY_NAME}>`
});

defaultStory.story = {
    name: 'default'
};
