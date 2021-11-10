import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Ref, Watch } from 'vue-property-decorator';
import { I18N_NAME as FILTER_I18N_NAME } from '../../filters/filter-names';
import { i18nFilter } from '../../filters/i18n/i18n';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { ICON_BUTTON_NAME, INPUT_STYLE_NAME, TYPEAHEAD_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MInputStyle } from '../input-style/input-style';
import { MBaseSelect } from '../select/base-select/base-select';
import { MTextfield } from '../textfield/textfield';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './typeahead.html?style=./typeahead.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [ICON_BUTTON_NAME]: MIconButton,
    },
    filters: {
        [FILTER_I18N_NAME]: i18nFilter
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

    @Ref('input')
    public readonly refInput?: HTMLInputElement;

    @Ref('mBaseSelect')
    public readonly refBaseSelect: MBaseSelect;

    @Ref('researchInput')
    public readonly refResearchInput: HTMLInputElement;

    public $refs: {
        mTextfield: MTextfield;
        result: HTMLUListElement;
        resultsList: HTMLElement;
    };

    public id: string = `${TYPEAHEAD_NAME}-${uuid.generate()}`;
    public isResultsPopupOpen: boolean = false;
    public textfieldValue: string = '';

    public filteredResults: string[] = [];
    public throttleTimeoutActive: boolean = false;
    private throttleTimeout: number;

    @Emit('input')
    emitInput(_event: string): void { }

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
                this.refResearchInput.focus();
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
        this.refResearchInput.focus();
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
                this.refBaseSelect.setFocusedIndex(0);
            }

            if (!this.isResultsPopupOpen) {
                this.openResultsPopup();
            }

            this.emitFilterResults();
        }, this.throttle);


    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay && this.as<MediaQueries>().isMqMinS) {
            this.refBaseSelect.selectFocusedItem($event);
        }
        this.refBaseSelect.closePopup();
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownDown($event);
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownUp($event);
        }
    }

    onKeydownTab($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownTab($event);
        }
    }

    onKeydownEsc($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownEsc($event);
        }
    }
}

const TypeaheadPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TYPEAHEAD_NAME, MTypeahead);
    }
};

export default TypeaheadPlugin;
