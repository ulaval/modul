import { select, text } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_BODY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableGroupHeaderStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
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
                Enums.toValueArray(MTableGroupHeaderStyle),
                MTableGroupHeaderStyle.Light
            )
        },
    },
    template: `<${TABLE_BODY_NAME}
        :columns="columns"
        :rows-group="rowsGroup"
        :group-header-style="groupHeaderStyle"
        :group-header-class-name="groupHeaderClassName"
    />`
});

defaultStory.story = {
    name: 'default'
};


// export const Sandbox = () => ({
//     props: {
//         skin: {
//             default: select(
//                 'Prop skin',
//                 Enums.toValueArray(MTableBodySkin),
//                 MTableBodySkin.AlternateBackground
//             )
//         },
//         firstColumnFixed: {
//             default: boolean('Prop first-column-fixed', false)
//         },
//         rowHoverEffect: {
//             default: boolean('Prop row-hover-effect', true)
//         },

//         currentScrollLeft: {
//             default: number('Prop current-scroll-left', 0)
//         },
//         tableComponentWidth: {
//             default: text('Prop table-component-width', '100%')
//         },
//         slotBodyHeaderTitle: {
//             default: boolean('Slot body-header-title', false)
//         },
//         slotRows: {
//             default: boolean('Slot rows', false)
//         },
//         slotBodyHeader: {
//             default: boolean('Slot body-header', false)
//         },
//         columns: {
//             default: object<MColumnTable[]>('Prop columns', COLUMNS)
//         },
//         rowsGroup: {
//             default: object<MTableGroup>('Prop rows-group', ROWS_GROUP)
//         },
//         defaultEmptyArea: {
//             default: object<MTableEmptyArea>('Prop default-empty-area', {
//                 headerText: 'Default empty area: headerText',
//                 text: 'Default empty area: text',
//                 iconName: 'm-svg__clock'
//             })
//         },
//         hasDataRowsGroup: {
//             default: boolean('Has data row group', true)
//         }
//     },
//     computed: {
//         rowsGroupIntern(): MTableGroup[] {
//             const _this: any = this;
//             return _this.hasDataRowsGroup ? _this.rowsGroup : [];
//         }
//     },
//     template: `<${TABLE_BODY_NAME}
//         :columns="columns"
//         :rows-group="rowsGroupIntern"
//         :row-hover-effect="rowHoverEffect"
//         :current-scroll-left="currentScrollLeft"
//         :table-component-width="tableComponentWidth"
//         :first-column-fixed="firstColumnFixed"
//         :default-empty-area="defaultEmptyArea"
//         :skin="skin"
//     >
//         <template v-if="slotBodyHeaderTitle" #body-header-title="scope">
//             <template
//                 v-if="scope.rowsGroup &&
//                     scope.rowsGroup.header &&
//                     scope.rowsGroup.title"
//             >
//                 {{scope.rowsGroup.header.title}} (Slot body-header-title)
//             </template>
//         </template>
//         <template
//             v-if="slotBodyHeader"
//             v-for="(column, columnIndex) in columns"
//             :slot="'body-header.' + column.dataProp"
//             slot-scope="{ rowsGroup }"
//         >
//             <template
//                 v-if="rowsGroup &&
//                     rowsGroup.header &&
//                     rowsGroup.header.cells &&
//                     rowsGroup.header.cells[column.dataProp]"
//             >
//                 {{ rowsGroup.header.cells[column.dataProp].value }} (Slot body-header.{{column.dataProp}})
//             </template>
//         </template>

//         <template
//             v-if="slotRows"
//             v-for="(column, columnIndex) in columns"
//             :slot="'rows.' + column.dataProp"
//             slot-scope="{ row }">
//             <template
//                 v-if="row &&
//                     row.cells &&
//                     row.cells[column.dataProp]"
//             >
//                 {{ row.cells[column.dataProp].value }} (Slot rows.{{column.dataProp}})
//             </template>
//         </template>

//     </${TABLE_BODY_NAME}>`
// });
