import { PluginObject } from 'vue';
import AddressLookupPlugin, { AddressLookupPluginOptions, GoogleProxyLookupPluginOptions } from '../../utils/address-lookup/address-lookup.plugin';
import AutoCompletePlugin from '../autocomplete/autocomplete';
import { ADDRESS_AUTOCOMPLETE_FIELD_NAME, ADDRESS_LOOKUP_FIELD_NAME } from '../component-names';
import { ADDRESS_EDITOR_NAME, ADDRESS_READER as ADDRESS_READER_NAME } from './../component-names';
import MAddressAutocompleteField from './address-autocomplete-field/address-autocomplete-field';
import MAddressEditor from './address-editor/address-editor';
import { MAddressLookupField } from './address-lookup-field/address-lookup-field';
import { MAddressReader } from './address-reader/address-reader';
import PoweredByGooglePlugin from './powered-by-google/powered-by-google';

export interface AddressPluginOptions {
    loqateKey: string;
    googleKey: string;
    googleProxy: GoogleProxyLookupPluginOptions;
}

const AddressPlugin: PluginObject<any> = {
    install(v, options: AddressPluginOptions | undefined = { loqateKey: '', googleKey: '', googleProxy: {} }): void {
        v.use(AddressLookupPlugin, { loqateKey: options.loqateKey, googleKey: options.googleKey, googleProxy: options.googleProxy } as AddressLookupPluginOptions);
        v.use(AutoCompletePlugin);
        v.use(PoweredByGooglePlugin);
        v.component(ADDRESS_AUTOCOMPLETE_FIELD_NAME, MAddressAutocompleteField);
        v.component(ADDRESS_EDITOR_NAME, MAddressEditor);
        v.component(ADDRESS_LOOKUP_FIELD_NAME, MAddressLookupField);
        v.component(ADDRESS_READER_NAME, MAddressReader);
    }
};

export default AddressPlugin;
