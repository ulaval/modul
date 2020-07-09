import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_GROUP_HEADER_NAME } from '../../component-names';
import { MPlus, MPlusSkin } from '../../plus/plus';
import { MTableColspan, MTableGroupAccordionIconPosition } from '../responsive-table-commons';
import { MTableBodyMixin } from '../table-body/table-body-mixin';
import WithRender from './table-group-header.html?style=./table-group-header.scss';

@WithRender
@Component({
    components: {
        MPlus
    },
    mixins: [MTableBodyMixin]
})
export class MTableGroupHeader extends ModulVue {
    @Prop({
        default: 0
    })
    public currentScrollLeft!: number;

    @Prop({
        default: '100%'
    })
    public tableComponentWidth!: string;

    public mPlusSkin: MPlusSkin = MPlusSkin.CurrentColor;

    public displayAccordionIconInCorrectCell(columnId: string): boolean {
        if (!this.displayAccordionIcon) {
            return false;
        }
        const arrayCells: string[] = this.as<MTableBodyMixin>().hasHeaderCell
            ? Object.keys(this.as<MTableBodyMixin>().rowsGroup.header!.cells!)
            : [];

        if (this.isAccordeonIconPositionLeft || arrayCells.length <= 1) {
            return arrayCells[0] === columnId;
        } else {
            return arrayCells[arrayCells.length - 1] === columnId;
        }
    }

    public toggleAccordeon(event: MouseEvent): void {
        const target: Element | null = (event.target as HTMLElement).closest(
            `[href], [onclick], a, button, input, textarea, radio`
        );
        if (
            !this.as<MTableBodyMixin>().hasAccordion ||
            this.as<MTableBodyMixin>().isAccordionDisabled ||
            Boolean(target)
        ) {
            event.preventDefault();
            return;
        }
        this.as<MTableBodyMixin>().rowsGroup.accordion!.open = !this.as<MTableBodyMixin>().rowsGroup.accordion!.open;
        if (event.currentTarget) {
            (event.currentTarget as HTMLElement).blur();
        }
    }

    public getColspan(colspan: number | MTableColspan): number {
        return colspan === MTableColspan.AllColumns ? this.as<MTableBodyMixin>().nbColumns : colspan;
    }

    public get tabindexEnteteAccordeon(): string | undefined {
        return !this.as<MTableBodyMixin>().hasAccordion ||
            this.as<MTableBodyMixin>().isAccordionDisabled
            ? undefined
            : '0';
    }

    public get isAccordeonIconPositionRight(): boolean {
        return (
            this.accordionIconPosition ===
            MTableGroupAccordionIconPosition.Right
        );
    }

    public get isAccordeonIconPositionLeft(): boolean {
        return (
            this.accordionIconPosition ===
            MTableGroupAccordionIconPosition.Left
        );
    }

    public get accordionIconPosition(): MTableGroupAccordionIconPosition {
        if (
            this.as<MTableBodyMixin>().hasAccordion &&
            this.as<MTableBodyMixin>().rowsGroup.accordion!.iconPosition &&
            this.as<MTableBodyMixin>().rowsGroup.accordion!.iconPosition ===
            MTableGroupAccordionIconPosition.Right
        ) {
            return MTableGroupAccordionIconPosition.Right;
        }
        return MTableGroupAccordionIconPosition.Left;
    }

    public get headerLeftPositionStyle(): {
        [key: string]: string | undefined;
    } {
        return {
            left: this.as<MTableBodyMixin>().firstColumnFixed
                ? `${this.currentScrollLeft}px`
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
        return this.as<MTableBodyMixin>().rowsGroup &&
            this.as<MTableBodyMixin>().rowsGroup.header &&
            this.as<MTableBodyMixin>().rowsGroup.header!.className
            ? (this.as<MTableBodyMixin>().rowsGroup.header!
                .className as string)
            : '';
    }

    public get firstCellsItem(): string {
        return this.as<MTableBodyMixin>().hasHeaderCell
            ? Object.keys(
                this.as<MTableBodyMixin>().rowsGroup.header!.cells!
            )[0]
            : '';
    }

    public get displayAccordionIcon(): boolean {
        return this.as<MTableBodyMixin>().rowsGroup
        && this.as<MTableBodyMixin>().rowsGroup.accordion ?
            this.as<MTableBodyMixin>().rowsGroup.accordion!.displayIcon === undefined
            || Boolean(this.as<MTableBodyMixin>().rowsGroup.accordion!.displayIcon)
        : false;
    }
}

const TableBodyHeaderPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_GROUP_HEADER_NAME, 'plugin.install');
        v.component(TABLE_GROUP_HEADER_NAME, MTableGroupHeader);
    }
};

export default TableBodyHeaderPlugin;

