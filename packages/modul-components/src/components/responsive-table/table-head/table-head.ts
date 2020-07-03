import { MIconButtonSkin } from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import { MColumnSortDirection, MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { TABLE_HEAD_NAME } from '../../component-names';
import { MIconButton } from '../../icon-button/icon-button';
import { getCellAlignmentClass, getCellWidthStyle, MTableHeadSkin } from '../responsive-table-commons';
import WithRender from './table-head.html?style=./table-head.scss';

interface MpoTableColumnInternal extends MColumnTable {
    isInitialSort?: boolean;
}

@WithRender
@Component({
    components: { MIconButton }
})
export class MTableHead extends ModulVue {
    @Prop({
        required: true
    })
    public readonly columns!: MColumnTable[];

    @Prop({
        default: MTableHeadSkin.LightBackground,
        validator: (value: MTableHeadSkin) =>
            Enums.toValueArray(MTableHeadSkin).includes(value)
    })
    public readonly skin!: MTableHeadSkin;

    @Prop({
        default: false
    })
    public firstColumnFixed!: boolean;

    @Prop({
        default: false
    })
    public waiting!: boolean;

    @Emit('sort')
    public emitSort(_column: MColumnTable): void { }

    public get columnsInternal(): MpoTableColumnInternal[] {
        return this.columns
            .filter((c: MColumnTable) => c.visible === undefined || c.visible)
            .map((c: MColumnTable) => ({ ...c }));
    }

    public get skinSortIcon(): MIconButtonSkin {
        return this.skin === MTableHeadSkin.DarkBackground
            ? MIconButtonSkin.Dark
            : MIconButtonSkin.Light;
    }

    public sort(column: MpoTableColumnInternal): void {
        if (this.waiting || !column.sortable) {
            return;
        }

        if (typeof column.sortDirection === 'undefined') {
            column.sortDirection = MColumnSortDirection.None;
        }

        this.columnsInternal.forEach((c: MpoTableColumnInternal) => {
            if (c !== column) {
                c.sortDirection = MColumnSortDirection.None;
            }
        });

        switch (column.sortDirection) {
            case MColumnSortDirection.None:
                this.sortColumnDirectionNone(column);
                break;
            case MColumnSortDirection.Asc:
                this.sortColumnDirectionAsc(column);
                break;
            case MColumnSortDirection.Dsc:
                this.sortColumnDirectionDsc(column);
                break;
        }

        this.emitSort(column);
    }

    public isColumnSorted(columnTable: MColumnTable): boolean {
        return (
            columnTable.sortDirection === MColumnSortDirection.Asc ||
            columnTable.sortDirection === MColumnSortDirection.Dsc
        );
    }

    public getColumnAlignmentClass(column: MColumnTable): string {
        return getCellAlignmentClass(column);
    }

    public getColumnSortIcon(columnTable: MColumnTable): string {
        if (columnTable.sortDirection) {
            return 'm-svg__arrow-thin--up'; // CSS rotate transform animation takes care of the arrow position
        } else {
            return columnTable.defaultSortDirection === MColumnSortDirection.Dsc
                ? 'm-svg__arrow-thin--down'
                : 'm-svg__arrow-thin--up';
        }
    }

    public getColumnSortDirectionClass(
        columnTable: MColumnTable
    ): string | undefined {
        switch (columnTable.sortDirection) {
            case MColumnSortDirection.Asc:
                return 'm--is-sort-asc';
            case MColumnSortDirection.Dsc:
                return 'm--is-sort-desc';
            default:
                if (columnTable.defaultSortDirection) {
                    return columnTable.defaultSortDirection ===
                        MColumnSortDirection.Asc
                        ? 'm--is-sort-asc'
                        : 'm--is-sort-desc';
                } else {
                    return undefined;
                }
        }
    }

    public getColumnWidthStyle(column: MColumnTable): string {
        return getCellWidthStyle(column);
    }

    private sortColumnDirectionNone(column: MpoTableColumnInternal): void {
        column.sortDirection = column.defaultSortDirection
            ? column.defaultSortDirection
            : MColumnSortDirection.Asc;
        column.isInitialSort = true;
    }

    private sortColumnDirectionAsc(column: MpoTableColumnInternal): void {
        if (column.enableUnsort) {
            column.sortDirection =
                column.defaultSortDirection === MColumnSortDirection.Dsc
                    ? MColumnSortDirection.None
                    : MColumnSortDirection.Dsc;
        } else {
            column.sortDirection = MColumnSortDirection.Dsc;
        }
        column.isInitialSort = false;
    }

    private sortColumnDirectionDsc(column: MpoTableColumnInternal): void {
        if (column.enableUnsort) {
            column.sortDirection =
                column.defaultSortDirection === MColumnSortDirection.Asc ||
                    column.defaultSortDirection === undefined
                    ? MColumnSortDirection.None
                    : MColumnSortDirection.Asc;
        } else {
            column.sortDirection = MColumnSortDirection.Asc;
        }
        column.isInitialSort = false;
    }
}


const TableHeadPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_HEAD_NAME, 'plugin.install');
        v.component(TABLE_HEAD_NAME, MTableHead);
    }
};

export default TableHeadPlugin;
