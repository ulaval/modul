export enum AddressSources {
    LOQATE = 'loqate',
    GOOGLE_PLACES = 'google_places'
}

export interface AddressSummary {
    queryInput: string;
    value: string;
    type: string;
    label: string;
    description?: string;
}

export interface Address {
    id: string;
    name: string;
    buildingNumber?: string;
    street?: string;
    line1?: string;
    city: string;
    province?: Province;
    postalCode: string;
    country: Country;
    subBuilding?: string;
    formattedAddress: string;
    adrFormattedAddress: string;
    attributions: string[];
    source: AddressSources;
    isEstablishment: boolean;
}

export interface Province {
    provinceCode: string;
    province: string;
}

export interface Country {
    country: string;
    countryIso2: string;
}

export enum AddressFormat {
    DETAILS_FIELDS = 'detailsFields',
    FORMATED_FIELDS = 'formatedFields'
}

export enum AddressField {
    BUILDING_NUMBER = 'buildingNumber',
    STREET = 'street',
    CITY = 'city',
    LINE_1 = 'line1',
    POSTAL_CODE = 'postalCode',
    SUB_BUILDING = 'subBuilding',
    COUNTRY = 'country',
    PROVINCE = 'province',
    name = 'name',
    isEstablishment = 'isEstablishment'
}

export enum ProvinceKey {
    PROVINCE = 'province',
    PROVINCE_CODE = 'provinceCode'
}

export enum CountryKey {
    COUNTRY = 'country',
    COUNTRY_ISO2 = 'countryIso2',
    COUNTRY_ISO3 = 'countryIso3'
}

export function copyAddress(source: Address): Address {
    const country: Country = { ...source.country };
    if (source.province !== undefined) {
        const province: Province = { ...source.province };
        return { ...source, province, country };
    } else {
        return { ...source, country };
    }
}
