import { MAutoCompleteResult } from '@ulaval/modul-components/dist/components/autocomplete/autocomplete';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './autocomplete.example.html';

@WithRender
@Component
export class MWAutocompleteExample extends Vue {

    results: MAutoCompleteResult[] = [];
    selection: string = '';

    onComplete(value: string): void {
        this.onCompleteFetch(value).then((results: MAutoCompleteResult[]) => {
            this.results = results;
        });
    }

    private onCompleteFetch(value: string): Promise<MAutoCompleteResult[]> {
        return fetch('https://api.publicapis.org/entries?title=' + value)
            .then(res => res.json())
            .then((res: any) => {
                if (res.count > 0) {
                    return res.entries.filter(entry => entry.API.toLowerCase().indexOf(value.toLowerCase()) === 0).map(entry => {
                        const label: string = entry.API.length > 60
                            ? entry.API.slice(0, 60) + '...'
                            : entry.API;
                        return { label: label, value: label, entry: entry };
                    });
                } else {
                    return [];
                }
            });
    }
}
