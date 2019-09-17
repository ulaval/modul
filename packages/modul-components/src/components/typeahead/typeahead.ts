import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { TYPEAHEAD_NAME } from '../component-names';
import PopupPlugin from '../popup/popup';
import { MBaseSelect } from '../select/base-select/base-select';
import TextfieldPlugin, { MTextfield } from '../textfield/textfield';
import WithRender from './typeahead.html?style=./typeahead.scss';

@WithRender
@Component({
    components: {
        MBaseSelect
    },
    mixins: [
        InputLabel,
        InputState,
        InputWidth,
        MediaQueries,
        InputManagement
    ]
})
export class MTypeahead extends ModulVue {
    @Model('input')
    @Prop({
        required: true
    })
    public value: any;

    @Prop()
    public results: any[];

    @Prop()
    public waitingResults: boolean;

    @Prop()
    public filterResultsManually: boolean;

    @Prop({ default: 200 })
    public throttle: number;

    @Prop({ default: 0 })
    public maxLength: number;

    @Prop({ default: true })
    public lengthOverflow: boolean;

    @Prop()
    public characterCount: boolean;

    @Prop({ default: 0 })
    public characterCountThreshold: number;

    @Prop({ default: 20 })
    public maxResults: number;

    public $refs: {
        mTextfield: MTextfield;
        result: HTMLUListElement;
        resultsList: HTMLElement;
        researchInput: HTMLElement;
        mBaseSelect: MBaseSelect;
    };

    public id: string = `${TYPEAHEAD_NAME}-${uuid.generate()}`;
    public isResultsPopupOpen: boolean = false;
    public textfieldValue: string = '';

    public filteredResults: any[] = [];
    public ariaControls: string = this.id + '-controls';
    public throttleTimeoutActive: boolean = false;
    private throttleTimeout: number;

    @Emit('input')
    emitInput(event: string): void { }

    @Emit('filter-results')
    emitFilterResults(): void { }

    @Watch('value', { immediate: true })
    onValueChange(newValue: string): void {
        this.textfieldValue = newValue;
    }

    @Watch('results', { immediate: true })
    onResultsChange(): void {
        this.onFilterResults();
    }

    @Watch('internalIsFocus')
    onFocusChanged(newValue: boolean): void {
        if (newValue) {
            this.openResultsPopup();
            this.onFilterResults();
        }
    }

    @Watch('isResultsPopupOpen')
    onBaseSelectOpen(newValue: boolean): void {
        if (newValue && this.as<MediaQueries>().isMqMaxS) {
            setTimeout(() => {
                this.$refs.researchInput.focus();
            });
        }
    }


    get hasResults(): boolean {
        return this.results && this.results.length > 0;
    }

    get hasFilteredResults(): boolean {
        return this.filteredResults && this.filteredResults.length > 0;
    }

    get hasTextfieldValue(): boolean {
        return this.textfieldValue.length > 0;
    }

    get resultsCouldBeDisplay(): boolean {
        return this.hasFilteredResults && this.hasTextfieldValue && this.as<InputState>().active;
    }

    get hasSomeAResultSelected(): boolean {
        return this.filteredResults.some((e, index) => this.isSelected(index));
    }

    get sortedResult(): any[] {
        return this.results.sort();
    }

    openResultsPopup(): void {
        if (this.isResultsPopupOpen) {
            return;
        }

        this.isResultsPopupOpen = true;
    }

    closeResultsPopup(): void {
        this.isResultsPopupOpen = false;
    }

    onSelect(option: any, index: number): void {
        this.textfieldValue = this.filteredResults[index];
        this.emitInput(this.textfieldValue);
    }

    isSelected(index: number): boolean {
        return this.isResultsPopupOpen && this.textfieldValue.indexOf(this.filteredResults[index]) > -1;
    }

    focusOnResearchInput(): void {
        this.$refs.researchInput.focus();
    }

    onFilterResults(): void {
        if (this.filterResultsManually) {
            this.filteredResults = this.results.slice(0, this.maxResults);
        } else {
            this.filteredResults = this.sortedResult
                .filter(r =>
                    this.hasTextfieldValue
                    &&
                    r.toLowerCase().includes(this.textfieldValue.toLowerCase())
                ).slice(0, this.maxResults);
        }
    }

    getTextHighlight(item): string {
        let regex: RegExp = RegExp(this.textfieldValue, 'i');
        return item.replace(regex, '<b>$&</b>');
    }

    onInput(event: string): void {
        this.textfieldValue = event;
        this.emitInput(event);

        window.clearTimeout(this.throttleTimeout);
        this.throttleTimeoutActive = true;

        this.throttleTimeout = window.setTimeout(() => {
            this.throttleTimeoutActive = false;

            this.onFilterResults();

            if (this.resultsCouldBeDisplay) {
                this.$refs.mBaseSelect.setFocusedIndex(0);
            }

            if (!this.isResultsPopupOpen) {
                this.openResultsPopup();
            }

            this.emitFilterResults();
        }, this.throttle);


    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay && this.as<MediaQueries>().isMqMinS) {
            this.$refs.mBaseSelect.selectFocusedItem();

        }
        this.$refs.mBaseSelect.closePopup();
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.$refs.mBaseSelect.onKeydownDown($event);
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.$refs.mBaseSelect.onKeydownUp($event);
        }
    }

    onKeydownTab($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.$refs.mBaseSelect.onKeydownTab($event);
        }
    }

    onKeydownEsc($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.$refs.mBaseSelect.onKeydownEsc($event);
        }
    }

}

const TypeaheadPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(TYPEAHEAD_NAME, 'plugin.install');
        v.use(TextfieldPlugin);
        v.use(PopupPlugin);
        v.component(TYPEAHEAD_NAME, MTypeahead);
    }
};

export default TypeaheadPlugin;
