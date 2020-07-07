import { MIconButtonSkin } from '@ulaval/modul-components/dist/components/icon-button/icon-button';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { TABLE_HEAD_NAME } from '../../component-names';
import { MIconButton } from '../../icon-button/icon-button';
import { getCellAlignmentClass, getCellWidthStyle, MTableColumn, MTableColumns, MTableColumnSortDirection, MTableHeadRows, MTableHeadStyle } from '../responsive-table-commons';
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
    public firstColumnFixed!: boolean;

    @Prop({
        default: false
    })
    public waiting!: boolean;

    @Emit('sort')
    public emitSort(_column: MTableColumn): void { }

    public get sortHeadRows(): string[] {
        return Object.keys(this.headRows).sort((a, b) => {
            if (this.headRows && this.headRows[a] && this.headRows[b] && this.headRows[a].order && this.headRows[b].order) {
                return this.headRows[a].order - this.headRows[b].order;
            }
            return 1;
        });
    }

    public getFormatColumns(columns: MTableColumns): MTableColumns {
        return columns
            .filter((c: MTableColumn) => c.visible === undefined || c.visible)
            .sort((a, b) => {
                if (a.order && b.order) {
                    return a.order - b.order;
                }
                return 1;
            });
    }

    public get skinSortIcon(): MIconButtonSkin {
        return this.headStyle === MTableHeadStyle.Dark
            ? MIconButtonSkin.Dark
            : MIconButtonSkin.Light;
    }

    public sort(currentColumn: MTableColumnInternal, columns: MTableColumnInternal[], headRowKey: string): void {
        if (this.waiting || !currentColumn.sortable) {
            return;
        }

        if (typeof currentColumn.sortDirection === 'undefined') {
            currentColumn.sortDirection = MTableColumnSortDirection.None;
        }

        columns.forEach((c: MTableColumnInternal) => {
            if (c !== currentColumn) {
                c.sortDirection = MTableColumnSortDirection.None;
            }
        });

        switch (currentColumn.sortDirection) {
            case MTableColumnSortDirection.None:
                currentColumn.sortDirection = this.sortColumnDirectionNone(currentColumn);
                currentColumn.isInitialSort = true;
                break;
            case MTableColumnSortDirection.Asc:
                currentColumn.sortDirection = this.sortColumnDirectionAsc(currentColumn);
                currentColumn.isInitialSort = false;
                break;
            case MTableColumnSortDirection.Dsc:
                currentColumn.sortDirection = this.sortColumnDirectionDsc(currentColumn);
                currentColumn.isInitialSort = false;
                break;
        }

        this.emitSort(currentColumn);
    }

    public isColumnSorted(currentColumn: MTableColumn): boolean {
        return (
            currentColumn.sortDirection === MTableColumnSortDirection.Asc ||
            currentColumn.sortDirection === MTableColumnSortDirection.Dsc
        );
    }

    public getColumnAlignmentClass(column: MTableColumn): string {
        return getCellAlignmentClass(column);
    }

    public getColumnSortIcon(currentColumn: MTableColumn): string {
        if (currentColumn.sortDirection) {
            return 'm-svg__arrow-thin--up'; // CSS rotate transform animation takes care of the arrow position
        } else {
            return currentColumn.defaultSortDirection === MTableColumnSortDirection.Dsc
                ? 'm-svg__arrow-thin--down'
                : 'm-svg__arrow-thin--up';
        }
    }

    public getColumnSortDirectionClass(
        currentColumn: MTableColumn
    ): string | undefined {
        switch (currentColumn.sortDirection) {
            case MTableColumnSortDirection.Asc:
                return 'm--is-sort-asc';
            case MTableColumnSortDirection.Dsc:
                return 'm--is-sort-desc';
            default:
                if (currentColumn.defaultSortDirection) {
                    return currentColumn.defaultSortDirection ===
                        MTableColumnSortDirection.Asc
                        ? 'm--is-sort-asc'
                        : 'm--is-sort-desc';
                } else {
                    return undefined;
                }
        }
    }

    public getColumnWidthStyle(column: MTableColumn): string {
        return getCellWidthStyle(column);
    }

    private sortColumnDirectionNone(column: MTableColumnInternal): MTableColumnSortDirection {
        return column.defaultSortDirection
            ? column.defaultSortDirection
            : MTableColumnSortDirection.Asc;

    }

    private sortColumnDirectionAsc(column: MTableColumnInternal): MTableColumnSortDirection {
        if (column.enableUnsort) {
            return column.defaultSortDirection === MTableColumnSortDirection.Dsc
                ? MTableColumnSortDirection.None
                : MTableColumnSortDirection.Dsc;
        } else {
            return MTableColumnSortDirection.Dsc;
        }

    }

    private sortColumnDirectionDsc(column: MTableColumnInternal): MTableColumnSortDirection {
        if (column.enableUnsort) {
            return column.defaultSortDirection === MTableColumnSortDirection.Asc ||
                column.defaultSortDirection === undefined
                ? MTableColumnSortDirection.None
                : MTableColumnSortDirection.Asc;
        } else {
            return MTableColumnSortDirection.Asc;
        }
    }
}

const TableHeadPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_HEAD_NAME, 'plugin.install');
        v.component(TABLE_HEAD_NAME, MTableHead);
    }
};

export default TableHeadPlugin;
