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
import { DECIMALFIELD_NAME } from '../component-names';
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
        MInputMask,
        MValidationMessage,
        MInputStyle
    }
})
export class MDecimalfield extends ModulVue {
    @Prop()
    public readonly value: number;

    @Prop({
        default: 2
    })
    public readonly rounding: number;

    @Prop({
        default: 14
    })
    public readonly precision: number;

    @Prop({ default: false })
    public readonly forceRoundingFormat: boolean;

    @Prop({ default: () => `mDecimalfield-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();
    public text: string = '';

    public get hasDecimalfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get isDecimalfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    public get inputMaskOptions(): InputMaskOptions {
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

    public get currentLocale(): string {
        return (this as ModulVue).$i18n.currentLocale;
    }

    public get model(): string {
        return this.text;
    }

    public set model(value: string) {
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
    public emitNewValue(_newValue: number): void { }
}

const DecimalfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.use(L10nPlugin);
        v.component(DECIMALFIELD_NAME, MDecimalfield);
    }
};

export default DecimalfieldPlugin;
