import { actions } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_GROUP_HEADER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableColumn, MTableEmptyArea, MTableHeaderStyle, MTableRowsGroup } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { DEFAULT_TABLE_COLUMNS, DEFAULT_TABLE_GROUP_1 } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_GROUP_HEADER_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS,
        rowsGroup: DEFAULT_TABLE_GROUP_1
    }),
    template: `<table>
        <${TABLE_GROUP_HEADER_NAME}
            :columns="columns"
            :rowsGroup="rowsGroup"
        />
   </table>`
});

defaultStory.story = {
    name: 'default'
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
                Enums.toValueArray(MTableHeaderStyle),
                MTableHeaderStyle.Light
            )
        },

        hasDataRowsGroup: {
            default: boolean('has data rows group', true)
        },
        slotRowsGroupHeaderTitle: {
            default: boolean('Slot rows-group-header-title', false)
        },
        slotRowsGroupHeaderCell: {
            default: boolean('Slot rows-group-header-cell.<column.name>', false)
        },
        defaultEmptyArea: {
            default: object<MTableEmptyArea>('Prop default-empty-area', {
                headerText: 'Default empty area: headerText',
                text: 'Default empty area: text',
                svgName: 'm-svg__clock'
            })
        },
        columns: {
            default: object<MTableColumn[]>('Prop columns', DEFAULT_TABLE_COLUMNS)
        },
        rowsGroup: {
            default: object<MTableRowsGroup>('Prop rows-group', DEFAULT_TABLE_GROUP_1)
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
            :rows-group="rowsGroupIntern"
            :first-column-fixed="firstColumnFixed"
            :group-header-style="groupHeaderStyle"
            :group-header-class-name="groupHeaderClassName"
            :default-empty-area="defaultEmptyArea"
            :table-component-width="tableComponentWidth"
            @open-accordion="emitOpenAccordion"
            @close-accordion="emitCloseAccordion"
        >
            <template
                v-if="slotRowsGroupHeaderTitle"
                #rows-group-header-title="{ rowsGroup, title }">
                {{ title}} (Slot rows-group-header-title)
            </template>
            <template
                v-if="slotRowsGroupHeaderCell"
                v-for="(column, columnIndex) in columns"
                :slot="'rows-group-header-cell.' + column.name"
                slot-scope="{ rowsGroup, header, cell }"
            >
                {{ cell.value }} (Slot rows-group-header-cell.{{column.name}})
            </template>
        </${TABLE_GROUP_HEADER_NAME}>
    </table>`
});
