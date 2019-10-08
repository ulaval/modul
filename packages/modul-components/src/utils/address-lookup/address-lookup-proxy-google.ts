import { FindResponse, ResponseMapper, RetrieveResponse, RetrieveResponseMapper } from './address-lookup-response-mapper';

export class GoogleProxyFindResponse extends FindResponse {
    public request: any | undefined;
    public result: any | undefined;

    constructor() {
        super();
    }

    mapTo<TTo>(mapper: ResponseMapper<TTo>): TTo {
        return mapper.mapGoogle(this);
    }
}

export class GoogleProxyFindResponseBuilder {
    private readonly specimen: GoogleProxyFindResponse;

    constructor() {
        this.specimen = new GoogleProxyFindResponse();
    }

    setRequest(request: any): this {
        this.specimen.request = request as google.maps.places.AutocompletionRequest;
        return this;
    }

    setResult(result: any): this {
        this.specimen.result = result as google.maps.places.AutocompletePrediction;
        return this;
    }

    build(): FindResponse {
        return this.specimen;
    }
}

export class GoogleProxyRetrieveResponse extends RetrieveResponse {
    public request: any | undefined;
    public result: any | undefined;

    constructor() {
        super();
    }

    mapTo<TTo>(mapper: RetrieveResponseMapper<TTo>): TTo {
        return mapper.mapGoogle(this);
    }
}

export class GoogleProxyRetrieveResponseBuilder {
    private readonly specimen: GoogleProxyRetrieveResponse;

    constructor() {
        this.specimen = new GoogleProxyRetrieveResponse();
    }

    setRequest(request: any): this {
        this.specimen.request = request;
        return this;
    }

    setResult(result: any): this {
        this.specimen.result = result;
        return this;
    }

    build(): RetrieveResponse {
        return this.specimen;
    }
}
