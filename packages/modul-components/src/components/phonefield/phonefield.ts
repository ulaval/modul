import { CountryCode, getExampleNumber, ParsedNumber, parseNumber, PhoneNumber } from 'libphonenumber-js';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Ref, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputMaxWidth, InputMaxWidthValues, InputWidth } from '../../mixins/input-width/input-width';
import { allCountriesOptionsEn } from '../../utils/country/countries-options-en';
import { allCountriesOptionsFr } from '../../utils/country/countries-options-fr';
import { MCountry, MCountryCodeISO2, MCountryOptions } from '../../utils/country/country';
import { FRENCH } from '../../utils/i18n/i18n';
import { SpritesService } from '../../utils/svg/sprites';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import { MInputStyle } from '../input-style/input-style';
import { MSelectVirtualScroll } from '../select-virtual-scroll/select-virtual-scroll';
import { MSelectItem } from '../select/select-item/select-item';
import { MValidationMessage } from '../validation-message/validation-message';
import { CustomAsYouType } from './formatter/custom-asyoutype';
import WithRender from './phonefield.html?style=./phonefield.scss';

(window as any).Cleave = (window as any).Cleave || {};
(window as any).Cleave.AsYouTypeFormatter = CustomAsYouType;

@WithRender
@Component({
    modul: {
        i18n: {
            'fr': require('./phonefield.lang.fr.json'),
            'en': require('./phonefield.lang.en.json')
        }
    },
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ],
    components: {
        MInputStyle,
        MInputMask,
        MSelectVirtualScroll,
        MSelectItem,
        MValidationMessage
    }
})
export class MPhonefield extends ModulVue {
    @Prop()
    @Model('input')
    public readonly value: string;

    @Prop()
    public readonly label: string;

    @Prop({
        default: () => ({
            iso: MCountryCodeISO2.Canada,
            prefix: '1'
        })
    })
    public readonly country: MCountry;

    @Prop({
        default: () => [MCountryCodeISO2.Canada]
    })
    public readonly priorityIsoCountries: MCountryCodeISO2[];

    @Prop({
        default: false
    })
    public readonly externalSprite: boolean;

    @Prop({ default: () => `mPhonefield-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();
    public readonly valueDropdownCountryId: string = uuid.generate();

    @Ref('inputMask')
    public refInputMask: MInputMask;

    @Ref('inputSelect')
    public refInputSelect: HTMLElement;

    public $refs: {
        inputMask: MInputMask;
    };

    private examples: any = require('libphonenumber-js/examples.mobile.json');

    public countryModelInternal: MCountryCodeISO2 = MCountryCodeISO2.Empty;
    public internalCountry: MCountryOptions = { name: '', iso2: MCountryCodeISO2.Empty, dialCode: '' };
    public selectedCountries: MCountryOptions[] = this.$i18n.currentLang() === FRENCH ? allCountriesOptionsFr : allCountriesOptionsEn;
    public countries: MCountryOptions[] = this.selectedCountries.sort((a, b) => (this.nameNormalize(a.name) > this.nameNormalize(b.name)) ? 1 : ((this.nameNormalize(b.name) > this.nameNormalize(a.name)) ? -1 : 0));

    public i18nInternalLabel: string = this.$i18n.translate('m-phonefield:phone-label');
    public i18nCountryLabel: string = this.$i18n.translate('m-phonefield:country-label');
    public i18nExample: string = this.$i18n.translate('m-phonefield:example');

    public internalSpriteId: string;


    protected beforeMount(): void {
        // sprites-flags.svg is a very big file, this is why sprites should only be added to the DOM before this component is mounted.
        const sprites: string = require('../../assets/icons/sprites-flags.svg');
        const svg: SpritesService = this.$svg;
        if (this.externalSprite) {
            if (!svg.isInExternalSprites('mflag')) {
                svg.addExternalSprites(sprites, 'mflag');
            }
        } else {
            this.internalSpriteId = svg.addInternalSprites(sprites);
        }
    }

    destroyed(): void {
        if (this.internalSpriteId) {
            this.$svg.removeInternalSprite(this.internalSpriteId);
        }
    }

    @Emit('input')
    public emitNewValue(_newValue: string): void { }

    @Emit('update:country')
    public emitContrySelected(country: MCountry): void { }

    @Watch('country', { immediate: true })
    public onContryChange(country: MCountry): void {
        if (country.iso) {
            this.countryModelInternal = country.iso;
            this.internalCountry = this.countries.find((country: MCountryOptions) => country.iso2 === this.countryModelInternal)!;
            if (!this.as<InputManagement>().internalValue) {
                this.as<InputManagement>().internalValue = '+' + this.internalCountry.dialCode;
            }
        }
    }

    @Watch('value', { immediate: true })
    public onValueChanged(value: string): void {
        if (value) {
            this.parsePhoneNumber(value);
        }
    }

    public spriteId(iso: string): string | undefined {
        const svg: SpritesService = this.$svg;
        const spriteId: string = `mflag-svg__flag-${iso}`;

        if (document.getElementById(spriteId)) {
            return `#${spriteId}`;
        } else if (svg && svg.getExternalSpritesFromSpriteId(spriteId)) {
            return svg.getExternalSpritesFromSpriteId(spriteId);
        } else if (iso) {
            this.$log.warn(`"${iso}" is not a valid iso country. Make sure that the sprite has been loaded via the $svg instance service.`);
        }
    }

    public onKeydownTab(callbackTab: Function, event: KeyboardEvent): void {
        callbackTab();
        this.focusInput();
    }

    public isLastPriorityIsoCountrie(iso: MCountryCodeISO2): boolean {
        return this.priorityIsoCountries[this.priorityIsoCountries.length - 1] === iso;
    }

    public get isoCountries(): string[] {
        return this.countriesSorted.map(contry => contry.iso2);
    }

    public get listMinWidth(): string {
        switch (this.as<InputWidth>().maxWidth) {
            case InputMaxWidth.Medium:
            case InputMaxWidth.Large:
                return InputMaxWidthValues.Medium;
            case InputMaxWidth.None:
            case InputMaxWidth.XSmall:
            case InputMaxWidth.Small:
            case InputMaxWidth.Regular:
                return InputMaxWidthValues.Regular;
            default:
                return this.as<InputWidth>().maxWidth;
        }
    }

    public get countriesSorted(): MCountryOptions[] {

        let finalCountriesList: MCountryOptions[] = [];

        this.priorityIsoCountries.forEach((isoPriorityCountry: string) => {
            const currentCountry: MCountryOptions | undefined = this.countries.find((isoCountry: MCountryOptions) => isoCountry.iso2 === isoPriorityCountry);
            if (currentCountry) {
                finalCountriesList.push(currentCountry);
            }
        });

        this.countries.filter((country: MCountryOptions) => {
            if (!this.priorityIsoCountries.includes(country.iso2)) {
                finalCountriesList.push(country);
            }
        });

        return finalCountriesList;
    }

    public get propLabel(): string {
        return this.label ? this.label : this.i18nInternalLabel;
    }

    public get hasPhonefieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get isPhonefieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    public get inputMaskOptions(): InputMaskOptions {
        return {
            phone: true,
            phoneRegionCode: this.phoneRegionCode,
            prefix: this.prefix
        };
    }

    public get phoneRegionCode(): string {
        return this.internalCountry ? this.internalCountry.iso2.toUpperCase() : '';
    }

    public get prefix(): string {
        return '+' + this.internalCountry.dialCode;
    }

    public get example(): string {
        const phoneNumber: PhoneNumber | undefined = getExampleNumber(this.phoneRegionCode as CountryCode, this.examples);
        return phoneNumber ? phoneNumber.formatInternational() : '';
    }

    public get countryModel(): MCountryCodeISO2 {
        return this.countryModelInternal;
    }

    public set countryModel(value: MCountryCodeISO2) {
        this.internalCountry = this.countries.find((country: MCountryOptions) => country.iso2 === value)!;
        this.as<InputManagement>().internalValue = '+' + this.internalCountry.dialCode;
        this.countryModelInternal = value;
    }

    public inputChanged(value): void {
        this.emitNewValue(value);
    }

    public parsePhoneNumber(value: string): void {
        const parsedNumber: ParsedNumber = parseNumber(value, { extended: true }) as ParsedNumber;
        if (parsedNumber.country && parsedNumber.valid) {
            this.countryModelInternal = parsedNumber.country.toLowerCase() as MCountryCodeISO2;
            this.internalCountry = this.countries.find((country: MCountryOptions) => country.iso2 === this.countryModelInternal)!;
            this.emitContrySelected({
                iso: this.internalCountry.iso2,
                prefix: this.internalCountry.dialCode
            });
        }
    }

    public nameNormalize(name: string): string {
        return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    public onContryChanged(countryIso: any, _index: number, _$event: Event): void {
        this.countryModel = countryIso;
        this.emitContrySelected({
            iso: this.internalCountry.iso2,
            prefix: this.internalCountry.dialCode
        });
    }

    public async focusInputSelect(): Promise<void> {
        await this.$nextTick();
        if (!this.refInputSelect) return;
        this.refInputSelect.focus();
    }

    public async focusInput(): Promise<void> {
        await this.$nextTick();
        if (!this.refInputMask) return;
        this.refInputMask.focus();
    }
}

export { MCountry as Country, MCountryCodeISO2, MCountryOptions } from '../../utils/country/country';

