import { storiesOf } from '@storybook/vue';
import { MAddressReader } from '@ulaval/modul-components/dist/components/address/address-reader/address-reader';
import { ADDRESS_READER } from '@ulaval/modul-components/dist/components/component-names';
import { CountryKey, ProvinceKey } from '@ulaval/modul-components/dist/utils/address-lookup/address';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}/m-address/${ADDRESS_READER}`, module)
    .add('default', () => ({
        components: {},
        data: () => ({
            address: {
                buildingNumber: '2325',
                city: 'Québec',
                country: {
                    country: 'Canada',
                    countryIso2: 'CA'
                },
                province: {
                    province: 'Québec',
                    provinceCode: 'QC'
                },
                street: `Rue de l'Université`,
                postalCode: 'G1V 0A6',
                subBuilding: ''
            },
            countryKey: CountryKey.COUNTRY,
            provinceKey: ProvinceKey.PROVINCE_CODE,
            filters: {
                street: (value: string): string => value.charAt(0).toLowerCase() + value.slice(1)
            }
        }),
        template: `<div>
            <${ADDRESS_READER}
                :address="address"
                :country-key="countryKey"
                :province-key="provinceKey"
                :filters="filters">
            </${ADDRESS_READER}>
        </div>`
    }))
    .add('Restructuring using scoped-slot', () => ({
        components: { MAddressReader },
        data: () => ({
            address: {
                buildingNumber: '2325',
                city: 'Québec',
                country: {
                    country: 'Canada',
                    countryIso2: 'CA',
                    countryIso3: 'CAN'
                },
                province: {
                    province: 'Québec',
                    provinceCode: 'QC'
                },
                street: `Rue de l'Université`,
                postalCode: 'G1V 0A6',
                subBuilding: ''
            },
            countryKey: CountryKey.COUNTRY,
            provinceKey: ProvinceKey.PROVINCE_CODE,
            filters: {
                street: (value: string): string => (value !== '') ? value.charAt(0).toLowerCase() + value.slice(1) : ''
            }
        }),
        template: `<div>
            <${ADDRESS_READER}
                :address="address"
                :country-key="countryKey"
                :province-key="provinceKey"
                :filters="filters"
                v-slot:default="{ filteredAddress : address }">
                {{ address.postalCode }} <br />
                {{ address.country }} <br />
                {{ address.city }}, {{ address.province }} <br />
                {{ address.buildingNumber }} {{ address.street }} <template v-if="address.subBuilding !== ''">Appartement / bureau : {{ address.subBuilding }} </template>
            </${ADDRESS_READER}>
        </div>`
    }))
    .add('empty province', () => ({
        components: { MAddressReader },
        data: () => ({
            address: {
                buildingNumber: '2325',
                city: 'Québec',
                country: {
                    country: 'Canada',
                    countryIso2: 'CA'
                },
                province: {
                    province: '',
                    provinceCode: ''
                },
                street: `Rue de l'Université`,
                postalCode: 'G1V 0A6',
                subBuilding: ''
            },
            countryKey: CountryKey.COUNTRY,
            provinceKey: ProvinceKey.PROVINCE_CODE,
            filters: {
                street: (value: string): string => value.charAt(0).toLowerCase() + value.slice(1)
            }
        }),
        template: `<div>
            <${ADDRESS_READER}
                :address="address"
                :country-key="countryKey"
                :province-key="provinceKey"
                :filters="filters">
            </${ADDRESS_READER}>
        </div>`
    }));
