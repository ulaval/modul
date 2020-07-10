import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { RADIO_NAME } from '../component-names';
import WithRender from './radio.html?style=./radio.scss';

export enum MRadioPosition {
    Left = 'left',
    Right = 'right'
}

export enum MRadioVerticalAlignement {
    Center = 'center',
    Top = 'top'
}

export interface RadioGroup {
    name: string;
    stateIsDisabled: boolean;
    stateIsError: boolean;
    stateIsValid: boolean;
    radiosPosition: MRadioPosition;
    inline: boolean;
    radiosVerticalAlign: MRadioVerticalAlignement;
    radiosMarginTop: string;
    getValue(): string;
    updateValue(value: string): void;
}

export abstract class BaseRadioGroup extends ModulVue {
}

@WithRender
@Component({
    mixins: [InputState]
})
export class MRadio extends ModulVue {

    @Prop()
    @Model('change')
    public modelValue: string;
    @Prop()
    public value: string;
    @Prop()
    public name: string;
    @Prop({
        default: MRadioPosition.Left,
        validator: value =>
            value === MRadioPosition.Left ||
            value === MRadioPosition.Right
    })
    public radioPosition: MRadioPosition;
    @Prop()
    public disabled: boolean;
    @Prop({
        default: MRadioVerticalAlignement.Top,
        validator: value =>
            value === MRadioVerticalAlignement.Top ||
            value === MRadioVerticalAlignement.Center
    })
    public radioVerticalAlign: MRadioVerticalAlignement;
    @Prop()
    public radioMarginTop: string;
    @Prop()
    public focus: boolean;

    $refs: {
        radioInput: HTMLInputElement;
    };

    public radioID: string = uuid.generate();

    private hasFocus: boolean = false;
    private hasParentGroup: boolean | undefined = undefined;
    private parentGroup: RadioGroup;

    private internalDisabled: boolean = false;

    @Emit('change')
    private onChange(value: any): void { }

    @Emit('focus')
    private onFocus(event: Event): void {
        this.hasFocus = true;
    }

    @Emit('blur')
    private onBlur(event: Event): void {
        this.hasFocus = false;
    }

    @Watch('focus')
    private focusChanged(focus: boolean): void {
        if (focus) {
            this.$refs.radioInput.focus();
        } else {
            this.$refs.radioInput.blur();
        }
    }

    protected mounted(): void {
        if (this.focus) {
            this.focusChanged(this.focus);
        }
    }

    protected get model(): string {
        return this.isGroup() ? this.parentGroup.getValue() : this.modelValue;
    }

    protected set model(value: string) {
        if (this.isGroup()) {
            this.parentGroup.updateValue(value);
        } else {
            this.onChange(value);
        }
    }

    public get propPosition(): MRadioPosition {
        return this.isGroup() ? this.parentGroup.radiosPosition : this.radioPosition;
    }

    public get propVerticalAlign(): MRadioVerticalAlignement {
        return this.isGroup() ? this.parentGroup.radiosVerticalAlign : this.radioVerticalAlign;
    }

    public get propRadioMarginTop(): string {
        return this.isGroup() ? this.parentGroup.radiosMarginTop : this.radioMarginTop;
    }

    public get propDisabled(): boolean {
        let groupDisabled: boolean = this.isGroup() ? this.parentGroup.stateIsDisabled : false;
        return groupDisabled || this.as<InputState>().isDisabled;
    }

    public get propError(): boolean {
        let groupHasError: boolean = this.isGroup() ? this.parentGroup.stateIsError : false;
        return groupHasError || this.as<InputState>().hasError;
    }

    public get propValid(): boolean {
        let groupValid: boolean = this.isGroup() ? this.parentGroup.stateIsValid : false;
        return groupValid || this.as<InputState>().isValid;
    }

    public get propName(): string {
        return this.isGroup() ? this.parentGroup.name : this.name;
    }

    public get propInline(): boolean {
        return this.isGroup() ? this.parentGroup.inline : false;
    }

    public get propReadonly(): boolean {
        if (this.as<InputStateMixin>().readonly !== undefined) {
            return this.as<InputStateMixin>().readonly;
        } else {
            return this.isGroup() ? (this.parentGroup as any).readonly : false;
        }
    }

    public get isChecked(): boolean {
        return this.model === this.value;
    }

    public get isReadonlyUnchecked(): boolean {
        return this.propReadonly && !this.isChecked;
    }

    private isGroup(): boolean {
        if (this.hasParentGroup === undefined) {
            let parentGroup: BaseRadioGroup | undefined;
            parentGroup = this.getParent<BaseRadioGroup>(
                p => p instanceof BaseRadioGroup || // these will fail with Jest, but should pass in prod mode
                    p.$options.name === 'MRadioGroup' // these are necessary for Jest, but the first two should pass in prod mode
            );
            if (parentGroup) {
                this.parentGroup = (parentGroup as any) as RadioGroup;
                this.hasParentGroup = true;
            } else {
                this.hasParentGroup = false;
            }
        }
        return !!this.hasParentGroup;
    }
}

const RadioPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(RADIO_NAME, MRadio);
    }
};

export default RadioPlugin;
