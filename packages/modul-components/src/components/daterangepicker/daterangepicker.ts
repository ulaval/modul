import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState } from '../../mixins/input-state/input-state';
import { InputMaxWidth, InputWidth } from '../../mixins/input-width/input-width';
import { ModulVue } from '../../utils/vue/vue';
import { DATEPICKER_NAME, DATERANGEPICKER_NAME, PERIODPICKER_NAME } from '../component-names';
import { DatePickerSupportedTypes, MDatepicker } from '../datepicker/datepicker';
import { MDateRange, MPeriodpicker, MPeriodpickerProps } from '../periodpicker/periodpicker';
import WithRender from './daterangepicker.html';

@WithRender
@Component({
    components: {
        [DATEPICKER_NAME]: MDatepicker,
        [PERIODPICKER_NAME]: MPeriodpicker
    },
    mixins: [
        InputLabel,
        InputState,
        InputWidth
    ]
})
export class MDaterangepicker extends ModulVue {
    @Prop()
    value: MDateRange;

    @Prop()
    min: DatePickerSupportedTypes;

    @Prop()
    max: DatePickerSupportedTypes;

    @Prop({
        default: () => Vue.prototype.$i18n.translate('m-daterangepicker:label.from')
    })
    labelFrom: string;

    @Prop({
        default: () => Vue.prototype.$i18n.translate('m-daterangepicker:label.to')
    })
    labelTo: string;

    @Prop({
        default: true
    })
    convertToIso: boolean;

    @Prop({ default: InputMaxWidth.Small })
    public maxWidth: string;

    @Prop({ default: false })
    public hideInternalErrorMessage: boolean;

    @Prop({ default: false })
    public skipInputValidation: boolean;

    get periodPickerProps(): MPeriodpickerProps {
        return { value: this.value, min: this.min, max: this.max };
    }

    @Emit('input')
    updateValue(newValue: MDateRange): MDateRange {
        return newValue;
    }
}

const DaterangepickerPlugin: PluginObject<any> = {
    install(v): void {
        v.component(DATERANGEPICKER_NAME, MDaterangepicker);
    }
};

export default DaterangepickerPlugin;
