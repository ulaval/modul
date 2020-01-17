import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Address, AddressSummary } from '../../../utils/address-lookup/address';
import { AddressLookupServiceProvider } from '../../../utils/address-lookup/address-lookup';
import { ModulVue } from '../../../utils/vue/vue';
import WithRender from './address-lookup-field.html?style=./address-lookup-field.scss';

const KEY_ADDRESS_TYPE: string = 'address';

export interface AddressLookupFieldProps {
    origin: string | undefined;
    language: string | undefined;
    label?: string;
    placeholder?: string;
}
@WithRender
@Component
export class MAddressLookupField extends ModulVue {
    @Prop()
    value: Address;

    // IP address, ISO2 or ISO3 country code for origin
    @Prop()
    origin: string | undefined;

    // Prefered language for results 2 or 4 chars fr, en, fr-ca, fr-fr, etc.
    @Prop()
    language: string | undefined;

    @Prop()
    errorMessage: string;

    @Prop()
    label?: string;

    @Prop()
    placeholder?: string;

    selection: string = '';
    open: boolean = false;
    results: AddressSummary[] = [];

    @Watch('value', { deep: true, immediate: true })
    private clearValue(): void {
        if (!this.value) {
            this.selection = '';
        }
    }

    async onComplete(value: string): Promise<void> {
        this.fetchData(value);
    }

    async onSelect(id: string): Promise<void> {
        const currentAddress: AddressSummary | undefined = this.results.find((result: AddressSummary) => result.value === id);
        if (currentAddress) {
            if (currentAddress.type !== KEY_ADDRESS_TYPE) {
                this.open = false;
                await this.fetchData(currentAddress.queryInput, id);
                this.open = true;
            } else {
                this.open = false;
            }
            if (currentAddress.type === KEY_ADDRESS_TYPE && this.selection === currentAddress.value) {
                const results: Address[] = await this.$addressLookup.retrieve({ id: currentAddress.value });
                if (results.length > 0) {
                    this.emitSelection(results[0]);
                }
            }
        }
    }

    get i18nSearch(): string {
        return this.label || this.$i18n.translate('m-address-lookup-field:search-field');
    }

    get i18nPlaceholder(): string {
        return this.placeholder || this.$i18n.translate('m-address-lookup-field:placeholder');
    }

    getClassToggles(address: AddressSummary): { [className: string]: boolean } {
        return {
            'm-address-lookup-field__item-address': address.type === KEY_ADDRESS_TYPE || address.type === undefined,
            'm-address-lookup-field__item-expandable': address.type !== KEY_ADDRESS_TYPE
        };
    }

    @Emit('address-retrieved')
    @Emit('input')
    private emitSelection(_currentAddress: Address): void {
    }

    get googleIsUsed(): boolean {
        return this.$addressLookup.serviceProvider === AddressLookupServiceProvider.Google ||
            this.$addressLookup.serviceProvider === AddressLookupServiceProvider.GoogleProxy;
    }

    private async fetchData(value: string, id?: string): Promise<void> {
        this.results = await this.$addressLookup.find({
            input: value,
            id,
            origin: this.origin,
            language: this.language
        });
    }
}

