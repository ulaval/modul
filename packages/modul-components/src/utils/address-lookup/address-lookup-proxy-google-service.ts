import uuid from '../uuid/uuid';
import { Address, AddressSummary } from './address';
import { AddressLookupFindQuery, AddressLookupRetrieveQuery, AddressLookupService, AddressLookupServiceProvider } from './address-lookup';
import { GoogleFindResponseBuilder, GoogleRetrieveResponseBuilder } from './address-lookup-google';
import { AutocompletePredictionResponse, PlaceResultResponse } from './address-lookup-proxy-google';
import { AddressLookupToAddressSummary, AddressRetrieveToAddress } from './address-lookup-response-mapper';

export default class AddressLookupGoogleProxyService implements AddressLookupService {
    serviceProvider = AddressLookupServiceProvider.GoogleProxy;
    private sessionToken?: string;

    /**
     * Use this service if you have your own proxy to google. A proxy is useful to keep your googleAPI key secret.
     * @param findUrl https://developers.google.com/places/web-service/autocomplete
     * @param retrieveUrl https://developers.google.com/places/web-service/details
     */
    constructor(
        private findPromise: (params: any) => Promise<AutocompletePredictionResponse>,
        private retrievePromise: (params: any) => Promise<PlaceResultResponse>,
        private findErrorCallback: (error: ErrorEvent) => void,
        private retrieveErrorCallback: (error: ErrorEvent) => void
    ) {
    }

    async find(query: AddressLookupFindQuery): Promise<AddressSummary[]> {
        this.ensureCreateToken();
        const params: google.maps.places.AutocompletionRequest = {
            input: query.input,
            sessionToken: this.sessionToken
        };

        const results: google.maps.places.AutocompletePrediction[] = await this.findPromise({
            input: params.input,
            sessionToken: params.sessionToken!.toString()
        })
            .then((response: AutocompletePredictionResponse) => (response.predictions))
            .catch((error: ErrorEvent) => {
                this.findErrorCallback(error);
                return [];
            });

        return results
            .map((prediction: google.maps.places.AutocompletePrediction) => new GoogleFindResponseBuilder()
                .setRequest(params)
                .setResult(prediction)
                .build()
                .mapTo(new AddressLookupToAddressSummary()));
    }

    async retrieve(query: AddressLookupRetrieveQuery): Promise<Address[]> {
        const params: google.maps.places.PlaceDetailsRequest = {
            placeId: query.id,
            sessionToken: this.sessionToken
        };

        const results: google.maps.places.PlaceResult[] = await this.retrievePromise({
            placeId: params.placeId,
            sessionToken: params.sessionToken!.toString()
        })
            .then((response: PlaceResultResponse) => [response.result])
            .catch((error: ErrorEvent) => {
                this.retrieveErrorCallback(error);
                return [];
            });

        this.discardToken();

        let address: Address;
        if (results.length > 0) {
            address = new GoogleRetrieveResponseBuilder()
                .setRequest(params)
                .setResult(results[0])
                .build()
                .mapTo(new AddressRetrieveToAddress());

            return [address];
        } else {
            return [];
        }
    }

    private ensureCreateToken(): void {
        const token: string = this.sessionToken ? this.sessionToken : uuid.generate();
        this.sessionToken = token;
    }

    private discardToken(): void {
        this.sessionToken = undefined;
    }
}
