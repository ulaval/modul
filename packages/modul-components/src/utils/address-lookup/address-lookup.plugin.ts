import axios from 'axios';
import { PluginObject } from 'vue';
import { AddressLookupService } from './address-lookup';
import AddressLookupGoogleService from './address-lookup-google-service';
import AddressLookupLoqateService from './address-lookup-loqate-service';
import AddressLookupGoogleProxyService from './address-lookup-proxy-google-service';

declare module 'vue/types/vue' {
    interface Vue {
        $addressLookup: AddressLookupService;
    }
}

export interface AddressLookupPluginOptions {
    loqateKey: string;
    googleKey: string;
    googleProxy: GoogleProxyLookupPluginOptions;
}

export type GoogleProxyLookupPluginOptions = {
    findUrl?: string,
    retrieveUrl?: string
};

const AddressLookupPlugin: PluginObject<any> = {
    install(v, options: AddressLookupPluginOptions | undefined = { loqateKey: '', googleKey: '', googleProxy: {} }): void {
        if (options.loqateKey && options.googleKey) {
            v.prototype.$log.error('The API key for Loqate Web Service OR Google Maps API must be provided');
        }

        let addressLookup: AddressLookupGoogleService | AddressLookupLoqateService | AddressLookupGoogleProxyService | undefined = undefined;
        if (options.googleKey) {
            addressLookup = new AddressLookupGoogleService(axios, options.googleKey);
        } else if (options.loqateKey) {
            addressLookup = new AddressLookupLoqateService(axios, options.loqateKey);
        } else if (options.googleProxy && options.googleProxy.findUrl && options.googleProxy.retrieveUrl) {
            addressLookup = new AddressLookupGoogleProxyService(options.googleProxy.findUrl, options.googleProxy.retrieveUrl);
        } else {
            v.prototype.$log.error(`You need to provide a Loqate Web Service, Google Maps API key or Proxies URL to Google.`);
        }

        v.prototype.$addressLookup = addressLookup;
    }
};

export default AddressLookupPlugin;
