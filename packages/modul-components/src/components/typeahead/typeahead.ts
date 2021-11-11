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
import { MBaseSelect, MBaseSelectItem } from '../select/base-select/base-select';
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
    public results: MBaseSelectItem<unknown>[] | string[];

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

    @Prop({ default: () => `${TYPEAHEAD_NAME}-${uuid.generate()}` })
    public id: string;

    @Ref('mBaseSelect')
    public readonly refBaseSelect: MBaseSelect;

    @Ref('researchInput')
    public readonly refResearchInput: HTMLInputElement;

    public readonly validationMessageId: string = uuid.generate();
    public readonly inputLabelId: string = uuid.generate();

    public $refs: {
        mTextfield: MTextfield;
        result: HTMLUListElement;
        resultsList: HTMLElement;
    };

    public isResultsPopupOpen: boolean = false;
    public textfieldValue: string = '';

    public filteredResults: MBaseSelectItem<unknown>[] | string[] = [];
    public throttleTimeoutActive: boolean = false;
    private throttleTimeout: number;

    @Emit('input')
    public emitInput(_event: string): void { }

    @Emit('filter-results')
    public emitFilterResults(): void { }

    @Watch('value', { immediate: true })
    public onValueChange(newValue: string): void {
        this.textfieldValue = newValue;
    }

    @Watch('results', { immediate: true })
    public onResultsChange(): void {
        this.onFilterResults();
    }

    @Watch('internalIsFocus')
    public onFocusChanged(newValue: boolean): void {
        if (newValue) {
            this.onFilterResults();
        }
    }

    @Watch('isResultsPopupOpen')
    public onBaseSelectOpen(newValue: boolean): void {
        if (newValue && this.as<MediaQueries>().isMqMaxS) {
            setTimeout(() => {
                this.refResearchInput.focus();
            });
        }
    }


    public get hasResults(): boolean {
        return this.results && this.results.length > 0;
    }

    public get hasFilteredResults(): boolean {
        return this.filteredResults && this.filteredResults.length > 0;
    }

    public get hasTextfieldValue(): boolean {
        return this.textfieldValue.length > 0;
    }

    public get resultsCouldBeDisplay(): boolean {
        return this.hasFilteredResults && this.hasTextfieldValue && this.as<InputState>().active;
    }

    public get hasSomeAResultSelected(): boolean {
        return this.filteredResults.some((e, index) => this.isSelected(index));
    }

    public get sortedResult(): MBaseSelectItem<unknown>[] | string[] {
        if (this.resultsAreStringArray) {
            return (this.results as string[]).sort((a, b) => a.localeCompare(b))
        }
        return (this.results as MBaseSelectItem<unknown>[]).sort(
            (a, b) => a.value.localeCompare(b.value)
        );
    }

    public get resultsAreStringArray(): boolean {
        if (this.results.length === 0) return false;
        return typeof this.results[0] === 'string';
    }

    public onPortalAfterClose(): void {
        const refInput = (this.$el as HTMLElement).querySelector(`#${this.id}`) as HTMLInputElement;
        if (
            refInput && document.activeElement !== refInput
        ) {
            refInput.focus();
        }
    }

    public openResultsPopup(): void {
        if (this.isResultsPopupOpen) {
            return;
        }

        this.isResultsPopupOpen = true;
    }

    public closeResultsPopup(): void {
        this.isResultsPopupOpen = false;
    }

    public onSelect(_option: any, index: number): void {
        if (this.resultsAreStringArray) {
            this.textfieldValue = (this.filteredResults as string[])[index];
        } else {
            this.textfieldValue = (this.filteredResults as MBaseSelectItem<unknown>[])[index].value;
        }
        this.emitInput(this.textfieldValue);
    }

    public isSelected(index: number): boolean {
        return this.isResultsPopupOpen && this.textfieldValue.indexOf(
            this.resultsAreStringArray ?
                (this.filteredResults as string[])[index] :
                (this.filteredResults as MBaseSelectItem<unknown>[])[index].value
        ) > -1;
    }

    public focusOnResearchInput(): void {
        this.refResearchInput.focus();
    }

    public onFilterResults(): void {
        let filteredResults: MBaseSelectItem<unknown>[] | string[] = [];
        if (this.filterResultsManually) {
            filteredResults = this.results;
        } else {
            if (this.resultsAreStringArray) {
                filteredResults = (this.sortedResult as string[])
                    .filter(r =>
                        this.hasTextfieldValue
                        && r.toLowerCase().includes(this.textfieldValue.toLowerCase())
                    )
            } else {
                filteredResults = (this.sortedResult as MBaseSelectItem<unknown>[])
                    .filter(r =>
                        this.hasTextfieldValue
                        && r.value.toLowerCase().includes(this.textfieldValue.toLowerCase())
                    )
            }
        }
        this.filteredResults = filteredResults.slice(0, this.maxResults);
    }

    public getTextHighlight(item: MBaseSelectItem<unknown> | string): string {
        const regex: RegExp = RegExp(this.textfieldValue, 'i');
        if (this.resultsAreStringArray) {
            return (item as string).replace(regex, '<b>$&</b>');
        }
        return (item as MBaseSelectItem<unknown>).value.replace(regex, '<b>$&</b>');
    }

    public onInput(event: string): void {
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

    public onKeydownEnter($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay && this.as<MediaQueries>().isMqMinS) {
            this.refBaseSelect.selectFocusedItem($event);
        }
        this.refBaseSelect.closePopup();
    }

    public onKeydownDown($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownDown($event);
        }
    }

    public onKeydownUp($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownUp($event);
        }
    }

    public onKeydownTab($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownTab($event);
        }
    }

    public onKeydownEsc($event: KeyboardEvent): void {
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
