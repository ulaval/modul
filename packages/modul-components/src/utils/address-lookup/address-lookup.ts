import { Address, AddressSummary } from './address';

export enum AddressLookupServiceProvider {
    Google,
    Loqate,
    GoogleProxy
}

export interface AddressLookupService {
    find(query: AddressLookupFindQuery): Promise<AddressSummary[]>;
    retrieve(query: AddressLookupRetrieveQuery): Promise<Address[]>;
    serviceProvider: AddressLookupServiceProvider;
}

export interface AddressLookupFindQuery {
    id?: string;
    input: string;
    origin?: string;
    language?: string;
}

export interface AddressLookupRetrieveQuery {
    id: string;
}
