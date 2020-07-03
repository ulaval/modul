import { boolean, number, object, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_BODY_HEADER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableEmptyArea, MTableGroup } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COLUMNS, ROWS_GROUP } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_BODY_HEADER_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        columns: COLUMNS,
        rowsGroup: ROWS_GROUP
    }),
    template: `<table>
        <${TABLE_BODY_HEADER_NAME}
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
        currentScrollLeft: {
            default: number('Prop current-scroll-left', 0)
        },
        tableComponentWidth: {
            default: text('Prop table-component-width', '100%')
        },
        hasDataRowsGroup: {
            default: boolean('Has data row group', true)
        },
        slotBodyHeaderTitle: {
            default: boolean('Slot body-header-title', false)
        },
        slotBodyHeader: {
            default: boolean('Slot body-header', false)
        },
        columns: {
            default: object<MColumnTable[]>('Prop columns', COLUMNS)
        },
        rowsGroup: {
            default: object<MTableGroup>('Prop rows-group', ROWS_GROUP)
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
        <${TABLE_BODY_HEADER_NAME}
            :columns="columns"
            :rowsGroup="rowsGroupIntern"
            :current-scroll-left="currentScrollLeft"
            :table-component-width="tableComponentWidth"
            :first-column-fixed="firstColumnFixed"
            :default-empty-area="defaultEmptyArea"
        >
            <template v-if="slotBodyHeaderTitle && scope.rowsGroup && scope.rowsGroup.header && scope.rowsGroup.header.title" #body-header-title="scope">
                {{scope.rowsGroup.header.title}} (Slot body-header-title)
            </template>
            <template
                v-if="slotBodyHeader"
                v-for="(column, columnIndex) in columns"
                :slot="'body-header.' + column.dataProp"
                slot-scope="{ rowsGroup }"
            >
                <template v-if="rowsGroup.header && rowsGroup.header.cells && cells[column.dataProp]">
                    {{ rowsGroup.header.cells[column.dataProp].value }} (Slot body-header.{{column.dataProp}})
                </template>
            </template>
        </${TABLE_BODY_HEADER_NAME}>
    </table>`
});
