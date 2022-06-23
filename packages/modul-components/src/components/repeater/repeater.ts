import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
import { MAdd } from '../add/add';
import { REPEATER_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import WithRender from './repeater.html?style=./repeater.scss';

export interface MRepeaterItem { }

export interface MRepeaterOperations {
    canAdd: boolean;
    canDelete: boolean;
}

export interface MRepeaterItemProps<T = MRepeaterItem> {
    item: T;
    index: number;
}

export interface MRepeaterRowProps<T = MRepeaterItem> extends MRepeaterItemProps<T> {
    canDelete: boolean;
}

export interface MRepeaterRowListeners {
    onDelete(): void;
}

@WithRender
@Component({
    components: {
        MIconButton,
        MAdd
    }
})
export class MRepeater extends ModulVue {
    @Prop({
        required: true
    })
    public readonly list: MRepeaterItem[];

    @Prop()
    public readonly addButtonLabel?: string;

    @Prop()
    public readonly deleteButtonLabel?: string;

    @Prop()
    public readonly emptyMessage?: string;

    @Prop({
        default: 'ul'
    })
    public readonly tag: string;

    @Prop()
    public readonly itemKey?: string;

    @Prop({
        default: (): MRepeaterOperations => ({
            canAdd: true,
            canDelete: true
        })
    })
    public readonly operations: MRepeaterOperations;

    @Prop({
        default: 0
    })
    public readonly minItemCount: number;

    @Prop({
        default: Infinity
    })
    public readonly maxItemCount: number;

    mounted(): void {
        if (!this.$scopedSlots.row && !this.$scopedSlots.item) {
            throw new Error('MRepeater requires content to be provided through row or item slot.');
        }
    }

    @Emit('add')
    onAddBtnClick(): void { }

    @Emit('delete')
    onDeleteBtnClick(index: number): void { }

    getRowProps(item: MRepeaterItem, index: number): MRepeaterRowProps {
        return {
            ...this.getItemProps(item, index),
            canDelete: this.canDelete
        };
    }

    getRowListeners(item: MRepeaterItem, index: number): MRepeaterRowListeners {
        return {
            onDelete: () => this.onDeleteBtnClick(index)
        };
    }

    getItemKey(item: MRepeaterItem, index: number): unknown | number {
        return this.itemKey ? item[this.itemKey] : index;
    }

    getItemProps(item: MRepeaterItem, index: number): MRepeaterItemProps {
        return {
            item, index
        };
    }

    get addBtnLabel(): string {
        return this.addButtonLabel || this.$i18n.translate('m-repeater:add');
    }

    get deleteBtnLabel(): string {
        return this.deleteButtonLabel || this.$i18n.translate('m-repeater:delete');
    }

    get canAdd(): boolean {
        return this.operations.canAdd && this.list.length < this.maxItemCount;
    }

    get canDelete(): boolean {
        return this.operations.canDelete && this.list.length > this.minItemCount;
    }

    get itemTag(): string {
        return this.tag === 'ul' ? 'li' : 'span';
    }

    get hasRowSlot(): boolean {
        return !!this.$scopedSlots.row;
    }
}

const RepeaterPlugin: PluginObject<any> = {
    install(v): void {
        v.component(REPEATER_NAME, MRepeater);
    }
};

export default RepeaterPlugin;

