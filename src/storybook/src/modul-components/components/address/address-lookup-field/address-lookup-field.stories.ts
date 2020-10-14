import { storiesOf } from '@storybook/vue';
import AddressPlugin from '@ulaval/modul-components/dist/components/address/address';
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
            value: undefined
        }),
        methods: {
            onRetrieve(value: Address): void {
                (this as any).retrievedValue = value;
            },
            clear(): void {
                (this as any).value = undefined;
            }
        },
        template: `<div>
            current key is: {{ $addressLookup?.key }}
            <${ADDRESS_LOOKUP_FIELD_NAME}
                :origin="origin"
                :language="language"
                v-model="value"
                ref="lookup">
            </${ADDRESS_LOOKUP_FIELD_NAME}>
            <div>RETRIEVED VALUE: {{ value }}</div>
            <button @click="clear()">Clear</button>
        </div>`
    }));
