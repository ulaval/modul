import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
import { InputStateMixin } from '../input-state/input-state';


export interface InputManagementProps {
    value: string;
    placeholder: string;
    focus: boolean;
}

export interface InputManagementData {
    internalValue: string;
}

export interface InputManagementFocusable {
    focusInput(): void;
}

@Component
export class InputManagement extends ModulVue
    implements InputManagementProps, InputManagementData, InputManagementFocusable {

    @Prop()
    @Model('input')
    public value: string;
    @Prop()
    public placeholder: string;
    @Prop()
    public autocomplete: string;
    @Prop()
    public focus: boolean;

    public trimWordWrap: boolean = false;

    public internalValue: string = '';

    public internalIsFocus: boolean = false;

    @Emit('click')
    emitClick(event: MouseEvent): void { }

    @Emit('input')
    emitInput(internalValue: string): void { }

    @Emit('focus')
    emitFocus(event: FocusEvent): void { }

    @Emit('blur')
    emitBlur(event: FocusEvent): void { }

    @Emit('keyup')
    emitKeyup(event: KeyboardEvent, model: string): void { }

    @Emit('keydown')
    emitKeydown(event: KeyboardEvent): void { }

    @Emit('change')
    emitChange(model: string): void { }

    @Emit('paste')
    emitPaste(event: ClipboardEvent): void { }

    protected mounted(): void {
        if (this.focus) {
            this.focusChanged(this.focus);
        }
    }

    focusInput(): void {
        const inputEl: HTMLElement | undefined = this.as<InputStateMixin>().getInput();
        if (!inputEl) { return; }
        inputEl.focus();
    }

    get hasValue(): boolean {
        return !!(this.model || '').toString().trim();
    }

    onClick(event: MouseEvent): void {
        this.internalIsFocus = this.as<InputStateMixin>().active;
        let inputEl: HTMLElement | undefined = this.as<InputStateMixin>().getInput();
        if (this.internalIsFocus && inputEl) {
            inputEl.focus();
        }
        this.emitClick(event);
    }

    onFocus(event: FocusEvent): void {
        this.internalIsFocus = this.as<InputStateMixin>().active;
        if (this.internalIsFocus) {
            this.emitFocus(event);
        }
    }

    onBlur(event: FocusEvent): void {
        this.internalIsFocus = false;
        this.emitBlur(event);
    }

    onKeyup(event: KeyboardEvent): void {
        if (this.as<InputStateMixin>().active) {
            this.emitKeyup(event, this.model);
        }
    }

    onKeydown(event: KeyboardEvent): void {
        if (this.as<InputStateMixin>().active) {
            this.emitKeydown(event);
        }
    }

    onChange(): void {
        this.emitChange(this.model);
    }

    onPaste(event: ClipboardEvent): void {
        this.emitPaste(event);
    }

    getTrimValue(value: string): string {
        return /\n/g.test(value) && this.trimWordWrap ? value.replace(/\n/g, '') : value;
    }

    set model(value: string) {
        this.internalValue = this.getTrimValue(value);
        this.emitInput(this.internalValue);
    }

    get model(): string {
        return this.internalValue;
    }

    get isEmpty(): boolean {
        return !this.isFocus && !this.hasValue && !Boolean(this.placeholder);
    }

    get isFocus(): boolean {
        return this.internalIsFocus;
    }

    @Watch('value', { immediate: true })
    public onValueChange(value: string): void {
        this.internalValue = this.getTrimValue(this.value || '');
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
