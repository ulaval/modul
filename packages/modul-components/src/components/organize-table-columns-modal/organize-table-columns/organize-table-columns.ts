import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { SORTABLE_NAME } from '../../../directives/directive-names';
import { MSortEvent, SortableDirective } from '../../../directives/sortable/sortable';
import { I18N_NAME as I18N_FILTER_NAME } from '../../../filters/filter-names';
import { i18nFilter } from '../../../filters/i18n/i18n';
import { ModulVue } from '../../../utils/vue/vue';
import { MAdd } from '../../add/add';
import { MButton } from '../../button/button';
import { ADD_NAME, BUTTON_NAME, ICON_BUTTON_NAME, ICON_NAME, LIST_ITEM_NAME, ORGANIZE_TABLE_COLUMNS_NAME } from '../../component-names';
import { MIconButton } from '../../icon-button/icon-button';
import { MIcon } from '../../icon/icon';
import { MListItem } from '../../list-item/list-item';
import { MColumnTable } from '../../table/table';
import WithRender from './organize-table-columns.html?style=./organize-table-columns.scss';

@WithRender
@Component({
    components: {
        [ADD_NAME]: MAdd,
        [BUTTON_NAME]: MButton,
        [LIST_ITEM_NAME]: MListItem,
        [ICON_BUTTON_NAME]: MIconButton,
        [ICON_NAME]: MIcon
    },
    filters: {
        [I18N_FILTER_NAME]: i18nFilter
    },
    directives: {
        [SORTABLE_NAME]: SortableDirective
    }
})
export class MOrganizeTableColumns extends ModulVue {
    @Prop({
        required: true
    })
    public columns!: MColumnTable[];

    public displayedColumns: MColumnTable[] = [];
    public hiddenColumns: MColumnTable[] = [];

    @Watch('columns', { immediate: true })
    private setInternalsColumns(): void {
        let internalColumns: MColumnTable[] = JSON.parse(JSON.stringify(this.columns.filter(c => c.ignored === undefined || !c.ignored)));
        let canBeFixed: boolean = true;

        for (let i: number = 0; i < internalColumns.length; i++) {
            if (internalColumns[i].fixed && !(internalColumns[i].visible === undefined || internalColumns[i].visible)) {
                // Une colonne ne peut pas être fixed et non visible
                throw new Error(this.$i18n.translate('m-organize-table-columns:error.fixed1'));
            }

            if (!canBeFixed && internalColumns[i].fixed) {
                // Une colonne ne peut pas être fixed et après une colonne non fixed
                throw new Error(this.$i18n.translate('m-organize-table-columns:error.fixed2'));
            }

            if (internalColumns[i].fixed === undefined || !internalColumns[i].fixed) {
                canBeFixed = false;
            }
        }

        this.displayedColumns = internalColumns.filter(c => c.visible === undefined || c.visible);
        this.hiddenColumns = internalColumns.filter(c => (c.fixed === undefined || c.fixed === false) && c.visible === false);
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
        this.emitReorganize([...this.displayedColumns, ...this.hiddenColumns]);
    }

    public addColumn(column: MColumnTable): void {
        this.hiddenColumns.splice(this.hiddenColumns.findIndex(c => c.id === column.id), 1);
        column.visible = true;
        this.displayedColumns.push(column);
        this.emitReorganize([...this.displayedColumns, ...this.hiddenColumns]);
    }

    public moveColumn(event: MSortEvent): void {
        this.moveItemInList(this.displayedColumns, event.sortInfo.oldPosition, event.sortInfo.newPosition);
        this.emitReorganize([...this.displayedColumns, ...this.hiddenColumns]);
    }

    public isDraggable(column: MColumnTable): string {
        return column.fixed !== undefined && column.fixed ? 'false' : 'true';
    }

    public isDroppable(column: MColumnTable): string {
        return column.fixed !== undefined && column.fixed ? 'false' : 'true';
    }

    @Emit('reorganize')
    public emitReorganize(columns: MColumnTable[]): void {
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
    }
};

export default OrganizeTableColumnsPlugin;
