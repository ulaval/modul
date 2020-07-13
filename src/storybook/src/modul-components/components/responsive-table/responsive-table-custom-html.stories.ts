import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import './group-header-custom-class-name.css';
import { DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE, DEFAULT_TABLE_ROW_GROUPS_2, getScopeSlotTemplate } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Custom HTML - Scope slot`,
    parameters: { fileName: __filename }
};

export const RowCell = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowCell"
        :columns="columns"
        :row-groups="rowGroups"
    >
        <template #row-cell="{ rowsGroup, row, cell }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

RowCell.story = {
    name: 'row-cell'
};

export const RowCellWithColumn = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowCellWithColumn"
        :columns="columns"
        :row-groups="rowGroups"
    >
        <template #row-cell.id="{ rowsGroup, row, cell }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.id)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

RowCellWithColumn.story = {
    name: 'row-cell.<column.name>'
};


export const RowCellWithGroupName = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[0].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="RowCellWithGroupName"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template
            :slot="'row-cell.id.' + rowsGroupName"
            slot-scope="{ rowsGroup, row, cell, column }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot row-cell.id.{{ rowsGroupName }})')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

RowCellWithGroupName.story = {
    name: 'row-cell.<column.name>.<rowsGroup.name>'
};

export const GroupeHeaderTitle = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[1].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupeHeaderTitle"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template
            #group-header-title="{ rowsGroup, title, column }">
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-cell)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

GroupeHeaderTitle.story = {
    name: 'group-header-title'
};

export const GroupeHeaderTitleWithGroupName = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[0].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupeHeaderTitleWithGroupName"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template
            :slot="'group-header-title.' + rowsGroupName"
            slot-scope="{ rowsGroup, title, column }">
            ${ getScopeSlotTemplate('{{ title }} (Slot group-header-cell.{{ rowsGroupName }})')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

GroupeHeaderTitleWithGroupName.story = {
    name: 'group-header-title.<rows-group.name>'
};

export const GroupeHeaderCell = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupeHeaderCell"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template #group-header-cell="{ rowsGroup, row, cell, column }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

GroupeHeaderCell.story = {
    name: 'group-header-cell'
};

export const GroupeHeaderCellWithColumn = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupeHeaderCellWithColumn"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template #group-header-cell.id="{ rowsGroup, row, cell, column }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.id)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

GroupeHeaderCellWithColumn.story = {
    name: 'group-header-cell.<column.name>'
};

export const GroupeHeaderCellWithGroupName = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[1].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupeHeaderCellWithGroupName"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template
            :slot="'group-header-cell.id.' + rowsGroupName"
            slot-scope="{ rowsGroup, row, cell, column }">
            ${ getScopeSlotTemplate('{{ cell.value }} (Slot group-header-cell.id.{{ rowsGroupName }})')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

GroupeHeaderCellWithGroupName.story = {
    name: 'group-header-cell.<column.name>.<rows-group.name>'
};

export const headCell = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[0].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="headCell"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template #head-cell="{ column }">
            ${ getScopeSlotTemplate('{{ column.value }} (Slot head-cell)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

headCell.story = {
    name: 'head-cell'
};

export const headCellWithColumn = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: DEFAULT_TABLE_ROW_GROUPS_2,
        rowsGroupName: DEFAULT_TABLE_ROW_GROUPS_2[0].name,
        rowsStyle: MTableRowsStyle.Borders
    }),
    template: `<${RESPONSIVE_TABLE_NAME}
        id="headCellWithColumn"
        :columns="columns"
        :row-groups="rowGroups"
        :rows-style="rowsStyle"
    >
        <template #head-cell.id="{ column }">
            ${ getScopeSlotTemplate('{{ column.value }} (Slot head-cell.id)')}
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

headCellWithColumn.story = {
    name: 'head-cell.<column.name>'
};

