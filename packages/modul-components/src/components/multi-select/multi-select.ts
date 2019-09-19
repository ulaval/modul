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
import { MBaseSelect } from './../select/base-select/base-select';
import { MSelectItem } from './../select/select-item/select-item';
import WithRender from './multi-select.html?style=./multi-select.scss';

const MAX_LENGTH_CHIP_LABEL: number = 12;

@WithRender
@Component({
    components: {
        MBaseSelect,
        MSelectItem
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
    public value: string[];

    @Prop({
        validator: value => Array.isArray(value)
    })
    public options: any[];

    @Prop()
    public focus: boolean;

    @Prop({
        default: false
    })
    public selectAll: boolean;

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

    get isEmpty(): boolean {
        return this.hasValue || (this.open) ? false : true;
    }

    get hasValue(): boolean {
        return !!(this.model && this.model.length > 0);
    }

    get allSelected(): boolean {
        return this.options.length === this.value.length;
    }

    @Emit('select-item')
    onSelect(option: any, index: number, $event: Event): void {
        let positionInModel: number = this.model.indexOf(option);
        if (positionInModel === -1) {
            this.model.push(this.options[index]);
        } else {
            this.onDelete(positionInModel);
        }

        if (this.$refs.baseSelect.$refs.popup.$refs.popper) { // Pas en mobile
            this.$refs.baseSelect.$refs.popup.$refs.popper.update();
        }

        if ($event.type === 'click') {
            this.$refs.baseSelect.focusedIndex = -1;
        }
    }

    onDelete(index: number): void {
        this.model.splice(index, 1);
    }

    onFocus($event: FocusEvent): void {
        this.internalIsFocus = this.as<InputStateMixin>().active;
        if (this.internalIsFocus) {
            this.$emit('focus', $event);
        }
    }

    @Emit('blur')
    onBlur($event: Event): void {
        this.internalIsFocus = false;
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (this.$refs.baseSelect.focusedIndex === this.options.length - 1 && this.selectAll) {
            this.$refs.baseSelect.focusedIndex = -1;
            this.selectAllFocused = true;
        } else {
            this.selectAllFocused = false;
            this.$refs.baseSelect.focusNextItem();
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (this.$refs.baseSelect.focusedIndex === 0 && this.selectAll) {
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

    onToggleAll(): void {
        if (this.allSelected) {
            this.model.splice(0, this.model.length);
        } else {
            this.model.splice(0, this.model.length, ...this.options);
        }
    }

    getChipLabel(item: any): string {
        let ellipsis: string = item.toString().length > MAX_LENGTH_CHIP_LABEL ? '...' : '';
        return `${item.toString().substring(0, MAX_LENGTH_CHIP_LABEL)}${ellipsis}`;
    }

    @Watch('value', { immediate: true })
    private onValueChange(value: string): void {
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
        Vue.use(I18nPlugin);
        v.component(MULTI_SELECT_NAME, MMultiSelect);
    }
};

export default MultiSelectPlugin;
