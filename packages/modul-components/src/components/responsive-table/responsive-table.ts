import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { AUTO_HORIZONTAL_SCROLL, PROGRESS_NAME, RESPONSIVE_TABLE_NAME, TABLE_EMPTY_ROW_NAME, TABLE_GROUP_NAME, TABLE_HEAD_NAME } from '../component-names';
import { REGEX_CSS_NUMBER_VALUE } from './../../utils/props-validation/props-validation';
import { MAutoHorizontalScroll, MAutoHorizontalScrollGradientStyle, MAutoHorizontalScrollResizeProperties } from './../auto-horizontal-scroll/auto-horizontal-scroll';
import { MProgress } from './../progress/progress';
import { getHeadRowsFilterAndSort, getTotalColumnsLength, MTableColumn, MTableEmptyArea, MTableGroupHeaderStyle, MTableHeadRow, MTableHeadRows, MTableHeadStyle, MTableRow, MTableRowsGroup, MTableRowsStyle } from './responsive-table-commons';
import WithRender from './responsive-table.html?style=./responsive-table.scss';
import { MTableEmptyRow } from './table-empty-row/table-empty-row';
import { MTableGroup } from './table-group/table-group';
import { MTableHead } from './table-head/table-head';

@WithRender
@Component({
    components: {
        [AUTO_HORIZONTAL_SCROLL]: MAutoHorizontalScroll,
        [TABLE_HEAD_NAME]: MTableHead,
        [TABLE_GROUP_NAME]: MTableGroup,
        [TABLE_EMPTY_ROW_NAME]: MTableEmptyRow,
        [PROGRESS_NAME]: MProgress
    }
})
export class MResponsiveTable extends ModulVue {
    @Prop({
        required: true
    })
    public readonly id!: string;

    @Prop()
    public readonly headRows?: MTableHeadRows;

    @Prop()
    public readonly columns?: MTableColumn[];

    @Prop()
    public readonly rowGroups?: MTableRowsGroup[];

    @Prop()
    public readonly rows?: MTableRow[];

    @Prop()
    public readonly defaultEmptyArea?: MTableEmptyArea;

    @Prop({
        default: false
    })
    public readonly waiting!: boolean;

    @Prop({ default: true })
    public readonly displayTableHead!: boolean;

    @Prop({
        default: true
    })
    public readonly rowHighlightedOnHover!: boolean;

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
        default: MTableGroupHeaderStyle.Light,
        validator: (value: MTableGroupHeaderStyle) =>
            Enums.toValueArray(MTableGroupHeaderStyle).includes(value)
    })
    public readonly groupHeaderStyle!: MTableGroupHeaderStyle;

    @Prop()
    public readonly groupHeaderClassName: string;

    @Prop({
        default: true
    })
    public readonly dragActive!: boolean;

    @Prop({
        default: true
    })
    public readonly leftGradientActive!: boolean;

    @Prop({
        default: true
    })
    public readonly rightGradientActive!: boolean;

    @Prop({
        default: MAutoHorizontalScrollGradientStyle.White,
        validator: (value: MAutoHorizontalScrollGradientStyle) =>
            Enums.toValueArray(
                MAutoHorizontalScrollGradientStyle
            ).includes(value)
    })
    public readonly gradientStyle!: MAutoHorizontalScrollGradientStyle;

    @Prop({
        default: false
    })
    public readonly previousButtonActive!: boolean;

    @Prop({
        default: false
    })
    public readonly nextButtonActive!: boolean;

    @Prop()
    public readonly previousButtonText?: string;

    @Prop()
    public readonly nextButtonText?: string;

    @Prop({
        default: false
    })
    public readonly firstColumnFixedActive!: boolean;

    @Prop({
        default: '100%',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly tableMinWidth!: string;

    @Prop()
    public readonly horizontalScrollOffset?: number;

    @Prop({
        default: true
    })
    public readonly displayHorizontalScrollbar!: boolean;

    @Emit('empty-button-click')
    public emitEmptyButtonClick(rowsGroup: MTableRowsGroup): void { }

    public horizontalScrollOffsetInterne: number = 0;
    public hasHorizontalScroll: boolean = false;
    public tableComponentWidth: string = '100%';

    @Emit('sort')
    public emitSort(_column: MTableColumn): void { }

    @Emit('update:horizontalScrollOffset')
    public emitUpdateHorizontalScrollOffset(_horizontalScrollOffset: number): void { }

    @Emit('horizontal-scollbar-width')
    public emitHorizontalScollbarWidth(_scrollbarWidth: number): void { }

    @Emit('open-accordion')
    public emitOpenAccordion(rowsGroup: MTableRowsGroup): void { }

    @Emit('close-accordion')
    public emitCloseAccordion(rowsGroup: MTableRowsGroup): void { }

    @Emit('previous-button-click')
    public emitPreviousButtonClick(event: MouseEvent): void { }

    @Emit('next-button-click')
    public emitNextButtonClick(event: MouseEvent): void { }

    @Watch('horizontalScrollOffset', { immediate: true })
    public onHorizontalScrollOffsetChangement(value: number | undefined): void {
        if (this.horizontalScrollOffsetInterne !== value && value) {
            this.horizontalScrollOffsetInterne = value;
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
        const hasSomeHeadMainColumns: boolean = Boolean(headRowsArray.length) && headRowsArray.some((hr: MTableHeadRow) => {
            return hr.mainColumns;
        });
        let maxOrder: number = Math.max.apply(Math, headRowsArray.map((hr: MTableHeadRow) => hr.order));

        headRows = headRowsArray.length ? headRows : {};

        if (this.columns && this.columns.length && !Boolean(headRowsArray.length)) {
            headRows[hasSomeHeadMainColumns ? `lastRow-${this.id}` : `mainRow-${this.id}`] = {
                order: maxOrder && maxOrder > 0 ? maxOrder + 1 : 1,
                mainColumns: !hasSomeHeadMainColumns,
                columns: this.columns
            };
        } else if (!hasSomeHeadMainColumns && headRowsArray.length) {
            headRows[Object.keys(headRows)[headRowsArray.length - 1]].mainColumns = true;
        }
        this.headRowsInterne = getHeadRowsFilterAndSort(headRows);
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


    public get mainColumns(): MTableColumn[] {
        const formatHeadRowKeys: string[] = Object.keys(this.headRowsFilterAndSort);
        const keyMainColumns: string = formatHeadRowKeys[formatHeadRowKeys.findIndex(key => this.headRowsFilterAndSort[key].mainColumns)];
        return this.headRowsFilterAndSort[keyMainColumns].columns || [];
    }

    public get mainColumnsLength(): number {
        return getTotalColumnsLength(this.mainColumns);
    }
    public get hasRowsGroup(): boolean {
        return Boolean(this.formatRowGroups && this.formatRowGroups.length);
    }

    public set horizontalScrollOffsetProp(value: number) {
        this.horizontalScrollOffsetInterne = value;
        this.emitUpdateHorizontalScrollOffset(this.horizontalScrollOffsetInterne);
    }

    public get horizontalScrollOffsetProp(): number {
        return this.horizontalScrollOffsetInterne;
    }

    public get firstColumnFixed(): boolean {
        return this.firstColumnFixedActive && this.hasHorizontalScroll;
    }

    public resizeComponant(
        properties: MAutoHorizontalScrollResizeProperties
    ): void {
        if (!properties) {
            return;
        }
        this.hasHorizontalScroll = properties.hasHorizontalScroll;
        this.tableComponentWidth = properties.componentWidth;
        this.emitHorizontalScollbarWidth(properties.horizontalScollbarWidth);
    }

    public get hasDefaultEmptyArea(): boolean {
        return Boolean(
            this.defaultEmptyArea &&
            Object.keys(this.defaultEmptyArea).length > 0
        );
    }
}

const ResponsiveTablePlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(RESPONSIVE_TABLE_NAME, 'plugin.install');
        v.component(RESPONSIVE_TABLE_NAME, MResponsiveTable);
    }
};

export default ResponsiveTablePlugin;
