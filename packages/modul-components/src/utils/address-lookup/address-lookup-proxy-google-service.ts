import { AxiosResponse } from 'axios';
import { HttpService } from '../http/http';
import uuid from '../uuid/uuid';
import { Address, AddressSummary } from './address';
import { AddressLookupFindQuery, AddressLookupRetrieveQuery, AddressLookupService, AddressLookupServiceProvider } from './address-lookup';
import { GoogleFindResponseBuilder, GoogleRetrieveResponseBuilder } from './address-lookup-google';
import { AddressLookupToAddressSummary, AddressRetrieveToAddress } from './address-lookup-response-mapper';

export default class AddressLookupGoogleProxyService implements AddressLookupService {
    serviceProvider = AddressLookupServiceProvider.GoogleProxy;
    private sessionToken?: string;
    private httpService: HttpService;
    private findUrl: string;
    private retrieveUrl: string;

    /**
     * Use this service if you have your own proxy to google. Such a proxy is useful to keep your googleAPI key secret.
     * @param findUrl https://developers.google.com/places/web-service/autocomplete
     * @param retrieveUrl https://developers.google.com/places/web-service/details
     */
    constructor(findUrl: string, retrieveUrl: string) {
        this.httpService = new HttpService();
        this.findUrl = findUrl;
        this.retrieveUrl = retrieveUrl;
    }

    async find(query: AddressLookupFindQuery): Promise<AddressSummary[]> {
        this.ensureCreateToken();
        const params: google.maps.places.AutocompletionRequest = {
            input: query.input,
            sessionToken: this.sessionToken
        };
        const results: google.maps.places.AutocompletePrediction[] = await this.httpService.execute({
            method: 'GET',
            rawUrl: this.findUrl,
            params
        }).then((r: AxiosResponse<unknown>) => ((r.data as any).predictions as google.maps.places.AutocompletePrediction[]));

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

        const results: google.maps.places.PlaceResult = await this.httpService.execute({
            method: 'GET',
            rawUrl: this.retrieveUrl,
            params
        }).then((r: AxiosResponse<unknown>) => (r.data as any) as google.maps.places.PlaceResult);

        this.discardToken();

        const address: Address = new GoogleRetrieveResponseBuilder()
            .setRequest(params)
            .setResult(results)
            .build()
            .mapTo(new AddressRetrieveToAddress());

        return [address];
    }

    private ensureCreateToken(): void {
        const token: string = this.sessionToken ? this.sessionToken : uuid.generate();
        this.sessionToken = token;
    }

    private discardToken(): void {
        this.sessionToken = undefined;
    }
}
