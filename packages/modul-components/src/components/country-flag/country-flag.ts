import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
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

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Emit('keydown')
    public emitKeydown(event: KeyboardEvent): void { }

    @Emit('mouseover')
    public emitMouseOver(event: MouseEvent): void { }

    @Emit('mouseleave')
    public emitMouseLeave(event: MouseEvent): void { }

    public get svg(): string {
        try {
            return this.codeIso2 ? require(`./assets/svg/${this.codeIso2}.svg`) : '';
        } catch (e) {
            this.$log.warn(`The file ${e} could not be loaded.`);
            return '';
        }
    }
}

const MCountryFlagPlugin: PluginObject<any> = {
    install(v): void {
        v.component(COUNTRY_FLAG_NAME, MCountryFlag);
    }
};

export default MCountryFlagPlugin;
