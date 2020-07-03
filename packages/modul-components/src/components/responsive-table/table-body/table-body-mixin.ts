import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MTableEmptyArea, MTableGroup } from '../responsive-table-commons';

@Component
export class MTableBodyMixin extends Vue {
    @Prop({
        required: true
    })
    public readonly columns!: MColumnTable[];

    @Prop({
        required: true
    })
    public readonly rowsGroup!: MTableGroup;

    @Prop({
        default: false
    })
    public firstColumnFixed!: boolean;

    @Prop()
    public readonly defaultEmptyArea?: MTableEmptyArea;

    public get hasHeader(): boolean {
        return Boolean(
            this.rowsGroup.header && Object.keys(this.rowsGroup.header).length
        );
    }

    public get hasHeaderTitle(): boolean {
        return this.hasHeader && Boolean(this.rowsGroup.header!.title);
    }

    public get hasHeaderOrHeaderEmptyArea(): boolean {
        return Boolean(this.hasHeader || this.emptyAreaTextHeader);
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

    public get hasRowEmptyArea(): boolean {
        return Boolean(
            this.hasEmptyArea &&
            (this.rowsGroup.emptyArea!.text ||
                this.rowsGroup.emptyArea!.iconName)
        );
    }

    public get hasRows(): boolean {
        return Boolean(this.rowsGroup.rows && this.rowsGroup.rows.length);
    }

    public get hasRowsOrRowEmptyArea(): boolean {
        return Boolean(
            this.hasRows || this.hasDefaultRowEmptyAreas || this.hasRowEmptyArea
        );
    }

    public get hasDefaultEmptyArea(): boolean {
        return Boolean(
            this.defaultEmptyArea && Object.keys(this.defaultEmptyArea).length
        );
    }

    public get hasDefaultRowEmptyAreas(): boolean {
        return Boolean(
            this.hasDefaultEmptyArea &&
            (this.defaultEmptyArea!.text || this.defaultEmptyArea!.iconName)
        );
    }

    public get emptyAreaTextHeader(): string {
        if (this.hasEmptyArea && this.rowsGroup.emptyArea!.headerText) {
            return this.rowsGroup.emptyArea!.headerText;
        } else if (
            this.hasDefaultEmptyArea &&
            this.defaultEmptyArea!.headerText
        ) {
            return this.defaultEmptyArea!.headerText;
        }
        return '';
    }

    public get rowEmptyArea(): MTableEmptyArea {
        if (this.hasRowEmptyArea) {
            return this.rowsGroup.emptyArea!;
        } else if (this.hasDefaultRowEmptyAreas) {
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
            (Boolean(this.rowsGroup.accordion!.disabled) ||
                !this.hasRowsOrRowEmptyArea)
        );
    }

    public get isAccordionOpen(): boolean {
        return this.hasAccordion && this.rowsGroup.accordion!.open;
    }

    public get hasRowContent(): boolean {
        return this.hasAccordion
            ? this.isAccordionOpen && this.hasRowsOrRowEmptyArea
            : this.hasRowsOrRowEmptyArea;
    }
}

const MTableBodyMixinPlugin: PluginObject<any> = {
    install(_v, _options): void {
        Vue.mixin(MTableBodyMixin);
    }
};

export default MTableBodyMixinPlugin;
