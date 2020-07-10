import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { I18N_NAME as FILTER_I18N_NAME } from '../../filters/filter-names';
import { i18nFilter } from '../../filters/i18n/i18n';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { BUTTON_NAME, MODAL_NAME, ORGANIZE_TABLE_COLUMNS_MODAL_NAME, ORGANIZE_TABLE_COLUMNS_NAME } from '../component-names';
import { MModal } from '../modal/modal';
import { MColumnTable } from '../table/table';
import WithRender from './organize-table-columns-modal.html?style=./organize-table-columns-modal.scss';
import { MOrganizeTableColumns } from './organize-table-columns/organize-table-columns';

@WithRender
@Component({
    filters: {
        [FILTER_I18N_NAME]: i18nFilter
    },
    components: {
        [MODAL_NAME]: MModal,
        [BUTTON_NAME]: MButton,
        [ORGANIZE_TABLE_COLUMNS_NAME]: MOrganizeTableColumns
    }
})
export class MOrganizeTableColumnsModal extends ModulVue {
    @Prop({
        required: true
    })
    public columns!: MColumnTable[];

    public internalColumns: MColumnTable[] = [];
    public open: boolean = false;

    @Watch('columns', { immediate: true })
    private setInternalColumns(columns: MColumnTable[]): void {
        this.internalColumns = [...this.columns];
    }

    public reorganize(columns: MColumnTable[]): void {
        this.internalColumns = columns;
    }

    public saveReorganize(): void {
        this.emitReorganize(this.internalColumns);
    }

    @Emit('reorganize')
    public emitReorganize(columns: MColumnTable[]): void {
        this.open = false;
    }

    @Emit('reset')
    public reset(): void {
        this.setInternalColumns(this.columns);
        this.open = false;
    }
}

const OrganizeTableColumnsModalPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ORGANIZE_TABLE_COLUMNS_MODAL_NAME, MOrganizeTableColumnsModal);
    }
};

export default OrganizeTableColumnsModalPlugin;
