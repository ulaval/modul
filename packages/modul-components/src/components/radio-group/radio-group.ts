import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import uuid from '../../utils/uuid/uuid';
import { INPUT_GROUP_NAME, RADIO_GROUP_NAME } from '../component-names';
import { MInputGroup, MMInputGroupValidationMessagePosition } from '../input-group/input-group';
import RadioPlugin, { BaseRadioGroup, MRadioPosition, MRadioVerticalAlignement, RadioGroup } from '../radio/radio';
import WithRender from './radio-group.html?style=./radio-group.scss';

const FOCUS_OUT_TIMEOUT_MS: number = 200;

@WithRender
@Component({
    components: {
        [INPUT_GROUP_NAME]: MInputGroup
    },
    mixins: [InputState]
})
export class MRadioGroup extends BaseRadioGroup implements RadioGroup {
    @Model('change')
    @Prop()
    public value: any;

    @Prop({
        default: MRadioPosition.Left,
        validator: value =>
            value === MRadioPosition.Left ||
            value === MRadioPosition.Right
    })
    public radiosPosition: MRadioPosition;

    @Prop()
    public inline: boolean;

    @Prop()
    public label: string;

    @Prop()
    public requiredMarker: boolean;

    @Prop({
        default: MRadioVerticalAlignement.Top,
        validator: value =>
            value === MRadioVerticalAlignement.Top ||
            value === MRadioVerticalAlignement.Center
    })
    public radiosVerticalAlign: MRadioVerticalAlignement;

    @Prop()
    public radiosMarginTop: string;

    @Prop()
    public focus: boolean;

    @Prop({
        default: MMInputGroupValidationMessagePosition.Top,
        validator: value =>
            value === MMInputGroupValidationMessagePosition.Top ||
            value === MMInputGroupValidationMessagePosition.Bottom
    })
    public validationMessagePosition: MMInputGroupValidationMessagePosition;

    @Prop()
    public validationMessageId?: string;

    public name: string = uuid.generate();
    private internalValue: any | undefined = '';
    private internalIsFocus: boolean = false;
    private internalIsBlur: boolean = false;
    private hasFocusInTimeout: any;

    @Emit('change')
    private onChange(value: any): void { }

    @Emit('focus')
    private emitFocus(event: FocusEvent): void { }

    @Emit('blur')
    private emitBlur(event: FocusEvent): void { }

    protected created(): void {
        this.internalValue = undefined;
    }

    protected mounted(): void {
        if (this.focus) {
            this.focusChanged(this.focus);
        }
    }

    public get stateIsDisabled(): boolean {
        return this.as<InputState>().isDisabled;
    }

    public get stateIsError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get stateIsValid(): boolean {
        return this.as<InputState>().isValid;
    }

    public get idLabel(): string | undefined {
        return this.hasLabel ? uuid.generate() : undefined;
    }

    public getValue(): any {
        return this.model;
    }

    public updateValue(value: any): void {
        this.model = value;
    }

    public onFocus(event: FocusEvent): void {
        clearTimeout(this.hasFocusInTimeout);
        if (!this.internalIsBlur) {
            this.emitFocus(event);
        }
        this.internalIsFocus = true;
    }

    public onBlur(event: FocusEvent): void {
        this.internalIsFocus = false;
        this.internalIsBlur = true;
        this.hasFocusInTimeout = setTimeout(() => {
            if (!this.internalIsFocus) {
                this.emitBlur(event);
            }
            this.internalIsBlur = false;
        }, FOCUS_OUT_TIMEOUT_MS);
    }

    @Watch('value')
    private onValueChange(value: any): void {
        this.internalValue = value;
    }

    @Watch('focus')
    private focusChanged(focus: boolean): void {
        const elements: NodeListOf<Element> = this.$el.querySelectorAll('input');
        let inputEl: HTMLElement | undefined;

        // Find right element to focus
        if (elements.length > 1) {
            elements.forEach((radio: Element) => {
                if ((radio as HTMLInputElement).value === this.value) {
                    inputEl = radio as HTMLElement;
                }
            });
            if (inputEl === undefined) {
                inputEl = elements[0] as HTMLElement;
            }
        } else {
            inputEl = elements[0] as HTMLElement;
        }

        // Focus on the element
        if (inputEl) {
            if (focus) {
                inputEl.focus();
            } else {
                inputEl.blur();
            }
        }
    }

    private get model(): any {
        return this.value === undefined ? this.internalValue : this.value;
    }

    private set model(value: any) {
        this.internalValue = value;
        this.onChange(value);
    }

    private get hasLabel(): boolean {
        return !!this.label;
    }

    private get idValidationMessage(): string | undefined {
        return this.as<InputState>().errorMessage || this.as<InputState>().validMessage || this.as<InputState>().helperMessage ? uuid.generate() : undefined;
    }
}

const RadioGroupPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(RadioPlugin);
        v.component(RADIO_GROUP_NAME, MRadioGroup);
    }
};

export default RadioGroupPlugin;
