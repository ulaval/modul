import { actions } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_GROUP_HEADER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableColumn, MTableEmptyArea, MTableGroupHeaderStyle, MTableRowsGroup } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_ROWS_GROUP_1, getScopeSlotTemplate } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_GROUP_HEADER_NAME}`,
    parameters: { fileName: __filename }
};

export const Sandbox = () => ({
    props: {
        firstColumnFixed: {
            default: boolean('Prop first-column-fixed', false)
        },
        tableComponentWidth: {
            default: text('Prop table-component-width', '100%')
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

        hasDataRowsGroup: {
            default: boolean('has data rows group', true)
        },
        slotGroupHeaderTitle: {
            default: boolean('Slot group-header-title', false)
        },
        slotGroupHeaderCell: {
            default: boolean('Slot group-header-cell', false)
        },
        slotGroupHeaderCellWithColumn: {
            default: boolean('Slot group-header-cell.<column.name>', false)
        },
        defaultEmptyArea: {
            default: object<MTableEmptyArea>('Prop default-empty-area', {
                title: 'Default empty area: text',
                svgName: ModulIconName.HelpCircle
            })
        },
        columns: {
            default: object<MTableColumn[]>('Prop columns', DEFAULT_TABLE_COLUMNS)
        },
        rowsGroup: {
            default: object<MTableRowsGroup>('Prop rows-group', DEFAULT_TABLE_ROWS_GROUP_1)
        }
    },
    computed: {
        rowsGroupIntern(): MTableRowsGroup[] {
            const _this: any = this;
            return _this.hasDataRowsGroup ? _this.rowsGroup : [];
        }
    },
    methods: actions(
        'emitOpenAccordion',
        'emitCloseAccordion'
    ),
    template: `<table style="width: 100%">
        <${TABLE_GROUP_HEADER_NAME}
            :columns="columns"
            :rows-group="rowsGroup"
            :first-column-fixed="firstColumnFixed"
            :group-header-style="groupHeaderStyle"
            :group-header-class-name="groupHeaderClassName"
            :default-empty-area="defaultEmptyArea"
            :table-component-width="tableComponentWidth"
            @open-accordion="emitOpenAccordion"
            @close-accordion="emitCloseAccordion"
        >
            <template
                v-if="slotGroupHeaderTitle"
                #group-header-title="{ rowsGroup, title, column }">
                ${ getScopeSlotTemplate('{{ title}} (Slot group-header-title)')}
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
        </${TABLE_GROUP_HEADER_NAME}>
    </table>`
});
