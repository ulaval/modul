import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { RESPONSIVE_TABLE_NAME } from '../component-names';
import { REGEX_CSS_NUMBER_VALUE } from './../../utils/props-validation/props-validation';
import { MProgress } from './../progress/progress';
import { getHeadRowsFilterAndSort, getTotalColumnsLength, MTableColumn, MTableEmptyArea, MTableHeaderStyle, MTableHeadRow, MTableHeadRows, MTableHeadStyle, MTableRow, MTableRowsGroup, MTableRowsStyle } from './responsive-table-commons';
import WithRender from './responsive-table.html?style=./responsive-table.scss';
import { MTableBody } from './table-body/table-body';
import { MTableEmptyRow } from './table-empty-row/table-empty-row';
import { MTableHead } from './table-head/table-head';

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
    public readonly columns?: MTableColumn[];

    @Prop()
    public readonly rowGroups?: MTableRowsGroup[];

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
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly tableMinWidth!: string;

    @Prop({ default: true })
    public readonly displayTableHead!: boolean;

    @Prop({
        default: true
    })
    public rowHighlightedOnHover!: boolean;

    @Prop({
        default: MTableHeadStyle.Light,
        validator: (value: MTableHeadStyle) =>
            Enums.toValueArray(MTableHeadStyle).includes(value)
    })
    public readonly headStyle!: MTableHeadStyle;

    @Prop({
        default: MTableRowsStyle.AlternateBackground,
        validator: (value: MTableRowsStyle) =>
            Enums.toValueArray(MTableRowsStyle).includes(value)
    })
    public readonly rowsStyle!: MTableRowsStyle;

    @Prop({
        default: MTableHeaderStyle.Light,
        validator: (value: MTableHeaderStyle) =>
            Enums.toValueArray(MTableHeaderStyle).includes(value)
    })
    public groupHeaderStyle!: MTableHeaderStyle;

    @Prop()
    public groupHeaderClassName: string;

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

    @Emit('update:currentScrollLeft')
    public emitUpdateCurrentScrollLeft(_currentScrollLeft: number): void { }

    @Emit('scrollbar-width')
    public emitScrollbarWidth(_scrollbarWidth: number): void { }

    @Emit('open-accordion')
    public emitOpenAccordion(rowsGroup: MTableRowsGroup): void { }

    @Emit('close-accordion')
    public emitCloseAccordion(rowsGroup: MTableRowsGroup): void { }

    @Watch('currentScrollLeft', { immediate: true })
    public onCurrentScrollLeftChangement(value: number): void {
        if (this.currentScrollLeftInterne !== value) {
            this.currentScrollLeftInterne = value;
        }
    }

    @Watch('headRows', { immediate: true })
    public onHeadRowsChange(headRows: MTableHeadRows): void {
        this.headRowsFilterAndSort = headRows;
    }

    public headRowsInterne: MTableHeadRows = {};

    public get idTable(): string {
        return this.id || uuid.generate();
    }

    public get formatRowGroups(): MTableRowsGroup[] {
        if (this.rows && this.rows.length) {
            const newRowsGroup: MTableRowsGroup[] = [
                {
                    name: `rowGroupName${uuid.generate()}`,
                    rows: this.rows
                }
            ];
            return this.rowGroups
                ? this.rowGroups.concat(newRowsGroup)
                : newRowsGroup;
        } else if (this.rowGroups) {
            return this.rowGroups;
        }
        return [];
    }

    public get headRowsFilterAndSort(): MTableHeadRows {
        return this.headRowsInterne;
    }

    public set headRowsFilterAndSort(headRows: MTableHeadRows) {
        const headRowsArray: MTableHeadRow[] = headRows ? Object.keys(headRows).map((key: string) => {
            return headRows[key];
        }) : [];
        const hasSomeHeadMainColumns: boolean = headRowsArray.some((hr: MTableHeadRow) => {
            return hr.mainColumns;
        });
        let maxOrder: number = Math.max.apply(Math, headRowsArray.map((hr: MTableHeadRow) => hr.order));

        if (this.columns && this.columns.length && headRowsArray.length) {
            maxOrder = maxOrder && maxOrder > 0 ? maxOrder + 1 : 1;

            if (hasSomeHeadMainColumns) {
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

            this.headRowsInterne = getHeadRowsFilterAndSort(headRows);

        }
        this.headRowsInterne = getHeadRowsFilterAndSort(headRows) || {};
    }

    public get allColumns(): MTableColumn[] {
        return Object.keys(this.headRowsFilterAndSort)
            .reduce((acc: MTableColumn[], cur: string) => {
                this.headRowsFilterAndSort[cur].columns.forEach(c => {
                    acc.push(c);
                });
                return acc;
            }, []);
    }


    public get mainColumns(): MTableColumn[] | any {
        const formatHeadRowKeys: string[] = Object.keys(this.headRowsFilterAndSort);
        const keyMainColumns: string = formatHeadRowKeys[formatHeadRowKeys.findIndex(key => this.headRowsFilterAndSort[key].mainColumns)];
        return this.headRowsFilterAndSort[keyMainColumns].columns;
    }

    public get mainColumnsLength(): number {
        return getTotalColumnsLength(this.mainColumns);
    }
    public get hasRowsGroup(): boolean {
        return Boolean(this.formatRowGroups && this.formatRowGroups.length);
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

    public getEmptyAreaHeaderText(rowsGroup: MTableRowsGroup): string {
        if (rowsGroup.emptyArea && rowsGroup.emptyArea.headerText) {
            return rowsGroup.emptyArea.headerText;
        } else if (
            this.hasDefaultEmptyArea &&
            this.defaultEmptyArea!.headerText
        ) {
            return this.defaultEmptyArea!.headerText;
        }
        return '';
    }
}

const ResponsiveTablePlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(RESPONSIVE_TABLE_NAME, 'plugin.install');
        v.component(RESPONSIVE_TABLE_NAME, MResponsiveTable);
    }
};

export default ResponsiveTablePlugin;
