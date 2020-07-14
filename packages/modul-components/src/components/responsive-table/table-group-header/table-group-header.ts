import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_GROUP_HEADER_NAME } from '../../component-names';
import { MPlus, MPlusSkin } from '../../plus/plus';
import { getCellAlignmentClass, MTableAccordionIconPosition, MTableColspan, MTableColumn, MTableRowsGroup } from '../responsive-table-commons';
import { MTableGroupMixin } from '../table-group/table-group-mixin';
import WithRender from './table-group-header.html?style=./table-group-header.scss';

@WithRender
@Component({
    components: {
        MPlus
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
            left: this.as<MTableGroupMixin>().firstColumnFixed
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
        const target: Element | null = (event.target as HTMLElement).closest(
            `[href], [onclick], a, button, input, textarea, radio`
        );
        if (
            !this.as<MTableGroupMixin>().hasAccordion ||
            this.as<MTableGroupMixin>().isAccordionDisabled ||
            Boolean(target)
        ) {
            event.preventDefault();
            return;
        }
        this.as<MTableGroupMixin>().rowsGroup.accordion!.open = !this.as<MTableGroupMixin>().rowsGroup.accordion!.open;
        if (event.currentTarget) {
            (event.currentTarget as HTMLElement).blur();
        }

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

const TableBodyHeaderPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_GROUP_HEADER_NAME, 'plugin.install');
        v.component(TABLE_GROUP_HEADER_NAME, MTableGroupHeader);
    }
};

export default TableBodyHeaderPlugin;

