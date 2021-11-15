import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Mixins, Model, Prop, Ref } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import uuid from '../../utils/uuid/uuid';
import { SELECT_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
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
        MI18n,
        MIconButton
    },
})
export class MSelect extends Mixins(InputState, MediaQueries, InputManagement, InputWidth, InputLabel) {

    @Model('input')
    @Prop()
    public readonly value: string;

    @Prop()
    public readonly options: MBaseSelectItem<unknown>[] | string[];

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

    @Prop({ default: uuid.generate() })
    public inputAriaDescribedby: string;

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
    public async onOpen(): Promise<void> {
        await this.$nextTick();
        this.refBaseSelect.focusFirstSelected();
    }

    @Emit('close')
    public onClose(): void { }

    public emitSelectItem(option: MBaseSelectItem<unknown> | string, index: number, event: Event): void {
        this.$emit('select-item', option, index, event)
    }

    public get hasItems(): boolean {
        return this.options && this.options.length > 0;
    }

    public get isEmpty(): boolean {
        return this.hasValue || (this.open) ? false : true;
    }

    public get isClearable(): boolean {
        return this.clearable !== undefined ? this.clearable && this.hasItems && this.hasValue && this.isSelectable : this.hasItems && this.hasValue && this.isSelectable && !this.requiredMarker;
    }

    public get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }

    public get isSelectable(): boolean {
        return !this.isDisabled &&
            !this.isReadonly;
    }

    public get internalLabelUp(): boolean {
        return !this.isReadonly ? this.labelUp : true;
    }

    public get internalPlaceholder(): string {
        return !this.isReadonly ? this.placeholder : '';
    }

    public get optionsAreStringArray(): boolean {
        if (this.options.length === 0) return false;
        return typeof this.options[0] === 'string';
    }

    public onInputStyleClick(callbackToggle: any): void {
        callbackToggle();

        if (!this.open) return
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
        this.emitSelectItem(option, index, $event);
        this.model = this.refBaseSelect.focusValue;
    }

    public onReset(): void {
        this.model = '';
        this.refInput?.focus();
    }

    public onKeyDownDelete(event: KeyboardEvent): void {
        if (event.key === 'Delete' && this.isClearable) {
            this.onReset();
        }
    }
}

const SelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SELECT_NAME, MSelect);
    }
};

export default SelectPlugin;
