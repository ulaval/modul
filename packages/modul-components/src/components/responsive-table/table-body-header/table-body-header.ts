import { PluginObject } from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_BODY_HEADER_NAME } from '../../component-names';
import { MPlus, MPlusSkin } from '../../plus/plus';
import { MTableGroupAccordionIconPosition, MTableGroupHeaderSkin } from '../responsive-table-commons';
import { MTableBodyMixin } from '../table-body/table-body-mixin';
import WithRender from './table-body-header.html?style=./table-body-header.scss';

@WithRender
@Component({
    components: {
        MPlus
    },
    mixins: [MTableBodyMixin]
})
export class MTableBodyHeader extends ModulVue {
    @Prop({
        default: 0
    })
    public currentScrollLeft!: number;

    @Prop({
        default: '100%'
    })
    public tableComponentWidth!: string;

    public mPlusSkin: MPlusSkin = MPlusSkin.CurrentColor;

    public hasIconeAcccordeon(columnDataProp: string): boolean {
        if (!this.as<MTableBodyMixin>().hasAccordion) {
            return false;
        }
        const arrayCells: string[] = this.as<MTableBodyMixin>().hasHeaderCell
            ? Object.keys(this.as<MTableBodyMixin>().rowsGroup.header!.cells!)
            : [];

        if (this.isAccordeonIconPositionLeft || arrayCells.length <= 1) {
            return arrayCells[0] === columnDataProp;
        } else {
            return arrayCells[arrayCells.length - 1] === columnDataProp;
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

    public get skin(): MTableGroupHeaderSkin {
        // const skin: MTableGroupHeaderSkin | undefined = this.as<MTableBodyMixin>().rowsGroup?.header?.skin;
        // return skin ? skin : MTableGroupHeaderSkin.Light;
        return MTableGroupHeaderSkin.Light;
    }
}

const TableBodyHeaderPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_BODY_HEADER_NAME, 'plugin.install');
        v.component(TABLE_BODY_HEADER_NAME, MTableBodyHeader);
    }
};

export default TableBodyHeaderPlugin;

