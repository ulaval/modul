import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MULTI_SELECT_NAME } from '../component-names';
import I18nPlugin from '../i18n/i18n';
import { MChipDelete } from './../chip/chip-delete/chip-delete';
import { MBaseSelect } from './../select/base-select/base-select';
import { MSelectItem } from './../select/select-item/select-item';
import WithRender from './multi-select.html?style=./multi-select.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        MSelectItem,
        MChipDelete
    },
    mixins: [
        InputState,
        MediaQueries,
        InputWidth,
        InputLabel
    ]
})
export class MMultiSelect extends ModulVue {
    @Model('input')
    @Prop({
        validator: value => Array.isArray(value)
    })
    public value: any[];

    @Prop({
        validator: value => Array.isArray(value)
    })
    public options: any[];

    @Prop()
    public focus: boolean;

    @Prop({
        default: false
    })
    public linkSelectAll: boolean;

    @Prop({
        default: 5
    })
    public maxVisibleChips: number;

    @Prop({
        default: 12
    })
    public defaultChipCharsTrunk: number;

    public id: string = `${MULTI_SELECT_NAME}-${uuid.generate()}`;
    public internalValue: any[] = [];
    public isFocus: boolean = false;
    public selectAllFocused: boolean = false;
    public open: boolean = false;

    public $refs: {
        baseSelect: MBaseSelect;
        input: HTMLElement;
    };

    @Emit('focus')
    private emitFocus(event: FocusEvent): void { }

    @Emit('blur')
    private emitBlur(event: FocusEvent): void { }

    created(): void {
        if (!Array.isArray(this.value)) {
            this.$log.error('MMultiSelect - The model must be an array');
        }
        if (!Array.isArray(this.options)) {
            this.$log.error('MMultiSelect - The options must be an array');
        }
    }

    mounted(): void {
        if (this.focus) {
            this.focusChanged(this.focus);
        }
    }

    set model(value: any[]) {
        this.internalValue = value;
        this.$emit('input', this.internalValue);
    }

    get model(): any[] {
        return this.internalValue;
    }

    get selectedItems(): any[] {
        if (this.value) {
            return this.value;
        }
        return [];
    }

    get numberOfItemsSelected(): number {
        return this.selectedItems.length;
    }

    get isEmpty(): boolean {
        return this.hasValue || (this.open) ? false : true;
    }

    get hasValue(): boolean {
        return !!(this.model && this.model.length > 0);
    }

    get allSelected(): boolean {
        return this.options.length === this.value.length;
    }

    get chipsDisplayMode(): number {
        if (this.allSelected) {
            return 1;
        } else if (this.numberOfItemsSelected > this.maxVisibleChips) {
            return 0;
        }
        return -1;
    }

    get iconArrowTitle(): string {
        return this.open ? this.$i18n.translate('m-multi-select:close') : this.$i18n.translate('m-multi-select:open');
    }

    public toggle(): void {
        this.selectAllFocused = false;
        this.$refs.baseSelect.togglePopup();
    }

    @Emit('select-item')
    onSelect(option: any, index: number, $event: Event): void {
        let positionInModel: number = this.model.indexOf(option);
        if (positionInModel === -1) {
            this.model = [...this.model, (this.options[index])];
        } else {
            this.onDelete(positionInModel);
        }
        this.$refs.baseSelect.update();

        if ($event.type === 'click') {
            this.$refs.baseSelect.focusedIndex = -1;
        }
    }

    onDelete(index: number): void {
        this.model = this.model.slice(0, index).concat(this.model.slice(index + 1));
        this.$refs.baseSelect.update();
    }

    onDeleteAll(): void {
        this.model = [];
        this.$refs.baseSelect.update();
    }

    onFocus(event: FocusEvent): void {
        if (this.as<InputStateMixin>().disabled) {
            return;
        }
        this.isFocus = true;
        if (this.isFocus) {
            this.emitFocus(event);
            this.mettreAJourFocus();
        }
    }

    onBlur(event: FocusEvent): void {
        this.emitBlur(event);
        if (this.open) {
            return;
        }
        this.isFocus = this.open;
        this.mettreAJourFocus();
    }

    onClose(): void {
        this.isFocus = false;
        this.mettreAJourFocus();
    }

    mettreAJourFocus(): void {
        if (this.focus === this.isFocus) {
            return;
        }
        this.$emit('update:focus', this.isFocus);
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (!this.open) {
            this.open = true;
        }
        if (this.$refs.baseSelect.focusedIndex === this.options.length - 1 && this.linkSelectAll) {
            this.$refs.baseSelect.focusedIndex = -1;
            this.selectAllFocused = true;
        } else {
            this.selectAllFocused = false;
            this.$refs.baseSelect.focusNextItem();
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (!this.open) {
            this.open = true;
        }
        if (this.$refs.baseSelect.focusedIndex === 0 && this.linkSelectAll) {
            this.$refs.baseSelect.focusedIndex = -1;
            this.selectAllFocused = true;
        } else {
            this.selectAllFocused = false;
            this.$refs.baseSelect.focusPreviousItem();
        }
    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.$refs.baseSelect.focusedIndex > -1) {
            this.$refs.baseSelect.select(this.$refs.baseSelect.items[this.$refs.baseSelect.focusedIndex], this.$refs.baseSelect.focusedIndex, $event);
        } else if (this.selectAllFocused) {
            this.onToggleAll();
        }
    }

    onKeydownSpace($event: KeyboardEvent): void {
        this.selectAllFocused = false;
        this.$refs.baseSelect.onKeydownSpace($event);
    }

    onToggleAll(): void {
        if (this.allSelected) {
            this.model = [];
        } else {
            this.model = [...this.options];
        }
    }

    getChipLabel(item: any): string {
        let ellipsis: string = item.toString().length > this.defaultChipCharsTrunk ? '...' : '';
        return `${item.toString().substring(0, this.defaultChipCharsTrunk)}${ellipsis}`;
    }

    @Watch('value', { immediate: true })
    private onValueChange(value: any[]): void {
        this.internalValue = this.value;
    }

    @Watch('focus', { immediate: true })
    private focusChanged(focus: boolean): void {
        let inputEl: HTMLElement | undefined = this.$refs.input;
        if (this.as<InputStateMixin>().disabled || !inputEl) {
            return;
        }
        if (focus) {
            inputEl.focus();
        } else if (this.isFocus) {
            inputEl.blur();
        }
    }
}

const MultiSelectPlugin: PluginObject<any> = {
    install(v, options): void {
        Vue.use(I18nPlugin);
        v.component(MULTI_SELECT_NAME, MMultiSelect);
    }
};

export default MultiSelectPlugin;
