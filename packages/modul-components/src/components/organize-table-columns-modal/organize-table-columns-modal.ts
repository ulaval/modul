import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
import ButtonPlugin, { MButtonSkin } from '../button/button';
import { ORGANIZE_TABLE_COLUMNS_MODAL_NAME } from '../component-names';
import ModalPlugin from '../modal/modal';
import { MColumnTable } from '../table/table';
import WithRender from './organize-table-columns-modal.html';
import OrganizeTableColumnsPlugin from './organize-table-columns/organize-table-columns';

@WithRender
@Component
export class MOrganizeTableColumnsModal extends ModulVue {
    @Prop({
        required: true
    })
    public columns!: MColumnTable[];

    @Prop({
        default: MButtonSkin.Primary
    })
    public buttonSkin!: MButtonSkin;

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
        v.use(ButtonPlugin);
        v.use(ModalPlugin);
        v.use(OrganizeTableColumnsPlugin);
    }
};

export default OrganizeTableColumnsModalPlugin;
