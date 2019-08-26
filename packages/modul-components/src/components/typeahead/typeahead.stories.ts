import { storiesOf } from '@storybook/vue';
import Vue from 'vue';
import { componentsHierarchyRootSeparator } from '../../../conf/storybook/utils';
import { TYPEAHEAD_NAME } from '../component-names';
import TypeaheadPlugin from './typeahead';

Vue.use(TypeaheadPlugin);

const RESULTS: string[] = ['Tomato', 'Celery', 'Apple', 'Bannana', 'Patate', 'Carrot', 'Avocados', 'Eggplant', 'Beet', 'Pineapple', 'Lemon', 'Pumpkin', 'Kiwi'];

storiesOf(`${componentsHierarchyRootSeparator}${TYPEAHEAD_NAME}`, module)

    .add('Default', () => ({
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
            <m-typeahead v-model="value" :filter-results-manually="true" :throttle="500" :placeholder="placeholder" :results="filterResult" :lodding-results="loddingResults" @filter-results="onFilter"></m-typeahead>
            <h2 class="m-u--h5">Results</h2>
            <p v-html="results"></p>
        </div>`
    }));
