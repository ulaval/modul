import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { TABLE_BODY_NAME } from '../../component-names';
import { getCellAlignmentClass, getCellWidthStyle, MTableBodySkin, MTableColspan, MTableRow } from './../responsive-table-commons';
import { MTableBodyHeader } from './../table-body-header/table-body-header';
import { MTableEmptyRow } from './../table-empty-row/table-empty-row';
import { MTableBodyMixin } from './table-body-mixin';
import WithRender from './table-body.html?style=./table-body.scss';

@WithRender
@Component({
    components: { MTableBodyHeader, MTableEmptyRow },
    mixins: [MTableBodyMixin]
})
export class MTableBody extends ModulVue {
    @Prop({
        default: MTableBodySkin.AlternateBackground,
        validator: (value: MTableBodySkin) =>
            Enums.toValueArray(MTableBodySkin).includes(value)
    })
    public readonly skin!: MTableBodySkin;

    @Prop({
        default: true
    })
    public rowHoverEffect!: boolean;

    @Prop({
        default: 0
    })
    public currentScrollLeft!: number;

    @Prop({
        default: '100%'
    })
    public tableComponentWidth!: string;

    public getRowClassName(
        row: MTableRow,
        columnDataProp: string
    ): string | undefined {
        return row.cells &&
            row.cells[columnDataProp] &&
            row.cells[columnDataProp].className
            ? row.cells[columnDataProp].className
            : undefined;
    }
    public getRowColspan(
        row: MTableRow,
        column: MColumnTable
    ): number | undefined {
        const colspan: number | undefined | MTableColspan =
            row.cells &&
                row.cells[column.dataProp] &&
                row.cells[column.dataProp].colspan
                ? row.cells[column.dataProp].colspan
                : undefined;

        return colspan === MTableColspan.AllColumns
            ? this.as<MTableBodyMixin>().columns.length
            : colspan;
    }

    public getRowAlignmentClass(column: MColumnTable): string {
        return getCellAlignmentClass(column);
    }

    public getRowWidthStyle(column: MColumnTable): string {
        return getCellWidthStyle(column);
    }
}

const TableBodyPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_BODY_NAME, 'plugin.install');
        v.component(TABLE_BODY_NAME, MTableBody);
    }
};

export default TableBodyPlugin;
