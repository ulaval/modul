import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_EMPTY_ROW_NAME, TABLE_GROUP_HEADER_NAME, TABLE_GROUP_NAME } from '../../component-names';
import { MColumnTable } from '../../table/table';
import { getCellAlignmentClass, getCellWidthStyle, MTableColspan, MTableColumn, MTableRow, MTableRowsGroup, MTableRowsStyle } from '../responsive-table-commons';
import { MTableEmptyRow } from '../table-empty-row/table-empty-row';
import { MTableGroupHeader } from '../table-group-header/table-group-header';
import { MTableGroupMixin } from './table-group-mixin';
import WithRender from './table-group.html?style=./table-group.scss';

@WithRender
@Component({
    components: {
        [TABLE_GROUP_HEADER_NAME]: MTableGroupHeader,
        [TABLE_EMPTY_ROW_NAME]: MTableEmptyRow
    },
    mixins: [MTableGroupMixin]
})
export class MTableGroup extends ModulVue {
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
    public readonly horizontalScrollOffset!: number;

    @Prop({
        default: '100%'
    })
    public readonly tableComponentWidth!: string;

    @Emit('empty-button-click')
    public emitEmptyButtonClick(rowsGroup: MTableRowsGroup): void { }

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
            ? this.as<MTableGroupMixin>().totalColumnsLength
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

    public getRowAlignmentClass(row: MTableRow, column: MTableColumn): string {
        if (row.cells && row.cells[column.name] && row.cells[column.name].textAlign) {
            return getCellAlignmentClass(row.cells[column.name].textAlign!);
        }
        return getCellAlignmentClass(column.textAlign);
    }

    public getRowWidthStyle(column: MTableColumn): string {
        return getCellWidthStyle(column);
    }

    public isCellHeader(row: MTableRow, columnName: string): boolean {
        return Boolean(row.cells && row.cells[columnName] && row.cells[columnName].isHeader);
    }
}

const TableGroupPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_GROUP_NAME, 'plugin.install');
        v.component(TABLE_GROUP_NAME, MTableGroup);
    }
};

export default TableGroupPlugin;
