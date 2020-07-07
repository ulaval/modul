import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { RESPONSIVE_TABLE_NAME } from '../component-names';
import { MProgress } from './../progress/progress';
import { MTableBodySkin, MTableColumn, MTableColumns, MTableEmptyArea, MTableGroup, MTableHeadRow, MTableHeadRows, MTableHeadStyle, MTableRow } from './responsive-table-commons';
import WithRender from './responsive-table.html?style=./responsive-table.scss';
import { MTableBody } from './table-body/table-body';
import { MTableEmptyRow } from './table-empty-row/table-empty-row';
import { MTableHead } from './table-head/table-head';

export const REGEX_NOMBRE_EN_PX_EM_POURCENT: RegExp = /^\d+(\.[0-9]{1,4})?(px|em|%)$/;

@WithRender
@Component({
    components: {
        // MpoDefilementHorizontalAutomatique,
        MTableHead,
        MTableBody,
        MTableEmptyRow,
        MProgress
    }
})
export class MResponsiveTable extends ModulVue {
    @Prop()
    public readonly id?: string;

    @Prop()
    public readonly headRows?: MTableHeadRows;

    @Prop()
    public readonly columns?: MTableColumns;

    @Prop()
    public readonly rowGroups?: MTableGroup[];

    @Prop()
    public readonly rows?: MTableRow[];

    @Prop({
        default: false
    })
    public readonly waiting!: boolean;

    @Prop({
        default: false
    })
    public readonly firstColumnFixed!: boolean;

    @Prop({
        default: '1000px',
        validator: (value: string) =>
            REGEX_NOMBRE_EN_PX_EM_POURCENT.test(value)
    })
    public readonly tableMinWidth!: string;

    @Prop({ default: true })
    public readonly displayTableHead!: boolean;

    @Prop({ default: true })
    public readonly rowHoverEffect!: boolean;

    @Prop({
        default: MTableHeadStyle.Light
        validator: (value: MTableHeadStyle) =>
            Enums.toValueArray(MTableHeadStyle).includes(value)
    })
    public readonly headSkin!: MTableHeadStyle;

    @Prop({
        default: MTableBodySkin.AlternateBackground,
        validator: (value: MTableBodySkin) =>
            Enums.toValueArray(MTableBodySkin).includes(value)
    })
    public readonly bodySkin!: MTableBodySkin;

    @Prop({
        default: 0
    })
    public currentScrollLeft!: number;

    @Prop()
    public readonly defaultEmptyArea?: MTableEmptyArea;

    @Prop({
        default: true
    })
    public readonly displayScrollbar!: boolean;

    public currentScrollLeftInterne: number = 0;
    public hasDefilementVertical: boolean = false;
    public tableComponentWidth: string = '100%';

    @Emit('sort')
    public emitSort(_column: MTableColumn): void { }

    @Watch('currentScrollLeft', { immediate: true })
    public onCurrentScrollLeftChangement(value: number): void {
        if (this.currentScrollLeftInterne !== value) {
            this.currentScrollLeftInterne = value;
        }
    }

    @Emit('update:currentScrollLeft')
    public emitUpdateCurrentScrollLeft(_currentScrollLeft: number): void { }

    @Emit('scrollbar-width')
    public emitScrollbarWidth(_scrollbarWidth: number): void { }

    public get idTable(): string {
        return this.id || uuid.generate();
    }

    public get formatRowsGroup(): MTableGroup[] {
        if (this.rows && this.rows.length) {
            const nouveauRowsGroup: MTableGroup[] = [
                {
                    rows: this.rows
                }
            ];
            return this.rowGroups
                ? this.rowGroups.concat(nouveauRowsGroup)
                : nouveauRowsGroup;
        } else if (this.rowGroups) {
            return this.rowGroups;
        }
        return [];
    }

    public get formatHeadRows(): MTableHeadRows {
        const headRows: MTableHeadRows = Object.assign({}, this.headRows);
        const headRowsArray: MTableHeadRow[] = headRows ? Object.keys(headRows).map((key: string) => {
            return headRows[key];
        }) : [];
        const hasSomeHeadMainRow: boolean = headRowsArray.some((hr: MTableHeadRow) => {
            return hr.mainColumns;
        });
        let maxOrder: number = Math.max.apply(Math, headRowsArray.map((hr: MTableHeadRow) => hr.order));

        if (this.columns && this.columns.length && headRowsArray.length) {
            maxOrder = maxOrder && maxOrder > 0 ? maxOrder + 1 : 1;

            if (hasSomeHeadMainRow) {
                headRows['lastRow'] = {
                    order: maxOrder,
                    columns: this.columns
                };
            } else {
                headRows['mainRow'] = {
                    order: maxOrder,
                    mainColumns: true,
                    columns: this.columns
                };
            }

            return headRows;

        }
        return headRows || {};
    }

    public get allColumns(): MTableColumns {
        return Object.keys(this.formatHeadRows)
            .reduce((acc: MTableColumn[], cur: string) => {
                this.formatHeadRows[cur].columns.forEach(c => {
                    acc.push(c);
                });
                return acc;
            }, []);
    }

    public get hasRowsGroup(): boolean {
        return Boolean(this.formatRowsGroup && this.formatRowsGroup.length);
    }

    public set currentScrollLeftProp(value: number) {
        this.currentScrollLeftInterne = value;
        this.emitUpdateCurrentScrollLeft(this.currentScrollLeftInterne);
    }

    public get currentScrollLeftProp(): number {
        return this.currentScrollLeftInterne;
    }

    public get isFirstColumnFixed(): boolean {
        return this.firstColumnFixed && this.hasDefilementVertical;
    }

    public resizeComponant(
        proprieteRedimension: any
    ): void {
        this.hasDefilementVertical = proprieteRedimension.hasDefilementVertical;
        this.tableComponentWidth = proprieteRedimension.largeurComposant;
        this.emitScrollbarWidth(proprieteRedimension.largeurBarreDefilement);
    }

    public get hasDefaultEmptyArea(): boolean {
        return Boolean(
            this.defaultEmptyArea &&
            Object.keys(this.defaultEmptyArea).length > 0
        );
    }
}

const ResponsiveTablePlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(RESPONSIVE_TABLE_NAME, 'plugin.install');
        v.component(RESPONSIVE_TABLE_NAME, MResponsiveTable);
    }
};

export default ResponsiveTablePlugin;
