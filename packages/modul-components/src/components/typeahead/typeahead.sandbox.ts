import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
import { TYPEAHEAD_NAME } from '../component-names';
import TypeaheadPlugin from './typeahead';
import WithRender from './typeahead.sandbox.html';

@WithRender
@Component
export class MTypeaheadSandbox extends ModulVue {
    results: any[] = [{ label: 'RandomDog', value: 'RandomDog' }];
    results2: any[] = [];
    selection: string = 'RandomDog';
    selection2: string = '';
    value: string = 'apple';
    items: any[] = ['tomato', 'apple', 'bannana', 'patate', 'avocados', 'etc'];

    private onComplete(value: string): void {
        this.onCompleteFetch(value).then((results: any[]) => {
            this.results = results;
        });
    }

    private onComplete2(value: string): void {
        this.onCompleteFetch(value).then((results: any[]) => {
            this.results2 = results;
        });
    }

    private onCompleteFetch(value: string): Promise<any[]> {
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

const TypeaheadSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(TypeaheadPlugin);
        v.component(`${TYPEAHEAD_NAME}-sandbox`, MTypeaheadSandbox);
    }
};

export default TypeaheadSandboxPlugin;
