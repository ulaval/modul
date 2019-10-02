import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { TABLE_NAME } from '../component-names';
import ProgressPlugin from '../progress/progress';
import WithRender from './table.html?style=./table.scss';


export enum MTableSkin {
    Regular = 'regular',
    Simple = 'simple'
}

export enum MColumnSortDirection {
    None = 0,
    Asc = 1,
    Dsc = -1
}

export enum MColumnTextAlign {
    Center = 'center',
    Left = 'left',
    Right = 'right'
}

export interface MColumnTable {
    id: string;
    title: string;
    dataProp: string;
    width?: string;
    sortable?: boolean;
    enableUnsort?: boolean;
    textAlign?: MColumnTextAlign;
    class?: string;
    sortDirection?: MColumnSortDirection;
    defaultSortDirection?: MColumnSortDirection;
}

interface MColumnTableInternal extends MColumnTable {
    isInitialSort?: boolean;
}

@WithRender
@Component
export class MTable extends ModulVue {

    @Prop({
        default: MTableSkin.Regular,
        validator: value => Enums.toValueArray(MTableSkin).includes(value)
    })
    public skin: MTableSkin;

    @Prop({ default: () => [] })
    public columns: MColumnTable[];

    @Prop({ default: () => [] })
    public rows: any[];

    @Prop({ default: false })
    public loading: boolean;

    @Prop({ default: true })
    public rowHighlightedOnHover: boolean;

    public i18nEmptyTable: string = this.$i18n.translate('m-table:no-data');
    public i18nLoading: string = this.$i18n.translate('m-table:loading');
    public i18nPleaseWait: string = this.$i18n.translate('m-table:please-wait');
    public i18nSort: string = this.$i18n.translate('m-table:sort');

    @Emit('add')
    private onAdd(): void {
    }

    @Emit('sort-applied')
    private emitSortApplied(columnTable: MColumnTable): void { }

    public get isEmpty(): boolean {
        return this.rows.length === 0 && !this.loading;
    }

    public sort(columnTable: MColumnTableInternal): void {
        if (this.loading || !columnTable.sortable) {
            return;
        }

        if (typeof columnTable.sortDirection === 'undefined') {
            columnTable.sortDirection = MColumnSortDirection.None;
        }

        this.columnsInternal.forEach(c => {
            if (c !== columnTable) {
                c.sortDirection = MColumnSortDirection.None;
            }
        });

        switch (columnTable.sortDirection) {
            case MColumnSortDirection.None:
                columnTable.sortDirection = columnTable.defaultSortDirection ? columnTable.defaultSortDirection : MColumnSortDirection.Asc;
                columnTable.isInitialSort = true;
                break;
            case MColumnSortDirection.Asc:
                if (columnTable.enableUnsort) {
                    columnTable.sortDirection = columnTable.defaultSortDirection === MColumnSortDirection.Dsc ? MColumnSortDirection.None : MColumnSortDirection.Dsc;
                } else {
                    columnTable.sortDirection = MColumnSortDirection.Dsc;
                }
                columnTable.isInitialSort = false;
                break;
            case MColumnSortDirection.Dsc:
                if (columnTable.enableUnsort) {
                    columnTable.sortDirection = (columnTable.defaultSortDirection === MColumnSortDirection.Asc || columnTable.defaultSortDirection === undefined) ? MColumnSortDirection.None : MColumnSortDirection.Asc;
                } else {
                    columnTable.sortDirection = MColumnSortDirection.Asc;
                }
                columnTable.isInitialSort = false;
                break;
        }

        this.emitSortApplied(columnTable);
    }

    public isColumnSorted(columnTable: MColumnTable): boolean {
        return columnTable.sortDirection === MColumnSortDirection.Asc || columnTable.sortDirection === MColumnSortDirection.Dsc;
    }

    public isColumnTextAlignCenter(columnTable: MColumnTable): boolean {
        return columnTable.textAlign === MColumnTextAlign.Center;
    }

    public isColumnTextAlignLeft(columnTable: MColumnTable): boolean {
        return columnTable.textAlign === MColumnTextAlign.Left;
    }

    public isColumnTextAlignRight(columnTable: MColumnTable): boolean {
        return columnTable.textAlign === MColumnTextAlign.Right;
    }

    public getColumnSortDirectionClass(columnTable: MColumnTable): string | undefined {
        switch (columnTable.sortDirection) {
            case MColumnSortDirection.Asc:
                return 'm--is-sort-asc';
            case MColumnSortDirection.Dsc:
                return 'm--is-sort-desc';
            default:
                if (columnTable.defaultSortDirection) {
                    return columnTable.defaultSortDirection === MColumnSortDirection.Asc ? 'm--is-sort-asc' : 'm--is-sort-desc';
                } else {
                    return undefined;
                }
        }
    }

    public getColumnSortIcon(columnTable: MColumnTable): string {
        if (columnTable.sortDirection) {
            return 'm-svg__arrow-thin--up'; // CSS rotate transform animation takes care of the arrow position
        } else {
            return columnTable.defaultSortDirection === MColumnSortDirection.Dsc ? 'm-svg__arrow-thin--down' : 'm-svg__arrow-thin--up';
        }
    }

    public columnWidth(col: MColumnTable): { width: string } | '' {
        return col.width ? { width: col.width } : '';
    }

    get columnsInternal(): MColumnTableInternal[] {
        return this.columns.map((c: MColumnTable) => ({ ...c }));
    }
}

const TablePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(ProgressPlugin);
        v.component(TABLE_NAME, MTable);
    }
};

export default TablePlugin;
