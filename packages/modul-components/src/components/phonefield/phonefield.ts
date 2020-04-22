
import { CountryCode, getExampleNumber, ParsedNumber, parseNumber, PhoneNumber } from 'libphonenumber-js';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { FRENCH } from '../../utils/i18n/i18n';
import { SpritesService } from '../../utils/svg/sprites';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import { MSelectVirtualScroll } from '../select-virtual-scroll/select-virtual-scroll';
import { MSelectItem } from '../select/select-item/select-item';
import allCountriesEn from './assets/all-countries-en';
import allCountriesFr from './assets/all-countries-fr';
import { CustomAsYouType } from './formatter/custom-asyoutype';
import WithRender from './phonefield.html?style=./phonefield.scss';

(window as any).Cleave = (window as any).Cleave || {};
(window as any).Cleave.AsYouTypeFormatter = CustomAsYouType;

interface CountryOptions {
    name: string;
    iso2: string;
    dialCode: string;
    priority?: number;
    areaCodes?: string[];
}


export interface Country {
    iso: string;
    prefix: string;
}


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
        MSelectVirtualScroll,
        MSelectItem
    }
})
export class MPhonefield extends ModulVue {
    @Prop()
    @Model('input')
    public value: string;

    @Prop()
    public label: string;

    @Prop({
        default: () => ({
            iso: 'ca',
            prefix: '1'
        })
    })
    public country: any;

    @Prop({
        default: false
    })
    public externalSprite: boolean;

    @Prop({
        default: () => ['ca']
    })
    public priorityIsoCountries: string[];

    public $refs: {
        inputMask: MInputMask;
    };

    protected id: string = `mIntegerfield-${uuid.generate()}`;
    private examples: any = require('libphonenumber-js/examples.mobile.json');


    countryModelInternal: string = '';
    internalCountry: CountryOptions = { name: '', iso2: '', dialCode: '' };
    selectedCountries: CountryOptions[] = this.$i18n.currentLang() === FRENCH ? allCountriesFr : allCountriesEn;
    countries: CountryOptions[] = this.selectedCountries.sort((a, b) => (this.nameNormalize(a.name) > this.nameNormalize(b.name)) ? 1 : ((this.nameNormalize(b.name) > this.nameNormalize(a.name)) ? -1 : 0));
    internalFocus: boolean = false;

    i18nInternalLabel: string = this.$i18n.translate('m-phonefield:phone-label');
    i18nCountryLabel: string = this.$i18n.translate('m-phonefield:country-label');
    i18nExample: string = this.$i18n.translate('m-phonefield:example');

    beforeMount(): void {
        // sprites-flags.svg is a very big file, this is why sprites should only be added to the DOM before this component is mounted.
        const sprites: string = require('../../assets/icons/sprites-flags.svg');
        const svg: SpritesService = this.$svg;
        if (this.externalSprite) {
            if (!svg.isInExternalSprites('mflag')) {
                svg.addExternalSprites(sprites, 'mflag');
            }
        } else {
            if (!document.getElementById('mflag-svg__flag-ae')) {
                svg.addInternalSprites(sprites);
            }
        }
    }

    @Emit('input')
    emitNewValue(_newValue: string): void { }

    @Emit('update:country')
    emitContrySelected(country: Country): void { }

    get isoCountries(): string[] {
        return this.countriesSorted.map(contry => contry.iso2);
    }

    get countriesSorted(): CountryOptions[] {

        let finalCountriesList: CountryOptions[] = [];

        this.priorityIsoCountries.forEach((isoPriorityCountry: string) => {
            const currentCountry: CountryOptions | undefined = this.countries.find((isoCountry: CountryOptions) => isoCountry.iso2 === isoPriorityCountry);
            if (currentCountry) {
                finalCountriesList.push(currentCountry);
            }
        });

        if (this.priorityIsoCountries.length > 0) {
            finalCountriesList.push({ name: '', iso2: '', dialCode: '' });
        }

        this.countries.filter((country: CountryOptions) => {
            if (!this.priorityIsoCountries.includes(country.iso2)) {
                finalCountriesList.push(country);
            }
        });

        return finalCountriesList;
    }

    get propLabel(): string {
        return this.label ? this.label : this.i18nInternalLabel;
    }

    get hasPhonefieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    get isPhonefieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    get inputMaskOptions(): InputMaskOptions {
        return {
            phone: true,
            phoneRegionCode: this.phoneRegionCode
        };
    }

    get phoneRegionCode(): string {
        return this.internalCountry ? this.internalCountry.iso2.toUpperCase() : '';
    }

    get prefix(): string {
        return '+' + this.internalCountry.dialCode;
    }

    get maxLengthCurentPhone(): number {
        return this.example.length;
    }

    get example(): string {
        const phoneNumber: PhoneNumber | undefined = getExampleNumber(this.phoneRegionCode as CountryCode, this.examples);
        return phoneNumber ? phoneNumber.formatInternational() : '';
    }

    get countryModel(): string {
        return this.countryModelInternal;
    }

    set countryModel(value: string) {
        this.internalCountry = this.countries.find((country: CountryOptions) => country.iso2 === value)!;
        this.as<InputManagement>().internalValue = '+' + this.internalCountry.dialCode;
        this.countryModelInternal = value;
    }

    inputChanged(value): void {
        this.emitNewValue(value);
    }

    parsePhoneNumber(value: string): void {
        const parsedNumber: ParsedNumber = parseNumber(value, { extended: true }) as ParsedNumber;
        if (parsedNumber.country && parsedNumber.valid) {
            this.countryModelInternal = parsedNumber.country.toLowerCase();
            this.internalCountry = this.countries.find((country: CountryOptions) => country.iso2 === this.countryModelInternal)!;
            this.emitContrySelected({
                iso: this.internalCountry.iso2,
                prefix: this.internalCountry.dialCode
            });
        }
    }

    nameNormalize(name: string): string {
        return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    spriteId(iso: string): string | undefined {
        const svg: SpritesService = this.$svg;
        const spriteId: string = 'mflag-svg__flag-' + iso;

        if (document.getElementById(spriteId)) {
            return '#' + spriteId;
        } else if (svg && svg.getExternalSpritesFromSpriteId(spriteId)) {
            return svg.getExternalSpritesFromSpriteId(spriteId);
        } else if (iso) {
            this.$log.warn('"' + iso + '" is not a valid iso country. Make sure that the sprite has been loaded via the $svg instance service.');
        }
    }

    onContryChanged(countryIso: any): void {
        this.countryModel = Array.isArray(countryIso) ? countryIso[0] : countryIso;
        this.emitContrySelected({
            iso: this.internalCountry.iso2,
            prefix: this.internalCountry.dialCode
        });
    }

    onSelectFocus(): void {
        this.internalFocus = true;
    }

    onSelectBlur(): void {
        this.internalFocus = false;
        this.focusInput();
    }

    public async focusInput(): Promise<any> {
        await this.$nextTick();
        this.$refs.inputMask.focus();
    }

    @Watch('country', { immediate: true })
    onContryChange(country: Country): void {
        this.countryModelInternal = country.iso;
        this.internalCountry = this.countries.find((country: CountryOptions) => country.iso2 === this.countryModelInternal)!;
        if (!this.as<InputManagement>().internalValue) {
            this.as<InputManagement>().internalValue = '+' + this.internalCountry.dialCode;
        }

    }

    @Watch('value', { immediate: true })
    onValueChanged(value: string): void {
        if (value) {
            this.parsePhoneNumber(value);
        }
    }

}
