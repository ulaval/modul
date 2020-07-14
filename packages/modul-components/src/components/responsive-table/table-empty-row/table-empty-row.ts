
import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { TABLE_EMPTY_ROW_NAME } from '../../component-names';
import { MTableEmptyArea } from '../responsive-table-commons';
import { MEmptyArea } from './../../empty-area/empty-area';
import WithRender from './table-empty-row.html?style=./table-empty-row.scss';

@WithRender
@Component({
    modul: {
        i18n: {
            'fr': require('./table-empty-row.lang.fr.json'),
            'en': require('./table-empty-row.lang.en.json')
        }
    },
    components: {
        MEmptyArea
    }
})
export class MTableEmptyRow extends ModulVue {
    @Prop({
        required: true
    })
    public readonly tableComponentWidth!: string;

    @Prop({
        required: false
    })
    public readonly waiting!: boolean;

    @Prop({
        required: true
    })
    public readonly horizontalScrollOffset!: number;

    @Prop()
    public readonly nbColumns?: number;

    @Prop()
    public readonly emptyArea?: MTableEmptyArea;

    @Prop({
        default: false
    })
    public readonly displayDefaultText!: boolean;

    @Emit('empty-button-click')
    public emitEmptyButtonClick(event: MouseEvent): void { }

    public get title(): string {
        if (this.waiting) {
            return this.$i18n.translate('m-table-empty-row:loading');
        }

        const title: string =
            this.emptyArea && this.emptyArea.title ? this.emptyArea.title : '';
        return !title && this.displayDefaultText
            ? this.$i18n.translate('m-table-empty-row:no-data')
            : title;
    }

    public get subtitle(): string {
        return this.emptyArea && this.emptyArea.subtitle && !this.waiting
            ? this.emptyArea.subtitle
            : '';
    }

    public get svgName(): string {
        return this.emptyArea && this.emptyArea.svgName && !this.waiting
            ? this.emptyArea.svgName
            : '';
    }

    public get buttonText(): string {
        return this.emptyArea && this.emptyArea.buttonText && !this.waiting
            ? this.emptyArea.buttonText
            : '';
    }
}

const TableEmptyRowPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(TABLE_EMPTY_ROW_NAME, 'plugin.install');
        v.component(TABLE_EMPTY_ROW_NAME, MTableEmptyRow);
    }
};

export default TableEmptyRowPlugin;
