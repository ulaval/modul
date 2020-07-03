import { boolean, object, select } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME, TABLE_HEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableHeadSkin } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { MColumnSortDirection, MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { COLUMNS, ROWS, ROWS_GROUP } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_HEAD_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    props: {
        columns: {
            default: object<MColumnTable[]>('Prop columns', COLUMNS)
        }
    },
    template: `<${TABLE_HEAD_NAME}
        :columns="columns"
    />`
});

defaultStory.story = {
    name: 'default'
};


export const Sandbox = () => ({
    props: {
        firstColumnFixed: {
            default: boolean('Prop first-column-fixed', false)
        },
        skin: {
            default: select(
                'Prop skin',
                Enums.toValueArray(MTableHeadSkin),
                MTableHeadSkin.LightBackground
            )
        },
        slotTableHead: {
            default: boolean('Slot table-head', false)
        }
    },
    data: () => ({
        rows: ROWS_GROUP,
        columns: COLUMNS
    }),
    methods: {
        onSort(columnTable: MColumnTable): void {
            const _this: any = this;
            _this.columns.forEach((c: MColumnTable, index: number) => {
                _this.columns[index].sortDirection =
                    c.dataProp === columnTable.dataProp
                        ? columnTable.sortDirection
                        : MColumnSortDirection.None;
            });
        }
    },
    template: `<${TABLE_HEAD_NAME}
        :columns.sync="columns"
        :skin="skin"
        :first-column-fixed="firstColumnFixed"
        @sort="onSort($event)"
    >
        <template
            v-if="slotTableHead"
            v-for="(column, columnIndex) in columns"
            :slot="'table-head.' + column.dataProp"
            slot-scope="{ column }"
        >
            <template v-if="column && column.title">
                <m-checkbox
                    v-if="columnIndex == 0"
                    :key="columnIndex"
                >{{column.title}}
                </m-checkbox>
                <template v-else>
                    {{column.title}}
                </template>
                (Slot table-head.{{column.dataProp}})
            </template>
        </template>
    </${TABLE_HEAD_NAME}>`
});

export const PropSkin = () => ({
    data: () => ({
        skins: Enums.toValueArray(MTableHeadSkin),
        columns: COLUMNS,
        rows: ROWS
    }),
    template: `<div>
        <template v-for="(skin, index) in skins">
            <p
                :class="index === 0 ? 'm-u--no-margin': 'm-u--margin-top--l'"
            >
                Prop skin =  {{skin}}
            </p>
            <${TABLE_HEAD_NAME}
                :columns="columns"
                :skin="skin"
            />
        </template>
    </div>`
});
