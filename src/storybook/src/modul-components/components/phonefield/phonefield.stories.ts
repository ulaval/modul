import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}m-phonefield`,
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
        currentExplication: '',
        country: {},
        options: ['+14188753893', '+7 (800) 555-35-35', '+1 212 201-2700', '+1(213) 373-4253', '+33145573580'],
        explicationsText: [
            'Le pays courant doit être <strong>Canada</strong> et le format affiché : <strong>+1 222 333 4444</strong>.',
            'Le pays courant doit être <strong>Russie</strong> et le format affiché : <strong>+1 222 333 44 55</strong>.',
            'Le pays courant doit être <strong>États-Unis</strong> et le format affiché : <strong>+1 222 333 4444</strong>.',
            'Le pays courant doit être <strong>États-Unis</strong> et le format affiché : <strong>+1 222 333 4444</strong>.',
            'Le pays courant doit être <strong>France</strong> et le format affiché : <strong>+11 2 33 44 55 66</strong>.'
        ]
    }),
    created(): void {
        this.currentExplication = this.explicationsText[0];
    },
    methods: {
        updateExplication(_value: string, index: number): void {
            this.currentExplication = this.explicationsText[index];
        }
    },
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: `<div>
                    <div>
                        <p>Choisir un numéro de téléphone</p>
                        <m-select :options="options" v-model="model" required-marker="true" @select-item="updateExplication">
                            <template slot="selection">{{ model }}</template>
                            <template slot="option" slot-scope="{option, index}"> {{ option }} </template>
                        </m-select><br/>
                        <p v-html="currentExplication"></p><br/>
                    </div>
                    <div>
                        <m-phonefield v-model="model" :country.sync="country"></m-phonefield>
                        <p>v-model : {{model}}</p>
                        <p>Pays selectionné : {{JSON.stringify(country)}}</p>
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

export const fullWidth = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield width="100%" max-width="none"></m-phonefield>'
});

export const maxWidthLarge = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield width="100%" max-width="large"></m-phonefield>'
});

export const maxWidth500px = () => ({
    components: {
        'm-phonefield': phoneFieldChunk
    },
    template: '<m-phonefield width="100%" max-width="500px"></m-phonefield>'

});

