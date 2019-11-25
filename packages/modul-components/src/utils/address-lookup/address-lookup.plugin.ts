import axios from 'axios';
import { PluginObject } from 'vue';
import { AddressLookupService } from './address-lookup';
import AddressLookupGoogleService from './address-lookup-google-service';
import AddressLookupLoqateService from './address-lookup-loqate-service';
import { AutocompletePredictionResponse, PlaceResultResponse } from './address-lookup-proxy-google';
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
    findPromise: (params: { input: string, sessionToken: string }) => Promise<AutocompletePredictionResponse>,
    retrievePromise: (params: { placeId: string, sessionToken: string }) => Promise<PlaceResultResponse>
    findErrorCallback: (error: ErrorEvent) => void;
    retrieveErrorCallback: (error: ErrorEvent) => void;
};

const AddressLookupPlugin: PluginObject<any> = {
    install(v, options: AddressLookupPluginOptions | undefined = { loqateKey: '', googleKey: '', googleProxy: {} as GoogleProxyLookupPluginOptions }): void {
        if (options.loqateKey && options.googleKey) {
            v.prototype.$log.error('The API key for Loqate Web Service OR Google Maps API must be provided');
        }

        let addressLookup: AddressLookupGoogleService | AddressLookupLoqateService | AddressLookupGoogleProxyService | undefined = undefined;
        if (options.googleKey) {
            addressLookup = new AddressLookupGoogleService(axios, options.googleKey);
        } else if (options.loqateKey) {
            addressLookup = new AddressLookupLoqateService(axios, options.loqateKey);
        } else if (!(Object.keys(options.googleProxy).length === 0 && options.googleProxy.constructor === Object)) {
            addressLookup = new AddressLookupGoogleProxyService(options.googleProxy.findPromise, options.googleProxy.retrievePromise, options.googleProxy.findErrorCallback, options.googleProxy.retrieveErrorCallback);
        } else {
            v.prototype.$log.error(`You need to provide a Loqate Web Service, Google Maps API key or Proxies URL to Google.`);
        }

        v.prototype.$addressLookup = addressLookup;
    }
};

export default AddressLookupPlugin;
