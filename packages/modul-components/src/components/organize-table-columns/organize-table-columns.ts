import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import SortablePlugin, { MSortEvent } from '../../directives/sortable/sortable';
import { MColumnTable } from '../../lib';
import { ModulVue } from '../../utils/vue/vue';
import ButtonPlugin from '../button/button';
import { ORGANIZE_TABLE_COLUMNS_NAME } from '../component-names';
import IconButtonPlugin from '../icon-button/icon-button';
import IconPlugin from '../icon/icon';
import ListItemPlugin from '../list-item/list-item';
import SpinnerPlugin from '../spinner/spinner';
import WithRender from './organize-table-columns.html?style=./organize-table-columns.scss';

@WithRender
@Component
export class MOrganizeTableColumns extends ModulVue {
    @Prop({
        required: true
    })
    public columns!: MColumnTable[];

    @Prop({ default: 10 })
    public maxColumn: number;

    public loading: boolean = true;
    public displayedColumns: MColumnTable[] = [];
    public hiddenColumns: MColumnTable[] = [];

    @Watch('columns', { immediate: true })
    private setInternalsColumns(): void {
        let internalColumns: MColumnTable[] = JSON.parse(JSON.stringify(this.columns.filter(c => c.ignored === undefined || !c.ignored)));
        let canBeFixed: boolean = true;

        for (let i: number = 0; i < internalColumns.length; i++) {
            if (internalColumns[i].fixed && !(internalColumns[i].visible === undefined || internalColumns[i].visible)) {
                this.$log.error(this.$i18n.translate('m-organize-table-columns:error.fixed1'));
                internalColumns = [];
                return;
            }

            if (!canBeFixed && internalColumns[i].fixed) {
                this.$log.error(this.$i18n.translate('m-organize-table-columns:error.fixed2'));
                internalColumns = [];
                return;
            }

            if (internalColumns[i].fixed === undefined || !internalColumns[i].fixed) {
                canBeFixed = false;
            }
        }

        this.displayedColumns = internalColumns.filter(c => c.visible === undefined || c.visible);
        this.hiddenColumns = internalColumns.filter(c => (c.fixed === undefined || c.fixed === false) && c.visible === false);
        this.loading = false;
    }

    get numberDisplayedColumns(): number {
        return this.displayedColumns.length;
    }

    get numberHiddenColumns(): number {
        return this.hiddenColumns.length;
    }

    public removeColumn(column: MColumnTable): void {
        this.displayedColumns.splice(this.displayedColumns.findIndex(c => c.id === column.id), 1);
        column.visible = false;
        this.hiddenColumns.push(column);
    }

    public addColumn(column: MColumnTable): void {
        this.hiddenColumns.splice(this.hiddenColumns.findIndex(c => c.id === column.id), 1);
        column.visible = true;
        this.displayedColumns.push(column);
    }

    public moveColumn(event: MSortEvent): void {
        this.moveItemInList(this.displayedColumns, event.sortInfo.oldPosition, event.sortInfo.newPosition);
    }

    public isDraggable(column: MColumnTable): string {
        return column.fixed !== undefined && column.fixed ? 'false' : 'true';
    }

    public isDroppable(column: MColumnTable): string {
        return column.fixed !== undefined && column.fixed ? 'false' : 'true';
    }

    public reorganize(): void {
        this.$emit('reorganize', [...this.displayedColumns, ...this.hiddenColumns]);
    }

    @Emit('reset')
    public reset(): void {
        this.setInternalsColumns();
    }

    private moveItemInList(arr, oldIndex, newIndex): void {
        let element: MColumnTable = arr[oldIndex];
        arr.splice(oldIndex, 1);
        arr.splice(newIndex, 0, element);
    }
}

const OrganizeTableColumnsPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(ORGANIZE_TABLE_COLUMNS_NAME, MOrganizeTableColumns);
        v.use(SortablePlugin);
        v.use(SpinnerPlugin);
        v.use(ListItemPlugin);
        v.use(IconPlugin);
        v.use(IconButtonPlugin);
        v.use(ButtonPlugin);
    }
};

export default OrganizeTableColumnsPlugin;
