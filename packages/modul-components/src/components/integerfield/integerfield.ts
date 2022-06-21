import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { INPUT_STYLE_NAME, INTEGERFIELD_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
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
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    }
})
export class MIntegerfield extends ModulVue {
    @Prop()
    public readonly value: number;

    @Prop({
        default: 16,
        validator(value: any): boolean {
            if (!(typeof value === 'number')) {
                return false;
            }

            if (!isNaN(value) && value <= 16) {
                return true;
            }

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

    public get currentLocale(): string {
        return (this as ModulVue).$i18n.currentLocale;
    }

    public get model(): string {
        return (!this.value && this.value !== 0 ? '' : this.value).toString();
    }

    public set model(value: string) {
        const valueAsNumber: number = Number.parseFloat(value);
        this.emitNewValue(valueAsNumber);
    }

    @Emit('input')
    public emitNewValue(_newValue: number): void { }
}

const IntegerfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.component(INTEGERFIELD_NAME, MIntegerfield);
    }
};

export default IntegerfieldPlugin;
