import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { TABLE_BODY_NAME } from '../../component-names';
import { MTableGroupHeader } from '../table-group-header/table-group-header';
import { getCellAlignmentClass, getCellWidthStyle, MTableColspan, MTableColumn, MTableRow, MTableRowsStyle } from './../responsive-table-commons';
import { MTableEmptyRow } from './../table-empty-row/table-empty-row';
import { MTableBodyMixin } from './table-body-mixin';
import WithRender from './table-body.html?style=./table-body.scss';

@WithRender
@Component({
    components: { MTableGroupHeader: MTableGroupHeader, MTableEmptyRow },
    mixins: [MTableBodyMixin]
})
export class MTableBody extends ModulVue {
    @Prop({
        default: MTableRowsStyle.AlternateBackground,
        validator: (value: MTableRowsStyle) =>
            Enums.toValueArray(MTableRowsStyle).includes(value)
    })
    public readonly rowsStyle!: MTableRowsStyle;

    @Prop({
        default: true
    })
    public readonly rowHighlightedOnHover!: boolean;

    @Prop({
        default: 0
    })
    public readonly currentScrollLeft!: number;

    @Prop({
        default: '100%'
    })
    public readonly tableComponentWidth!: string;

    public getRowClassName(
        row: MTableRow,
        columnid: string
    ): string | undefined {
        return row.cells &&
            row.cells[columnid] &&
            row.cells[columnid].className
            ? row.cells[columnid].className
            : undefined;
    }

    public getRowColspan(
        row: MTableRow,
        column: MColumnTable
    ): number | undefined {
        const colspan: number | undefined | MTableColspan =
            row.cells &&
                row.cells[column.id] &&
                row.cells[column.id].colspan
                ? row.cells[column.id].colspan
                : undefined;

        return colspan === MTableColspan.AllColumns
            ? this.as<MTableBodyMixin>().totalColumnsLength
            : colspan;
    }

    public getRowspan(
        row: MTableRow,
        column: MColumnTable
    ): number | undefined {
        return row.cells &&
            row.cells[column.id] &&
            row.cells[column.id].rowspan
            ? row.cells[column.id].rowspan
            : undefined;
    }

    public getRowAlignmentClass(column: MTableColumn): string {
        return getCellAlignmentClass(column);
    }

    public getRowWidthStyle(column: MTableColumn): string {
        return getCellWidthStyle(column);
    }

    public isCellHeader(row: MTableRow, columnName: string): boolean {
        return Boolean(row.cells && row.cells[columnName] && row.cells[columnName].isHeader);
    }
}

const TableBodyPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_BODY_NAME, 'plugin.install');
        v.component(TABLE_BODY_NAME, MTableBody);
    }
};

export default TableBodyPlugin;
