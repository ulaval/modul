import { storiesOf } from '@storybook/vue';
import AddressPlugin from '@ulaval/modul-components/dist/components/address/address';
import { ADDRESS_LOOKUP_FIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { Address } from '@ulaval/modul-components/dist/utils/address-lookup/address';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';

Vue.use(AddressPlugin, { loqateKey: '', googleKey: '' });

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
            }
        },
        template: `<div>
            current key is: {{ $addressLookup.key }}
            <${ADDRESS_LOOKUP_FIELD_NAME}
                :origin="origin"
                :language="language"
                @address-retrieved="onRetrieve">
            </${ADDRESS_LOOKUP_FIELD_NAME}>
            <div>RETRIEVED VALUE: {{ retrievedValue }}</div>
        </div>`
    }));
