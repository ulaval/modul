import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Ref, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { FormatMode } from '../../utils/i18n/i18n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MULTI_SELECT_NAME } from '../component-names';
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
        MI18n,
        MValidationMessage,
        MIcon,
        MInputStyle
    },
    mixins: [
        InputState, InputWidth, InputLabel, MediaQueries
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

    @Prop({ default: () => `${MULTI_SELECT_NAME}-${uuid.generate()}` })
    public readonly id: string;

    public readonly inputAriaDescribedby: string = uuid.generate();
    public readonly selectedValueId: string = uuid.generate();
    public internalValue: any[] = [];
    public internalFocus: boolean = false;
    public open: boolean = false;
    public internalOptions: any[] = [];
    public allSelectedCheckboxIsChecked: boolean = false;

    @Ref('input')
    public readonly refInput?: HTMLElement;

    @Ref('baseSelect')
    public readonly refBaseSelect: MBaseSelect;

    @Emit('open')
    public async emitOpen(): Promise<void> {
        await this.$nextTick();
        this.refBaseSelect.focusFirstSelected();
    }

    @Emit('close')
    public emitClose(): void { }

    @Emit('blur')
    public onBlur($event: FocusEvent): void {
        this.internalFocus = false;
    }

    @Emit('select-item')
    public onSelect(option: any, index: number, $event: Event): void {
        let positionInModel: number = this.model.indexOf(option);
        if (this.linkSelectAll && index === 0) {
            this.onToggleAll();
        } else {
            if (positionInModel === -1) {
                this.model = [...this.model, (this.internalOptions[index])];
            } else {
                this.onDelete(option);
            }

            this.update();
        }

        if ($event.type === 'click') {
            this.refBaseSelect.focusedIndex = -1;
        }
    }

    public $refs: {
        baseSelect: MBaseSelect;
    };

    public set model(value: any[]) {
        this.internalValue = value;
        if (this.linkSelectAll && this.internalValue.some(v => v === this.internalOptions[0])) {
            this.$emit('input', this.internalValue.filter(v => v !== this.internalOptions[0]));
        } else {
            this.$emit('input', this.internalValue);
        }
    }

    public get model(): any[] {
        return this.internalValue;
    }

    public get selectedItems(): any[] {
        return this.value || [];
    }

    public get numberOfItemsSelected(): number {
        return this.selectedItems.length;
    }

    public get isEmpty(): boolean {
        return !this.hasValue && !this.open && !Boolean(this.placeholder);
    }

    public get hasValue(): boolean {
        return !!(this.model && this.model.length > 0);
    }

    public get allSelected(): boolean {
        return this.options && this.options.length === this.selectedItems.length;
    }

    public get chipsDisplayMode(): number {
        if (this.allSelected) {
            return 1;
        } else if (this.numberOfItemsSelected > this.maxVisibleChips) {
            return 0;
        }
        return -1;
    }

    public get textNumberOfSelectedItems(): string {
        return this.$i18n.translate('m-multi-select:all-selected', [this.numberOfItemsSelected], undefined, undefined, false, FormatMode.Default);
    }

    public get textNumberOfUnselectedItemsLeft(): string {
        return this.$i18n.translate('m-multi-select:more', [this.numberOfItemsSelected - this.maxVisibleChips], undefined, undefined, false, FormatMode.Default);
    }

    public get hiddenTextSelectedValue(): string {
        let text: string = this.$i18n.translate('m-multi-select:selected-items', [this.numberOfItemsSelected], this.numberOfItemsSelected);
        if (this.numberOfItemsSelected) {
            text += `: ${this.selectedItems.join(', ')}`;
        }
        return text;
    }

    public onPortalAfterClose(): void {
        this.focusInput();
    }

    public onClickOnItem(): void {
        this.focusInput();
    }

    public toggle(): void {
        this.refBaseSelect.togglePopup();
    }

    public onInputStyleClick(callbackToggle: any): void {
        callbackToggle();

        if (this.open) {
            this.focusInput();
        }
    }

    public focusInput(): void {
        if (
            this.refInput && document.activeElement !== this.refInput
        ) {
            this.refInput.focus();
        }
    }

    public onDelete(option: any): void {
        this.model = this.model.filter(m => m !== option);
        this.update();
        this.focusInput();
    }

    public onDeleteAll(): void {
        this.model = [];
        this.update();
        this.focusInput();
    }

    public onFocus($event: FocusEvent): void {
        this.internalFocus = this.as<InputState>().active;
        if (this.internalFocus) {
            this.$emit('focus', $event);
        }
    }

    public onKeydownDown($event: KeyboardEvent): void {
        if (this.internalOptions) {
            if (!this.open) {
                this.open = true;
            }
            this.refBaseSelect.onKeydownDown($event);
        }
    }

    public onKeydownUp($event: KeyboardEvent): void {
        if (this.internalOptions) {
            this.refBaseSelect.onKeydownUp($event);
        }
    }

    public onKeydownEnter($event: KeyboardEvent): void {
        if (this.internalOptions) {
            if (!this.open) {
                this.open = true;
            }
            if (this.refBaseSelect.focusedIndex > -1) {
                this.refBaseSelect.emitSelectItem(this.refBaseSelect.items[this.refBaseSelect.focusedIndex], this.refBaseSelect.focusedIndex, $event);
            }
        }
    }

    public onKeydownSpace($event: KeyboardEvent): void {
        if (this.internalOptions) {
            if (!this.open) {
                this.open = true;
            }
            this.refBaseSelect.onKeydownSpace($event);
        }
    }

    public update(): void {
        this.refBaseSelect.update();
    }

    public onToggleAll(): void {
        if (this.selectedItems.length >= this.options.length) {
            this.model = [];
        } else {
            this.model = [...this.internalOptions];
        }
        this.update();
    }

    public getChipLabel(item: any): string {
        const ellipsis: string = item.toString().length > this.defaultChipCharsTrunk ? '...' : '';
        return `${item.toString().substring(0, this.defaultChipCharsTrunk)}${ellipsis}`;
    }

    protected created(): void {
        if (!Array.isArray(this.value)) {
            this.$log.error('MMultiSelect - The model must be an array');
        }
    }

    protected mounted(): void {
        if (this.focus) {
            this.focusChanged(this.focus);
        }
    }

    @Watch('options', { immediate: true })
    private onOptionsChange(): void {
        if (!this.options) { return; }
        if (this.linkSelectAll) {
            this.internalOptions = ['linkSelectAll', ...this.options];
            return;
        }
        this.internalOptions = [...this.options];
    }

    @Watch('value', { immediate: true })
    private onValueChange(value: any[]): void {
        if (this.linkSelectAll && !this.value.some(v => v === this.internalOptions[0])) {
            this.internalValue = [this.internalOptions[0], ...value];
        } else {
            this.internalValue = value;
        }
    }

    @Watch('focus')
    private focusChanged(focus: boolean): void {
        this.internalFocus = focus && this.as<InputState>().active;
        if (!this.refInput) { return; }
        if (this.internalFocus) {
            this.focusInput();
        } else {
            this.refInput.blur();
        }
    }
}

const MultiSelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(MULTI_SELECT_NAME, MMultiSelect);
    }
};

export default MultiSelectPlugin;
