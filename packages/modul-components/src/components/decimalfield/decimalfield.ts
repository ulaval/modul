import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import L10nPlugin, { MDecimalFormat } from '../../utils/l10n/l10n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { DECIMALFIELD_NAME, INPUT_MASK_NAME, INPUT_STYLE_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './decimalfield.html?style=./decimalfield.scss';

@WithRender
@Component({
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ],
    components: {
        [INPUT_MASK_NAME]: MInputMask,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [INPUT_STYLE_NAME]: MInputStyle
    }
})
export class MDecimalfield extends ModulVue {
    @Prop()
    public value: number;

    @Prop({
        default: 2
    })
    public rounding: number;

    @Prop({
        default: 14
    })
    public precision: number;

    @Prop({ default: false })
    public forceRoundingFormat: boolean;

    protected id: string = `mDecimalfield-${uuid.generate()}`;
    private text: string = '';

    private get hasDecimalfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    private get isDecimalfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    private get inputMaskOptions(): InputMaskOptions {
        const decimalFormat: MDecimalFormat = this.$l10n.getDecimalFormat(this.currentLocale);
        return {
            numeral: true,
            numeralThousandsGroupStyle: 'thousand',
            numeralIntegerScale: this.precision - this.rounding,
            numeralDecimalScale: this.rounding,
            numeralDecimalMark: decimalFormat.decimalMark,
            numeralPositiveOnly: true,
            stripLeadingZeroes: true,
            delimiter: decimalFormat.thousandSeparator,
            removeTrailingDecimalMark: true,
            forceDecimalScale: this.forceRoundingFormat
        };
    }

    get currentLocale(): string {
        return (this as ModulVue).$i18n.currentLocale;
    }

    private get model(): string {
        return this.text;
    }

    private set model(value: string) {
        this.text = value;
        const valueAsNumber: number = Number.parseFloat(value);
        this.emitNewValue(valueAsNumber);
    }

    @Watch('value', { immediate: true })
    public onValueChange(newValue: number): void {
        const currentTextAsNumber: number = Number.parseFloat(this.text);
        if (newValue !== currentTextAsNumber) {
            this.text = (!newValue && newValue !== 0 ? '' : newValue).toString();
        }
    }

    @Emit('input')
    emitNewValue(_newValue: number): void { }
}

const DecimalfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.use(L10nPlugin);
        v.component(DECIMALFIELD_NAME, MDecimalfield);
    }
};

export default DecimalfieldPlugin;
