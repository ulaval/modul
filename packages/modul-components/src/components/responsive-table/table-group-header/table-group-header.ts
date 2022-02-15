import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { ACCORDION_CLOSEST_ELEMENTS } from '../../accordion/accordion';
import { PLUS_NAME, TABLE_GROUP_HEADER_NAME } from '../../component-names';
import { MPlus, MPlusSkin } from '../../plus/plus';
import { getCellAlignmentClass, getTotalColumnsLength, MTableAccordionIconPosition, MTableCell, MTableColspan, MTableColumn, MTableRowsGroup } from '../responsive-table-commons';
import { MTableGroupMixin } from '../table-group/table-group-mixin';
import WithRender from './table-group-header.html?style=./table-group-header.scss';

@WithRender
@Component({
    components: {
        [PLUS_NAME]: MPlus
    },
    mixins: [MTableGroupMixin]
})
export class MTableGroupHeader extends ModulVue {
    @Prop({
        default: 0
    })
    public readonly horizontalScrollOffset!: number;

    @Prop({
        default: '100%'
    })
    public readonly tableComponentWidth!: string;

    public mPlusSkin: MPlusSkin = MPlusSkin.CurrentColor;

    public get role(): string | undefined {
        return !this.as<MTableGroupMixin>().hasAccordion ||
            this.as<MTableGroupMixin>().isAccordionDisabled
            ? undefined
            : 'button';
    }

    public get ariaExpanded(): string | undefined {
        if (!this.as<MTableGroupMixin>().hasAccordion || this.as<MTableGroupMixin>().isAccordionDisabled) {
            return undefined;
        }

        return this.as<MTableGroupMixin>().rowsGroup.accordion!.open ? 'true' : 'false';
    }

    public get tabindexEnteteAccordeon(): string | undefined {
        return !this.as<MTableGroupMixin>().hasAccordion ||
            this.as<MTableGroupMixin>().isAccordionDisabled
            ? undefined
            : '0';
    }

    public get isAccordeonIconPositionRight(): boolean {
        return (
            this.accordionIconPosition ===
            MTableAccordionIconPosition.Right
        );
    }

    public get isAccordeonIconPositionLeft(): boolean {
        return (
            this.accordionIconPosition ===
            MTableAccordionIconPosition.Left
        );
    }

    public get accordionIconPosition(): MTableAccordionIconPosition {
        if (
            this.as<MTableGroupMixin>().hasAccordion &&
            this.as<MTableGroupMixin>().rowsGroup.accordion!.iconPosition &&
            this.as<MTableGroupMixin>().rowsGroup.accordion!.iconPosition ===
            MTableAccordionIconPosition.Right
        ) {
            return MTableAccordionIconPosition.Right;
        }
        return MTableAccordionIconPosition.Left;
    }

    public get headerLeftPositionStyle(): {
        [key: string]: string | undefined;
    } {
        return {
            left: this.as<MTableGroupMixin>().firstColumnFixed && this.horizontalScrollOffset
                ? `${this.horizontalScrollOffset}px`
                : undefined
        };
    }

    public get headerWithoutCellsStyle(): {
        [key: string]: string | undefined;
    } {
        return {
            left: this.headerLeftPositionStyle.left,
            width: this.tableComponentWidth
        };
    }

    public getCellStyle(cell: MTableCell, columnIndex: number): {
        [key: string]: string | undefined;
    } | undefined {
        if (cell.colspan
            && columnIndex === 0
            && (
                cell.colspan === getTotalColumnsLength(this.as<MTableGroupMixin>().columns)
                || cell.colspan === MTableColspan.AllColumns
            )
        ) {
            return this.headerWithoutCellsStyle;
        }
        return undefined;
    }

    public get rowsGroupHeaderClassName(): string {
        return this.as<MTableGroupMixin>().rowsGroup &&
            this.as<MTableGroupMixin>().rowsGroup.header &&
            this.as<MTableGroupMixin>().rowsGroup.header!.className
            ? (this.as<MTableGroupMixin>().rowsGroup.header!
                .className as string)
            : '';
    }

    public get firstCellsItem(): string {
        return this.as<MTableGroupMixin>().hasHeaderCell
            ? Object.keys(
                this.as<MTableGroupMixin>().rowsGroup.header!.cells!
            )[0]
            : '';
    }

    public get displayAccordionIcon(): boolean {
        return this.as<MTableGroupMixin>().rowsGroup
            && this.as<MTableGroupMixin>().rowsGroup.accordion ?
            this.as<MTableGroupMixin>().rowsGroup.accordion!.displayIcon === undefined
            || Boolean(this.as<MTableGroupMixin>().rowsGroup.accordion!.displayIcon)
            : false;
    }

    public displayAccordionIconInCorrectCell(columnId: string, columnIndex: number): boolean {
        if (!this.displayAccordionIcon) {
            return false;
        }
        const arrayCells: string[] = this.as<MTableGroupMixin>().hasHeaderCell
            ? Object.keys(this.as<MTableGroupMixin>().rowsGroup.header!.cells!)
            : [];

        if (this.isAccordeonIconPositionLeft || arrayCells.length <= 1) {
            return columnIndex === 0;
        } else {
            return arrayCells[arrayCells.length - 1] === columnId;
        }
    }

    public toggleAccordeon(event: MouseEvent): void {
        const target: Element | null = (event.target as HTMLElement).closest(ACCORDION_CLOSEST_ELEMENTS);
        if (
            !this.as<MTableGroupMixin>().hasAccordion ||
            this.as<MTableGroupMixin>().isAccordionDisabled ||
            Boolean(target)
        ) {
            return;
        }
        this.as<MTableGroupMixin>().rowsGroup.accordion!.open = !this.as<MTableGroupMixin>().rowsGroup.accordion!.open;

        if (this.as<MTableGroupMixin>().rowsGroup.accordion!.open) {
            this.as<MTableGroupMixin>().emitOpenAccordion(this.as<MTableGroupMixin>().rowsGroup);
        } else {
            this.as<MTableGroupMixin>().emitCloseAccordion(this.as<MTableGroupMixin>().rowsGroup);
        }
    }


    public getColspan(colspan: number | MTableColspan): number {
        return colspan === MTableColspan.AllColumns ? this.as<MTableGroupMixin>().totalColumnsLength : colspan;
    }

    public getRowAlignmentClass(rowsGroup: MTableRowsGroup, column: MTableColumn): string {
        if (rowsGroup.header && rowsGroup.header.cells && rowsGroup.header.cells[column.name] && rowsGroup.header.cells[column.name].textAlign) {
            return getCellAlignmentClass(rowsGroup.header.cells[column.name].textAlign!);
        }
        return getCellAlignmentClass(column.textAlign);
    }
}

const TableGroupHeaderPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_GROUP_HEADER_NAME, 'plugin.install');
        v.component(TABLE_GROUP_HEADER_NAME, MTableGroupHeader);
    }
};

export default TableGroupHeaderPlugin;

