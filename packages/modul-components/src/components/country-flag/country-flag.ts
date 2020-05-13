import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { MCountryCodeISO2 } from '../../utils/country/country';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { COUNTRY_FLAG_NAME } from '../component-names';
import { MSvg } from '../svg/svg';
import WithRender from './country-flag.html';

@WithRender
@Component({
    components: {
        MSvg
    }
})
export class MCountryFlag extends ModulVue {
    @Prop({
        default: MCountryCodeISO2.Canada,
        validator: value => Enums.toValueArray(MCountryCodeISO2).indexOf(value) !== -1
    })
    public readonly codeIso2: string;

    @Prop({
        default: '1em',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly width: string;

    @Prop({
        default: '1em',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly height: string;

    public get svg(): string {
        return this.codeIso2 ? require(`./assets/svg/${this.codeIso2}.svg`) : '';
    }
}

const MCountryFlagPlugin: PluginObject<any> = {
    install(v): void {
        v.component(COUNTRY_FLAG_NAME, MCountryFlag);
    }
};

export default MCountryFlagPlugin;
