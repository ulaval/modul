import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { FormatMode } from '../../utils/i18n/i18n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { I18N_NAME, ICON_NAME, INPUT_STYLE_NAME, MULTI_SELECT_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MIcon } from '../icon/icon';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import MChipDelete from './../chip/chip-delete/chip-delete';
import { MBaseSelect } from './../select/base-select/base-select';
import { MSelectItem } from './../select/select-item/select-item';
import WithRender from './multi-select.html?style=./multi-select.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        MSelectItem,
        MChipDelete,
        [I18N_NAME]: MI18n,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [ICON_NAME]: MIcon,
        [INPUT_STYLE_NAME]: MInputStyle
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

    @Prop()
    public placeholder: string;

    public id: string = `${MULTI_SELECT_NAME}-${uuid.generate()}`;
    public internalValue: any[] = [];
    public internalIsFocus: boolean = false;
    public selectAllFocused: boolean = false;
    public open: boolean = false;

    public $refs: {
        baseSelect: MBaseSelect;
    };

    created(): void {
        if (!Array.isArray(this.value)) {
            this.$log.error('MMultiSelect - The model must be an array');
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
        return this.options && this.options.length > 0 && this.options.length === this.value.length;
    }

    get chipsDisplayMode(): number {
        if (this.allSelected) {
            return 1;
        } else if (this.numberOfItemsSelected > this.maxVisibleChips) {
            return 0;
        }
        return -1;
    }

    get textNumberOfSelectedItems(): string {
        return this.$i18n.translate('m-multi-select:all-selected', [this.numberOfItemsSelected], undefined, undefined,false, FormatMode.Default);
    }

    get textNumberOfUnselectedItemsLeft(): string {
        return this.$i18n.translate('m-multi-select:more', [this.numberOfItemsSelected - this.maxVisibleChips], undefined, undefined,false, FormatMode.Default);
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

    onFocus($event: FocusEvent): void {
        this.internalIsFocus = this.as<InputStateMixin>().active;
        if (this.internalIsFocus) {
            this.$emit('focus', $event);
        }
    }

    @Emit('blur')
    onBlur($event: FocusEvent): void {
        this.internalIsFocus = false;
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (this.options) {
            if (this.$refs.baseSelect.focusedIndex === this.options.length - 1 && this.linkSelectAll) {
                this.$refs.baseSelect.focusedIndex = -1;
                this.selectAllFocused = true;
            } else {
                this.selectAllFocused = false;
                this.$refs.baseSelect.focusNextItem();
            }
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (this.options) {
            if (this.$refs.baseSelect.focusedIndex === 0 && this.linkSelectAll) {
                this.$refs.baseSelect.focusedIndex = -1;
                this.selectAllFocused = true;
            } else {
                this.selectAllFocused = false;
                this.$refs.baseSelect.focusPreviousItem();
            }
        }
    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.options) {
            if (this.$refs.baseSelect.focusedIndex > -1) {
                this.$refs.baseSelect.select(this.$refs.baseSelect.items[this.$refs.baseSelect.focusedIndex], this.$refs.baseSelect.focusedIndex, $event);
            } else if (this.selectAllFocused) {
                this.onToggleAll();
            }
        }
    }

    onKeydownSpace($event: KeyboardEvent): void {
        if (this.options) {
            this.selectAllFocused = false;
            this.$refs.baseSelect.onKeydownSpace($event);
        }
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

    @Watch('focus')
    private focusChanged(focus: boolean): void {
        this.internalIsFocus = focus && this.as<InputStateMixin>().active;
        let inputEl: HTMLElement | undefined = this.as<InputStateMixin>().getInput();
        if (inputEl) {
            if (this.internalIsFocus) {
                inputEl.focus();
            } else {
                inputEl.blur();
            }
        }
    }
}

const MultiSelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(MULTI_SELECT_NAME, MMultiSelect);
    }
};

export default MultiSelectPlugin;
