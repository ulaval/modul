import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { getTotalColumnsLength, MTableColumn, MTableEmptyArea, MTableGroupHeaderStyle, MTableRowsGroup } from '../responsive-table-commons';

@Component
export class MTableGroupMixin extends Vue {
    @Prop({
        required: true
    })
    public readonly columns!: MTableColumn[];

    @Prop({
        required: true
    })
    public readonly rowsGroup!: MTableRowsGroup;

    @Prop({
        default: false
    })
    public readonly firstColumnFixed!: boolean;

    @Prop()
    public readonly defaultEmptyArea?: MTableEmptyArea;

    @Prop({
        default: MTableGroupHeaderStyle.Light,
        validator: (value: MTableGroupHeaderStyle) =>
            Enums.toValueArray(MTableGroupHeaderStyle).includes(value)
    })
    public groupHeaderStyle!: MTableGroupHeaderStyle;

    @Prop()
    public groupHeaderClassName: string;

    @Emit('open-accordion')
    public emitOpenAccordion(rowsGroup: MTableRowsGroup): void { }

    @Emit('close-accordion')
    public emitCloseAccordion(rowsGroup: MTableRowsGroup): void { }

    public get hasHeader(): boolean {
        return Boolean(
            this.rowsGroup.header && Object.keys(this.rowsGroup.header).length
        );
    }

    public get hasHeaderTitle(): boolean {
        return this.hasHeader && Boolean(this.rowsGroup.header!.title);
    }

    public get hasHeaderWithoutCell(): boolean {
        return this.hasHeader && !this.hasHeaderCell;
    }

    public get hasHeaderCell(): boolean {
        return Boolean(
            this.hasHeader &&
            this.rowsGroup.header!.cells &&
            Object.keys(this.rowsGroup.header!.cells).length
        );
    }

    public get hasEmptyArea(): boolean {
        return Boolean(
            this.rowsGroup.emptyArea &&
            Object.keys(this.rowsGroup.emptyArea).length
        );
    }

    public get hasRows(): boolean {
        return Boolean(this.rowsGroup.rows && this.rowsGroup.rows.length);
    }

    public get hasRowsOrEmptyArea(): boolean {
        return Boolean(
            this.hasRows || this.hasDefaultEmptyArea || this.hasEmptyArea
        );
    }

    public get hasDefaultEmptyArea(): boolean {
        return Boolean(
            this.defaultEmptyArea && Object.keys(this.defaultEmptyArea).length
        );
    }

    public get emptyArea(): MTableEmptyArea {
        if (this.hasEmptyArea) {
            return this.rowsGroup.emptyArea!;
        } else if (this.hasDefaultEmptyArea) {
            return this.defaultEmptyArea!;
        }
        return {};
    }

    public get hasAccordion(): boolean {
        return Boolean(this.rowsGroup.accordion);
    }

    public get isAccordionDisabled(): boolean {
        return (
            this.hasAccordion &&
            Boolean(this.rowsGroup.accordion!.disabled)
        );
    }

    public get isAccordionOpen(): boolean {
        return this.hasAccordion && this.rowsGroup.accordion!.open;
    }

    public get hasRowContent(): boolean {
        return this.hasAccordion
            ? this.isAccordionOpen && this.hasRowsOrEmptyArea
            : this.hasRowsOrEmptyArea;
    }

    public get totalColumnsLength(): number {
        return getTotalColumnsLength(this.columns);
    }
}

