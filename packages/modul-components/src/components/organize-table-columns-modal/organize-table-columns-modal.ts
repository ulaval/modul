import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
import { MButton } from '../button/button';
import { ORGANIZE_TABLE_COLUMNS_MODAL_NAME } from '../component-names';
import { MModal } from '../modal/modal';
import { MColumnTable } from '../table/table';
import WithRender from './organize-table-columns-modal.html?style=./organize-table-columns-modal.scss';
import { MOrganizeTableColumns } from './organize-table-columns/organize-table-columns';

@WithRender
@Component({
    components: {
        MModal,
        MButton,
        MOrganizeTableColumns
    }
})
export class MOrganizeTableColumnsModal extends ModulVue {
    @Prop({
        required: true
    })
    public readonly columns!: MColumnTable[];

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
