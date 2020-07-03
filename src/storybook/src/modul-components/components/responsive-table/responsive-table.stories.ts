import { actions } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableBodySkin, MTableHeadSkin } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COLUMNS, ROWS_GROUP, ROW_GROUPS } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        columns: COLUMNS,
        rowGroups: ROW_GROUPS,
        rows: ROWS_GROUP.rows,
        emptyArea: {
            iconName: 'm-svg__clock'
        }
    }),
    props: {
        headSkin: {
            default: select(
                'Prop head-skin',
                Enums.toValueArray(MTableHeadSkin),
                MTableHeadSkin.LightBackground
            )
        },
        bodySkin: {
            default: select(
                'Prop body-skin',
                Enums.toValueArray(MTableBodySkin),
                MTableBodySkin.AlternateBackground
            )
        },
        waiting: {
            default: boolean('Prop waiting', false)
        },
        firstColumnFixed: {
            default: boolean('Prop first-column-fixed', false)
        }
    },
    methods: actions('emitScrollbarWidth', 'emitSort'),
    template: `<${RESPONSIVE_TABLE_NAME}
        :columns="columns"
        :row-groups="rowGroups"
        :rows="rows"
        :first-column-fixed="firstColumnFixed"
        :waiting="waiting"
        :table-min-width="'1000px'"
        :default-empty-area="emptyArea"
        :head-skin="headSkin"
        :body-skin="bodySkin"
        @scrollbar-width="emitScrollbarWidth"
        @sort="emitSort"
    >
        <template #table-head="scope">
            <template v-if="scope.column && scope.column.title">
                {{scope.column.title}} (Slot table-head)
            </template>
        </template>
        <template #table-head.ni="scope">
            <template v-if="scope.column && scope.column.title">
                {{scope.column.title}} (Slot table-head.ni)
            </template>
        </template>
        <template #body-header="scope">
            <template v-if="scope.header && scope.header.title">
                {{scope.header.title}} (test)
            </template>
        </template>
        <template #body-header-title="scope">
            (Slot body-header-title)
        </template>
        <template #body-header.nrc="scope">
            <template v-if="scope.header && scope.header.cells && scope.header.cells['nrc']">
                {{scope.header.cells['nrc'].value}} (Slot body-header.nrc)
            </template>
        </template>
        <template #rows="scope">
            <template v-if="scope.row && scope.row.cells && scope.row.cells['nom']">
                {{scope.row.cells['nom'].value}} (Slot rows)
            </template>
        </template>
        <template #rows.nom="scope">
            <template v-if="scope.row && scope.row.cells && scope.row.cells['nom']">
                {{scope.row.cells['nom'].value}} (Slot rows.nom)
            </template>
        </template>
    </${RESPONSIVE_TABLE_NAME}>`
});

defaultStory.story = {
    name: 'default'
};
