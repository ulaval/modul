import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { INTEGERFIELD_NAME } from '../component-names';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './integerfield.html?style=./integerfield.scss';

@WithRender
@Component({
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ],
    components: {
        MInputMask,
        MInputStyle,
        MValidationMessage
    }
})
export class MIntegerfield extends ModulVue {
    @Prop()
    public readonly value: number;

    @Prop()
    public readonly min?: number;

    @Prop()
    public readonly max?: number;

    @Prop({
        default: 16,
        validator(value: any): boolean {
            if (!(typeof value === 'number')) { return false; }
            if (!isNaN(value) && value <= 16) { return true; }
            return false;
        }
    })
    public readonly maxLength: number;

    @Prop({ default: () => `mIntegerfield-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();

    public get hasDecimalfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get isDecimalfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    public get inputMaskOptions(): InputMaskOptions {
        return {
            numeral: true,
            numeralThousandsGroupStyle: 'none',
            numeralIntegerScale: this.maxLength,
            numeralDecimalScale: 0,
            numeralDecimalMark: '',
            numeralPositiveOnly: true,
            stripLeadingZeroes: true,
            delimiter: ''
        };
    }


    @Emit('input')
    public emitInput(_value: number): void { }

    @Emit('update:value')
    public emitUpdateValue(_value: number): void { }

    @Emit('change')
    public emitChange(_event: Event): void { }

    public onChange(event: Event): void {
        this.clamp();
        this.emitChange(event);
    }

    public clamp(): void {
        let value: number = Number.parseFloat(this.model);
        if (this.min && value < this.min) {
            value = this.min;
        } else if (this.max && value > this.max) {
            value = this.max;
        }
        this.model = value.toString();
        this.emitUpdateValue(value);
    }

    public get currentLocale(): string {
        return (this as ModulVue).$i18n.currentLocale;
    }

    public get model(): string {
        return (!this.value && this.value !== 0 ? '' : this.value).toString();
    }

    public set model(value: string) {
        this.emitInput(Number.parseFloat(value));
    }

    protected created(): void {
        this.clamp();
    }
}

const IntegerfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.component(INTEGERFIELD_NAME, MIntegerfield);
    }
};

export default IntegerfieldPlugin;
