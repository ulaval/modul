import { PHONEFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';


export default {
    title: `${modulComponentsHierarchyRootSeparator}${PHONEFIELD_NAME}`,
    parameters: { fileName: __filename }
};

// We should always load the phonefield as a separe chunk because of its size (> 2Mb)

const phoneFieldChunk = (): Promise<any> => import(/* webpackChunkName: "phonefield" */ '@ulaval/modul-components/dist/components/phonefield/phonefield').then((exports: any) => {
    return exports.MPhonefield;
});


export const defaultStory = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    data: () => ({
        model: '',
        country: {
            iso: 'ca',
            prefix: '1'
        }
    }),
    template: '<div><m-phonefield v-model="model" :country.sync="country"></m-phonefield><p>v-model = {{model}}</p><p>country selected = {{JSON.stringify(country)}}</p></div>'
});

defaultStory.story = {
    name: 'default'
};

export const detectCountry = () => ({
    data: () => ({
        model: '+14188753893',
        country: {},
        options: ['+7 (800) 555-35-35', '+1 212 201-2700', '+1 4188753893', '+1(213) 373-4253', '+33145573580']
    }),
    components: {
        'm-phonefield': phoneFieldChunk
    },
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
});

export const disabled = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :disabled="true"></m-phonefield>'
});


export const waiting = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :waiting="true"></m-phonefield>'
});

export const error = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :error="true"></m-phonefield>'
});

export const errorMessage = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :error="true" error-message="Error message"></m-phonefield>'
});

export const priorityCountriesEmpty = () => ({
    data: () => ({
        priorityIsoCountries: []
    }),
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :priority-iso-countries="priorityIsoCountries"></m-phonefield>'
});


export const priorityCountriesDefinedFrUsCa = () => ({

    data: () => ({
        priorityIsoCountries: ['fr', 'us', 'ca']
    }),
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :priority-iso-countries="priorityIsoCountries"></m-phonefield>'
});

export const autocompleteWorkPhone = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield autocomplete="work tel"></m-phonefield>'
});

export const otherDefaultCountry = () => ({
    data: () => ({
        country: {
            iso: 'fr',
            prefix: '33'
        }
    }),
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield :country="country"></m-phonefield>'
});

