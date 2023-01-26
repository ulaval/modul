import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Ref, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SELECT_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MInputStyle } from '../input-style/input-style';
import { MOpacityTransition } from '../transitions/opacity-transition/opacity-transition';
import { MValidationMessage } from '../validation-message/validation-message';
import { MBaseSelect, MBaseSelectItem } from './base-select/base-select';
import WithRender from './select.html?style=./select.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        MOpacityTransition,
        MInputStyle,
        MIcon,
        MValidationMessage,
        MIconButton
    },
    mixins: [
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelect extends ModulVue {
    @Model('input')
    @Prop()
    public readonly value: string;

    @Prop({ default: [] })
    public readonly options!: MBaseSelectItem<unknown>[] | string[];

    @Prop()
    public readonly clearable: boolean;

    @Prop({ default: false })
    public readonly virtualScroll: boolean;

    @Prop()
    public readonly listMinWidth: string;

    @Prop({
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly listMaxHeight: string;

    @Prop({ default: () => uuid.generate() })
    public readonly inputAriaDescribedby: string;

    @Prop({
        default: () => `${SELECT_NAME}-${uuid.generate()}`
    })
    public readonly id: string;

    @Ref('input')
    public readonly refInput?: HTMLInputElement;

    @Ref('baseSelect')
    public readonly refBaseSelect: MBaseSelect;

    public open: boolean = false;

    @Emit('open')
    public async onOpen(): Promise<void> { }

    @Emit('close')
    public onClose(): void { }

    @Emit('select-item')
    public emitSelectItem(_option: MBaseSelectItem<unknown> | string, _index: number, _event: Event): void { }

    @Emit('change')
    public emitChange(_value: string): void { }

    public get hasItems(): boolean {
        return this.options && this.options.length > 0;
    }

    public get isEmpty(): boolean {
        return !this.as<InputManagement>().hasValue && !this.open && !Boolean(this.as<InputManagement>().placeholder);
    }

    public get displayedValue(): string {
        if (this.optionsAreStringArray || !this.hasItems) {
            return this.as<InputManagement>().internalValue;
        }
        return (this.options as MBaseSelectItem<unknown>[]).find((o) => o.value === this.as<InputManagement>().internalValue)?.label || this.as<InputManagement>().internalValue;
    }

    public get isClearable(): boolean {
        return this.clearable !== undefined ?
            this.clearable
            && this.hasItems
            && this.as<InputManagement>().hasValue
            && this.isSelectable
            : this.hasItems
            && this.as<InputManagement>().hasValue
            && this.isSelectable
            && !this.as<InputLabel>().requiredMarker;
    }

    public get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }

    public get isSelectable(): boolean {
        return !this.as<InputState>().isDisabled &&
            !this.as<InputState>().isReadonly;
    }

    public get optionsAreStringArray(): boolean {
        if (this.options.length === 0) { return false; }
        return typeof this.options[0] === 'string';
    }

    @Watch('model')
    public onModelChange(newValue: string, oldValue): void {
        if (newValue === oldValue) { return; }
        this.emitChange(newValue);
    }

    public onInputStyleClick(callbackToggle: any): void {
        callbackToggle();

        if (!this.open) { return; }
        this.focusInput();
    }

    public focusInput(): void {
        if (
            this.refInput && document.activeElement !== this.refInput
        ) {
            this.refInput.focus();
        }
    }

    public onPortalAfterClose(): void {
        this.focusInput();
    }

    public onSelect(option: MBaseSelectItem<unknown> | string, index: number, $event: Event): void {
        this.as<InputManagement>().model = this.refBaseSelect.focusValue;
        this.emitSelectItem(option, index, $event);
    }

    public onReset(): void {
        this.as<InputManagement>().model = '';
        this.refInput?.focus();
    }

    public onKeyDownDelete(event: KeyboardEvent): void {
        if (event.key === 'Delete' && this.isClearable) {
            this.onReset();
        }
    }

    public getItemLabel(item: MBaseSelectItem<unknown> | string): string {
        if (this.optionsAreStringArray) {
            return item as string;
        }
        return (item as MBaseSelectItem<unknown>).label || (item as MBaseSelectItem<unknown>).value;
    }
}

const SelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SELECT_NAME, MSelect);
    }
};

export default SelectPlugin;
