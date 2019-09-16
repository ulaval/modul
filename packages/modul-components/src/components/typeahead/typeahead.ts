import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import { KeyCode } from '../../utils/keycode/keycode';
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
        MediaQueries
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

    @Prop({ default: 0 })
    public throttle: number;

    @Prop()
    public placeholder: string;

    @Prop()
    public focus: boolean;

    @Prop({ default: 0 })
    public maxLength: number;

    @Prop({ default: true })
    public lengthOverflow: boolean;

    @Prop()
    public characterCount: boolean;

    @Prop({ default: 0 })
    public characterCountThreshold: number;

    public $refs: {
        mTextfield: MTextfield;
        result: HTMLUListElement;
        resultsList: HTMLElement;
        researchInput: HTMLElement;
        mBaseSelect: MBaseSelect;
    };

    public id: string = `${TYPEAHEAD_NAME}-${uuid.generate()}`;
    public isResultsPopupOpen: boolean = false;
    public textfieldValueInternal: string = '';
    public isTexfieldFocus: boolean = false;
    public filteredResults: any[] = [];
    public ariaControls: string = this.id + '-controls';
    public throttleTimeoutActive: boolean = false;
    private throttleTimeout: number;

    @Emit('input')
    public emitInput(event: string): void { }

    @Emit('keydown')
    public emitKeydown(event: KeyboardEvent): void { }

    @Emit('keyup')
    public emitKeyup(event: KeyboardEvent): void { }

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

    @Watch('focus', { immediate: true })
    public onFocusChange(focus: boolean): void {
        if (focus) {
            this.onFocus();
        }
    }

    public set textfieldValue(value: string) {
        this.textfieldValueInternal = value;
    }

    public get textfieldValue(): string {
        return this.textfieldValueInternal;
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
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            return this.hasResults && this.isTexfieldFocus && this.hasTextfieldValue && this.as<InputState>().active;
        } else {
            return this.isTexfieldFocus && this.as<InputState>().active;
        }
    }

    public get hasSomeAResultSelected(): boolean {
        return this.filteredResults.some((e, index) => this.isSelected(index));
    }

    public async openResultsPopup(): Promise<void> {
        if (this.isResultsPopupOpen) {
            return;
        }

        if (this.resultsCouldBeDisplay) {
            this.$refs.mBaseSelect.setFocusedIndex(0);
            this.isResultsPopupOpen = true;
        } else {
            this.isResultsPopupOpen = false;
        }

    }

    public closeResultsPopup(): void {
        this.isResultsPopupOpen = false;
    }

    onSelect(option: any, index: number): void {
        this.textfieldValue = this.filteredResults[index];
        this.emitInput(this.textfieldValue);
    }

    public isSelected(index: number): boolean {
        return this.isResultsPopupOpen && this.textfieldValue.indexOf(this.filteredResults[index]) > -1;
    }

    public focusOnResearchInput(): void {
        this.$refs.researchInput.focus();
    }

    public onKeyup(event: KeyboardEvent): void {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === KeyCode.M_UP || event.keyCode === KeyCode.M_DOWN) {
            return;
        }

        window.clearTimeout(this.throttleTimeout);
        this.throttleTimeoutActive = true;

        this.throttleTimeout = window.setTimeout(() => {
            this.throttleTimeoutActive = false;

            this.onFilterResults();

            if (this.filteredResults.length > 0) {
                this.openResultsPopup();
            } else {
                this.closeResultsPopup();
            }

            this.emitFilterResults();
        }, this.throttle);

        this.emitKeyup(event);
    }

    public onKeydownEnter($event: KeyboardEvent): void {
        if (this.isResultsPopupOpen && this.filteredResults.length > 0) {
            this.$refs.mBaseSelect.selectFocusedItem();
            this.$refs.mBaseSelect.closePopup();
        }

    }

    public onFilterResults(): void {
        if (this.filterResultsManually) {
            this.filteredResults = this.results;
        } else {
            this.filteredResults = this.results
                .filter(r =>
                    this.hasTextfieldValue
                    &&
                    r.toLowerCase().includes(this.textfieldValue.toLowerCase())
                    &&
                    r.toLowerCase() !== this.textfieldValue.toLowerCase())
                .sort();
        }
    }

    getTextHighlight(item): string {
        let regex: RegExp = RegExp(this.textfieldValue, 'i');
        return item.replace(regex, '<b>$&</b>');
    }

    public onInput(event: string): void {
        this.emitInput(event);
    }

    public onFocus(): void {
        this.isTexfieldFocus = true;
    }

    public onBlur(): void {
        this.isTexfieldFocus = false;
    }

    onKeydownDown($event: KeyboardEvent): void {
        if (this.isResultsPopupOpen) {
            this.$refs.mBaseSelect.onKeydownDown($event);
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (this.isResultsPopupOpen) {
            this.$refs.mBaseSelect.onKeydownUp($event);
        }
    }

    onKeydownTab($event: KeyboardEvent): void {
        if (this.isResultsPopupOpen) {
            this.$refs.mBaseSelect.onKeydownTab($event);
        }
    }

    onKeydownEsc($event: KeyboardEvent): void {
        if (this.isResultsPopupOpen) {
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
