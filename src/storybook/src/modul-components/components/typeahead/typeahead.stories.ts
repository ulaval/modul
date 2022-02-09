import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { TYPEAHEAD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import ModalPlugin from '@ulaval/modul-components/dist/components/modal/modal';
import TypeaheadPlugin from '@ulaval/modul-components/dist/components/typeahead/typeahead';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(TypeaheadPlugin);
Vue.use(ModalPlugin);

const RESULTS: string[] = ['Tomato', 'Celery', 'Apple', 'Bannana', 'Patate', 'Carrot', 'Avocados', 'Eggplant', 'Beet', 'Pineapple', 'Lemon', 'Pumpkin', 'Kiwi'];

storiesOf(`${modulComponentsHierarchyRootSeparator}${TYPEAHEAD_NAME}`, module)

    .add('Default', () => ({
        methods: actions(
            'input',
            'focus',
            'blur',
            'filter',
            'keydown',
            'keyup',
            'paste'
        ),
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: ''
        }),
        template: `<div>
            <m-typeahead @input="input" @focus="focus" @blur="blur"  @filter-results="filter" @keydown="keydown" @keyup="keyup" @paste="paste" v-model="value" :label="label" :results="results"></m-typeahead>
            <p>v-model = {{ value }}</p>
            <h2 class="m-u--h5">Values</h2>
            <p v-html="results"></p>
        </div>`
    }))
    .add('Inside m-modal', () => ({
        methods: actions(
            'input',
            'focus',
            'blur',
            'filter',
            'keydown',
            'keyup',
            'paste'
        ),
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: ''
        }),
        template: `<m-modal :open="true">
            <m-typeahead @input="input" @focus="focus" @blur="blur"  @filter-results="filter" @keydown="keydown" @keyup="keyup" @paste="paste" v-model="value" :label="label" :results="results"></m-typeahead>
            <p>v-model = {{ value }}</p>
        </m-modal>`
    }))
    .add('popup-footer slot', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: ''
        }),
        template: `<m-typeahead
            v-model="value"
            :label="label"
            :results="results"
        >
            <template slot="popup-footer">footer slot here</template>
        </m-typeahead>`
    }))
    .add('list-max-height 110px', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: ''
        }),
        template: `<m-typeahead
            v-model="value"
            :label="label"
            :results="results"
            list-max-height="110px"
        />`
    }))
    .add('max-results', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: '',
            maxResults: 5
        }),
        template: `<div>
            <m-typeahead v-model="value" :label="label" :max-results="maxResults" :results="results"></m-typeahead>
            <p>maxResult = {{ maxResults}}</p>
            <h2 class="m-u--h5">Values</h2>
            <p v-html="results"></p>
        </div>`
    }))
    .add('error-message', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: '',
            maxResults: 5
        }),
        template: `<div>
            <m-typeahead v-model="value" :label="label" :max-results="maxResults" :results="results" error-message="Error message"></m-typeahead>
            <p>maxResult = {{ maxResults}}</p>
            <h2 class="m-u--h5">Values</h2>
            <p v-html="results"></p>
        </div>`
    }))
    .add('custom results', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: '',
            maxResults: 5
        }),
        template: `<div>
            <m-typeahead v-model="value" :label="label" :max-results="maxResults" :results="results">
                <template  v-slot:items="{item , index, highlight }">
                   <span v-html="highlight"/><br/>
                   <em class="m-u--typo--precision">{{item}} in the uk</em>
                </template>
            </m-typeahead>

        </div>`
    }))
    .add('filter-results-manually', () => ({
        data: () => ({
            placeholder: 'Fruits and vegetables',
            results: RESULTS,
            filterResult: [],
            loddingResults: false,
            value: ''
        }),
        methods: {
            onFilter(): void {
                let _this: any = this as any;
                _this.loddingResults = true;
                _this.filterResult = [];
                setTimeout(() => {
                    _this.filterResult = _this.results.filter(r => {
                        if (_this.value) {
                            return r.toLowerCase().includes(_this.value.toLowerCase());
                        }
                    }).sort();
                    _this.loddingResults = false;
                }, 1000);
            }
        },
        template: `<div>
            <m-typeahead v-model="value" :filter-results-manually="true" :throttle="500" :placeholder="placeholder" :results="filterResult" :waiting-results="loddingResults" @filter-results="onFilter"></m-typeahead>
            <h2 class="m-u--h5">Results</h2>
            <p v-html="results"></p>
        </div>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${TYPEAHEAD_NAME}/mobile`, module)
    .addParameters({ viewport: { defaultViewport: 'iphone6' } })
    .add('iphone6', () => ({
        data: () => ({
            label: 'Fruits and vegetables',
            results: RESULTS,
            value: ''
        }),
        template: `<div>
            <m-typeahead v-model="value" :label="label" :results="results"></m-typeahead>
            <h2 class="m-u--h5">Results</h2>
            <p v-html="results"></p>
        </div>`
    })
    );
