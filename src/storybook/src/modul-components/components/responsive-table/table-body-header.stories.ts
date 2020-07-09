import { boolean, object, select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_GROUP_HEADER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableColumn, MTableEmptyArea, MTableGroup, MTableGroupHeaderStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
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
        groupHeaderStyle: {
            default: select(
                'Prop group-header-style',
                Enums.toValueArray(MTableGroupHeaderStyle),
                MTableGroupHeaderStyle.Light
            )
        },
        columns: {
            default: object<MTableColumn[]>('Prop columns', DEFAULT_TABLE_COLUMNS)
        },
        rowsGroup: {
            default: object<MTableGroup>('Prop rows-group', DEFAULT_TABLE_GROUP_1)
        },
        hasDataRowsGroup: {
            default: boolean('has data rows group', true)
        },
        slotBodyHeaderTitle: {
            default: boolean('Slot body-header-title', false)
        },
        slotBodyHeader: {
            default: boolean('Slot body-header', false)
        },
        defaultEmptyArea: {
            default: object<MTableEmptyArea>('Prop default-empty-area', {
                headerText: 'Default empty area: headerText',
                text: 'Default empty area: text',
                iconName: 'm-svg__clock'
            })
        }
    },
    computed: {
        rowsGroupIntern(): MTableGroup[] {
            const _this: any = this;
            return _this.hasDataRowsGroup ? _this.rowsGroup : [];
        }
    },
    template: `<table style="width: 100%">
        <${TABLE_GROUP_HEADER_NAME}
            :columns="columns"
            :rows-group="rowsGroupIntern"
            :first-column-fixed="firstColumnFixed"
            :group-header-style="groupHeaderStyle"
            :default-empty-area="defaultEmptyArea"
            :table-component-width="tableComponentWidth"
        >
            <template
                v-if="slotBodyHeaderTitle && rowsGroup && rowsGroup.header && rowsGroup.header.title"
                slot="body-header-title"
                slot-scope="{ rowsGroup }">
                {{ rowsGroup.header.title}} (Slot body-header-title)
            </template>
            <template
                v-if="slotBodyHeader"
                v-for="(column, columnIndex) in columns"
                :slot="'body-header.' + column.id"
                slot-scope="{ rowsGroup }"
            >
                {{ rowsGroup.header.cells[column.id].value}} (Slot body-header.{{column.id}})
            </template>
        </${TABLE_GROUP_HEADER_NAME}>
    </table>`
});
