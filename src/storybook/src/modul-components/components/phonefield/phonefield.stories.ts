import { storiesOf } from '@storybook/vue';
import { PHONEFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import PhonefieldPlugin from '@ulaval/modul-components/dist/components/phonefield/phonefield';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PhonefieldPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${PHONEFIELD_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            model: '',
            country: {
                iso: 'ca',
                prefix: '1'
            }
        }),
        template: '<div><m-phonefield v-model="model" :country.sync="country"></m-phonefield><p>v-model = {{model}}</p><p>country selected = {{JSON.stringify(country)}}</p></div>'
    }))
    .add('detect country', () => ({
        data: () => ({
            model: '+14188753893',
            country: {},
            options: ['+7 (800) 555-35-35', '+1 212 201-2700', '+1 4188753893', '+1(213) 373-4253']
        }),
        template: `<div>
                        <div>
                            <p>Select a phone number</p>
                            <m-select :options="options" v-model="model">
                                <template slot="selection">{{ model }}</template>
                                <template slot="option" slot-scope="{option, index}"> {{ option }} </template>
                            </m-select>
                        </div>
                        <div>
                            <m-phonefield v-model="model" :country.sync="country"></m-phonefield>
                            <p>v-model = {{model}}</p>
                            <p>country selected = {{JSON.stringify(country)}}</p>
                        </div>
                    </div>`
    }))
    .add('disabled', () => ({
        template: '<m-phonefield :disabled="true"></m-phonefield>'
    }))
    .add('waiting', () => ({
        template: '<m-phonefield :waiting="true"></m-phonefield>'
    }))
    .add('error', () => ({
        template: '<m-phonefield :error="true"></m-phonefield>'
    }))
    .add('error message', () => ({
        template: '<m-phonefield :error="true" error-message="Error message"></m-phonefield>'
    }));
