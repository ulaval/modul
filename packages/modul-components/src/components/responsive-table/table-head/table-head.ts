import { MIconButtonSkin } from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { TABLE_HEAD_NAME } from '../../component-names';
import { MIconButton } from '../../icon-button/icon-button';
import { getCellAlignmentClass, getCellWidthStyle, getHeadRowsFilterAndSort, MTableColumn, MTableHeadRows, MTableHeadStyle, MTableSortDirection } from '../responsive-table-commons';
import WithRender from './table-head.html?style=./table-head.scss';

interface MTableColumnInternal extends MTableColumn {
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
    public readonly id!: string;

    @Prop()
    public readonly headRows!: MTableHeadRows;

    @Prop({
        default: MTableHeadStyle.Light,
        validator: (value: MTableHeadStyle) =>
            Enums.toValueArray(MTableHeadStyle).includes(value)
    })
    public readonly headStyle!: MTableHeadStyle;

    @Prop({
        default: false
    })
    public readonly firstColumnFixed!: boolean;

    @Prop({
        default: false
    })
    public readonly disabled!: boolean;

    @Emit('sort')
    public emitSort(column: MTableColumn): void { }

    @Emit('update:headRows')
    public emitUpdateHeadRows(headRows: MTableHeadRows): void { }

    public get headRowsFilterAndSort(): MTableHeadRows {
        return getHeadRowsFilterAndSort(this.headRows);
    }

    public get hasMultipleHeadRow(): boolean {
        return Object.keys(this.headRowsFilterAndSort).length > 1;
    }

    public getSkinSortIcon(headRowKey: string): MIconButtonSkin {
        const rowIndex: number = Object.keys(this.headRows).findIndex((key: string) => key === headRowKey);
        if (this.headStyle === MTableHeadStyle.Dark && rowIndex <= 1) {
            return MIconButtonSkin.Dark;
        }
        return MIconButtonSkin.Light;
    }

    public sort(currentColumn: MTableColumnInternal, columns: MTableColumnInternal[]): void {
        if (this.disabled || !currentColumn.sortable) {
            return;
        }

        const sortDirection: MTableSortDirection = this.getCurrentColumnSortDirection(currentColumn);

        columns.forEach((c: MTableColumnInternal) => {
            if (c !== currentColumn) {
                c.sortDirection = MTableSortDirection.None;
            }
        });

        switch (sortDirection) {
            case MTableSortDirection.Asc:
                currentColumn.sortDirection = this.getNextSortDirectionWhenDirectionAsc(currentColumn);
                currentColumn.isInitialSort = false;
                break;
            case MTableSortDirection.Dsc:
                currentColumn.sortDirection = this.getNextSortDirectionWhenDirectionDsc(currentColumn);
                currentColumn.isInitialSort = false;
                break;
            case MTableSortDirection.None:
            default:
                currentColumn.sortDirection = this.getNextSortDirectionWhenDirectionNone(currentColumn);
                currentColumn.isInitialSort = true;
                break;
        }

        this.emitSort(currentColumn);
        this.emitUpdateHeadRows(this.headRowsFilterAndSort);
    }

    public isColumnSorted(currentColumn: MTableColumn): boolean {
        return Boolean(this.getColumnSortDirectionClass(currentColumn));
    }

    public getColumnAlignmentClass(column: MTableColumn): string | undefined {
        return column.textAlign ? getCellAlignmentClass(column.textAlign) : 'm--is-text-align-left';
    }

    public getColumnSortIcon(currentColumn: MTableColumn): string {
        if (currentColumn.sortDirection) {
            return 'm-svg__arrow-thin--up'; // CSS rotate transform animation takes care of the arrow position
        } else {
            return currentColumn.defaultSortDirection === MTableSortDirection.Dsc
                ? 'm-svg__arrow-thin--down'
                : 'm-svg__arrow-thin--up';
        }
    }

    public getColumnSortDirectionClass(
        currentColumn: MTableColumnInternal
    ): string | undefined {
        switch (this.getCurrentColumnSortDirection(currentColumn)) {
            case MTableSortDirection.Asc:
                return 'm--is-sort-asc';
            case MTableSortDirection.Dsc:
                return 'm--is-sort-desc';
            case MTableSortDirection.None:
            default:
                return undefined;
        }
    }

    public getColumnWidthStyle(column: MTableColumn): string {
        return getCellWidthStyle(column);
    }

    private getNextSortDirectionWhenDirectionAsc(column: MTableColumnInternal): MTableSortDirection {
        if (column.enableUnsort) {
            return column.defaultSortDirection === MTableSortDirection.Dsc
                ? MTableSortDirection.None
                : MTableSortDirection.Dsc;
        } else {
            return MTableSortDirection.Dsc;
        }

    }

    private getNextSortDirectionWhenDirectionDsc(column: MTableColumnInternal): MTableSortDirection {
        if (column.enableUnsort) {
            return column.defaultSortDirection === MTableSortDirection.Asc ||
                column.defaultSortDirection === undefined
                ? MTableSortDirection.None
                : MTableSortDirection.Asc;
        } else {
            return MTableSortDirection.Asc;
        }
    }

    private getNextSortDirectionWhenDirectionNone(column: MTableColumnInternal): MTableSortDirection {
        return column.defaultSortDirection
            ? column.defaultSortDirection
            : MTableSortDirection.Asc;
    }

    private getCurrentColumnSortDirection(currentColumn: MTableColumnInternal): MTableSortDirection {
        if (typeof currentColumn.sortDirection === 'undefined') {
            return MTableSortDirection.None;
        }
        return currentColumn.sortDirection || MTableSortDirection.None;
    }
}

const TableHeadPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_HEAD_NAME, 'plugin.install');
        v.component(TABLE_HEAD_NAME, MTableHead);
    }
};

export default TableHeadPlugin;
