import { storiesOf } from '@storybook/vue';
import AddressPlugin from '@ulaval/modul-components/dist/components/address/address';
import { MAddressLookupField } from '@ulaval/modul-components/dist/components/address/address-lookup-field/address-lookup-field';
import { ADDRESS_LOOKUP_FIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { Address } from '@ulaval/modul-components/dist/utils/address-lookup/address';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(AddressPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}/m-address/${ADDRESS_LOOKUP_FIELD_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            origin: 'CA',
            language: 'fr',
            retrievedValue: 'nothing'
        }),
        methods: {
            onRetrieve(value: Address): void {
                (this as any).retrievedValue = value;
            },
            clear(): void {
                (this as any).retrievedValue = 'nothing';
                ((this as any).$refs.lookup as MAddressLookupField).clear();
            }
        },
        template: `<div>
            current key is: {{ $addressLookup.key }}
            <${ADDRESS_LOOKUP_FIELD_NAME}
                :origin="origin"
                :language="language"
                @address-retrieved="onRetrieve"
                ref="lookup">
            </${ADDRESS_LOOKUP_FIELD_NAME}>
            <div>RETRIEVED VALUE: {{ retrievedValue }}</div>
            <button @click="clear()">Clear</button>
        </div>`
    }));
