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

    constructor(findUrl: string, retrieveUrl: string) {
        this.httpService = new HttpService();
        this.findUrl = findUrl;
        this.retrieveUrl = retrieveUrl;

    }

    async find(query: AddressLookupFindQuery): Promise<AddressSummary[]> {
        this.ensureCreateToken();
        const request: google.maps.places.AutocompletionRequest = {
            input: query.input,
            sessionToken: this.sessionToken
        };
        const results: google.maps.places.AutocompletePrediction[] = await this.httpService.execute({
            method: 'GET',
            rawUrl: this.findUrl,
            params: {
                ...request
            }
        }).then((r: AxiosResponse<unknown>) => ((r.data as any).predictions as google.maps.places.AutocompletePrediction[]));

        return results
            .map((prediction: google.maps.places.AutocompletePrediction) => new GoogleFindResponseBuilder()
                .setRequest(request)
                .setResult(prediction)
                .build()
                .mapTo(new AddressLookupToAddressSummary()));
    }

    async retrieve(query: AddressLookupRetrieveQuery): Promise<Address[]> {
        const request: google.maps.places.PlaceDetailsRequest = {
            placeId: query.id,
            sessionToken: this.sessionToken
        };

        const results: google.maps.places.PlaceResult = await this.httpService.execute({
            method: 'GET',
            rawUrl: this.retrieveUrl,
            params: {
                ...request
            }
        }).then((r: AxiosResponse<unknown>) => (r.data as any) as google.maps.places.PlaceResult);
        this.discardToken();
        const address: Address = new GoogleRetrieveResponseBuilder()
            .setRequest(request)
            .setResult(results)
            .build()
            .mapTo(new AddressRetrieveToAddress());

        return [address];

        // return results
        //     .map((results: google.maps.places.PlaceResult) => new GoogleRetrieveResponseBuilder()
        //         .setRequest(request)
        //         .setResult(results)
        //         .build()
        //         .mapTo(new AddressRetrieveToAddress()));
    }

    private ensureCreateToken(): void {
        const token: string = this.sessionToken ? this.sessionToken : uuid.generate();
        this.sessionToken = token;
    }

    private discardToken(): void {
        this.sessionToken = undefined;
    }
}
