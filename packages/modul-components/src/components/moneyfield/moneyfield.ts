import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputMaxWidth, InputWidth } from '../../mixins/input-width/input-width';
import L10nPlugin, { MCurrency } from '../../utils/l10n/l10n';
import { ModulVue } from '../../utils/vue/vue';
import { MONEYFIELD_NAME } from '../component-names';
import { MDecimalfield } from '../decimalfield/decimalfield';
import WithRender from './moneyfield.html?style=./moneyfield.scss';


// TODO: Everything here is dispensable.  This will be all replaced by a wrapper of decimal-field.
@WithRender
@Component({
    inheritAttrs: false,
    components: {
        MDecimalfield
    },
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ]
})
export class MMoneyfield extends ModulVue {
    @Prop()
    public readonly value: number;

    @Prop({ default: InputMaxWidth.Small })
    public readonly maxWidth: string;

    @Prop({
        default: 11
    })
    public readonly precision: number;

    get currencyDetail(): MCurrency {
        return (this as ModulVue).$l10n.getCurrencyDetail(this.currentLocale);
    }

    public get currentLocale(): string {
        return (this as ModulVue).$i18n.currentLocale;
    }

    public get bindData(): any {
        return Object.assign({}, this.$props || {}, this.$attrs || {});
    }
}

const MoneyFieldPlugin: PluginObject<any> = {
    install(v): void {
        v.use(L10nPlugin);
        v.component(MONEYFIELD_NAME, MMoneyfield);
    }
};

export default MoneyFieldPlugin;
