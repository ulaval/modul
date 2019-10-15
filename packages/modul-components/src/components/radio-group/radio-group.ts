import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputState, InputStateInputSelector } from '../../mixins/input-state/input-state';
import uuid from '../../utils/uuid/uuid';
import { RADIO_GROUP_NAME } from '../component-names';
import InputGroupPlugin from '../input-group/input-group';
import RadioPlugin, { BaseRadioGroup, MRadio, MRadioPosition, MRadioVerticalAlignement, RadioGroup } from '../radio/radio';
import WithRender from './radio-group.html?style=./radio-group.scss';

@WithRender
@Component({
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

    public name: string = uuid.generate();
    private internalValue: any | undefined = '';
    private internalIsFocus: boolean = false;

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
        if (!this.internalIsFocus) {
            this.internalIsFocus = true;
            this.emitFocus(event);
        }
    }

    public onBlur(event: FocusEvent): void {
        this.emitBlur(event);
    }

    @Watch('value')
    private onValueChange(value: any): void {
        this.internalValue = value;
    }

    @Watch('focus')
    private focusChanged(focus: boolean): void {
        const selector: string = this.as<InputStateInputSelector>().selector || 'input, textarea, [contenteditable=true]';
        const elements: NodeListOf<Element> = this.$el.querySelectorAll(selector);
        let inputEl: HTMLElement | undefined;

        // Find right element to focus
        if (elements.length > 1) {
            elements.forEach((radio) => {
                if ((radio as unknown as MRadio).value === this.value) {
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
        v.use(InputGroupPlugin);
        v.component(RADIO_GROUP_NAME, MRadioGroup);
    }
};

export default RadioGroupPlugin;
