import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Ref, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { TYPEAHEAD_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MInputStyle } from '../input-style/input-style';
import { MBaseSelect, MBaseSelectItem } from '../select/base-select/base-select';
import { MSpinner } from '../spinner/spinner';
import { MTextfield } from '../textfield/textfield';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './typeahead.html?style=./typeahead.scss';

@WithRender
@Component({
    components: {
        MBaseSelect,
        MInputStyle,
        MValidationMessage,
        MIconButton,
        MSpinner
    },
    mixins: [
        InputLabel,
        InputState,
        InputWidth,
        InputManagement,
        MediaQueries
    ]
})
export class MTypeahead extends ModulVue {
    @Model('input')
    @Prop({
        required: true
    })
    public readonly value: any;

    @Prop()
    public readonly results: MBaseSelectItem<unknown>[] | string[];

    @Prop({ default: false })
    public readonly waitingResults: boolean;

    @Prop()
    public readonly filterResultsManually: boolean;

    @Prop({ default: 0 })
    public readonly throttle: number;

    @Prop({ default: 0 })
    public readonly maxLength: number;

    @Prop({ default: true })
    public readonly lengthOverflow: boolean;

    @Prop()
    public readonly characterCount: boolean;

    @Prop({ default: 0 })
    public readonly characterCountThreshold: number;

    @Prop({ default: 20 })
    public readonly maxResults: number;

    @Prop({ default: () => `${TYPEAHEAD_NAME}-${uuid.generate()}` })
    public readonly id: string;

    @Prop({
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly listMaxHeight: string;

    @Ref('mBaseSelect')
    public readonly refBaseSelect: MBaseSelect;

    @Ref('researchInput')
    public readonly refResearchInput: HTMLInputElement;

    @Ref('mTextfield')
    public readonly refMTextfield?: MTextfield;

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
    private throttleTimeout: NodeJS.Timeout | number = 0;
    private firstSelection: boolean = false;

    @Emit('input')
    public emitInput(_event: string): void { }

    @Emit('filter-results')
    public emitFilterResults(): void { }

    @Watch('results', { immediate: true })
    public onResultsChange(): void {
        this.onFilterResults();
    }

    @Watch('value', { immediate: true })
    public onValueChange(value: string): void {
        this.textfieldValue = value;
    }

    @Watch('internalIsFocus')
    public onFocusChanged(newValue: boolean): void {
        if (!newValue) { return; }
        this.onFilterResults();

    }

    @Watch('isResultsPopupOpen')
    public onBaseSelectOpen(newValue: boolean): void {
        if (!newValue || this.as<MediaQueries>().isMqMinS) { return; }
        requestAnimationFrame(() => {
            this.refResearchInput.focus();
        });
    }

    public get hasResults(): boolean {
        return this.results && this.results.length > 0;
    }

    public get hasFilteredResults(): boolean {
        return this.filteredResults && this.filteredResults.length > 0;
    }

    public get hasTextfieldValue(): boolean {
        return Boolean(this.textfieldValue) && this.textfieldValue.length > 0;
    }

    public get resultsCouldBeDisplay(): boolean {
        return this.hasFilteredResults && this.hasTextfieldValue && this.as<InputState>().active && this.isResultsPopupOpen;
    }

    public get hasSomeAResultSelected(): boolean {
        return this.filteredResults.some((e, index) => this.isSelected(index));
    }

    public get sortedResult(): MBaseSelectItem<unknown>[] | string[] {
        if (this.resultsAreStringArray) {
            return (this.results as string[]).sort((a, b) => a.localeCompare(b));
        }
        return (this.results as MBaseSelectItem<unknown>[]).sort(
            (a, b) => a.value.localeCompare(b.value)
        );
    }

    public get resultsAreStringArray(): boolean {
        if (this.results.length === 0) { return false; }
        return typeof this.results[0] === 'string';
    }

    public get isWaitingResults(): boolean {
        return (this.waitingResults || this.throttleTimeoutActive)
            && this.textfieldValue.length > 0
            && !this.as<InputState>().isWaiting;
    }

    public onOpen(): void {
        this.firstSelection = true;
    }

    public onPortalAfterClose(): void {
        const refInput: HTMLInputElement | undefined = this.refMTextfield?.refInput ?? undefined;
        if (
            refInput && document.activeElement !== refInput
        ) {
            this.as<InputManagement>().focusInput();
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
                    );
            } else {
                filteredResults = (this.sortedResult as MBaseSelectItem<unknown>[])
                    .filter(r =>
                        this.hasTextfieldValue
                        && r.value.toLowerCase().includes(this.textfieldValue.toLowerCase())
                    );
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

        if (
            this.throttleTimeoutActive
        ) {
            clearTimeout(this.throttleTimeout as NodeJS.Timeout);
            this.createThrottleTimeout();
        } else {
            this.isResultsPopupOpen = this.as<MediaQueries>().isMqMaxS;
            this.throttleTimeoutActive = true;
            this.createThrottleTimeout();
        }
    }

    public onKeydownEnter($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay && this.as<MediaQueries>().isMqMinS) {
            this.refBaseSelect.selectFocusedItem($event);
        }
        this.refBaseSelect.closePopup();
    }

    public onKeydownDown($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            if (this.firstSelection) {
                if (this.refBaseSelect.focusedIndex === -1) { this.refBaseSelect.focusedIndex = 0; }
                this.refBaseSelect.focusFirstSelected();
                this.onSelect({}, this.refBaseSelect.focusedIndex);
                this.firstSelection = false;
            } else {
                this.refBaseSelect.onKeydownDown($event);
            }
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

    public onKeydownHome($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownHome($event);
        }
    }

    public onKeydownEnd($event: KeyboardEvent): void {
        if (this.resultsCouldBeDisplay) {
            this.refBaseSelect.onKeydownEnd($event);
        }
    }

    private createThrottleTimeout(): void {
        if (this.throttle > 0) {
            this.throttleTimeout = window.setTimeout(() => {
                this.throttleTimeoutActive = false;

                this.updateResults();
            }, this.throttle);
        } else {
            this.throttleTimeoutActive = false;
            this.updateResults();
        }
    }

    private updateResults(): void {
        this.onFilterResults();

        if (!this.isResultsPopupOpen) {
            this.openResultsPopup();
        }

        this.refBaseSelect.focusedIndex = -1;
        this.emitFilterResults();
    }
}

const TypeaheadPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TYPEAHEAD_NAME, MTypeahead);
    }
};

export default TypeaheadPlugin;
