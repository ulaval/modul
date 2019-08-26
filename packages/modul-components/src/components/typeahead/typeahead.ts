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
import { MSelectItem } from '../select/select-item/select-item';
import TextfieldPlugin from '../textfield/textfield';
import WithRender from './typeahead.html?style=./typeahead.scss';

@WithRender
@Component({
    components: {
        MSelectItem
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
    public placeholder: string;

    @Prop()
    public results: any[];

    @Prop()
    public waitingResults: boolean;

    @Prop()
    public filterResultsManually: boolean;

    @Prop({ default: 0 })
    public throttle: number;

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
        result: HTMLUListElement;
        resultsList: HTMLElement;
        researchInput: HTMLElement;
    };

    public id: string = `${TYPEAHEAD_NAME}-${uuid.generate()}`;
    public focusedIndex: number = -1;
    public isResultsPopupOpen: boolean = false;
    public textfieldValueInternal: string = '';
    public isTexfieldFocus: boolean = false;
    public filteredResults: any[] = [];
    public filteredResultsWithStyles: any[] = [];
    public throttleTimeoutActive: boolean = false;
    private throttleTimeout: any;

    @Emit('open')
    public async onOpenResultPopup(): Promise<void> {
        await this.$nextTick();
        this.scrollToFocused();
    }

    @Emit('filter-results')
    public filterResultsEmit(): void { }

    @Emit('input')
    public onInput(): void {
        this.openResultsPopup();
    }

    @Watch('results', { immediate: true })
    public onResultsChange(): void {
        this.onFilterResulats();
    }

    @Watch('value', { immediate: true })
    public onValueChange(newValue: string): void {
        this.textfieldValue = newValue;
    }

    @Watch('focus', { immediate: true })
    public onFocusChange(focus: boolean): void {
        if (focus) {
            this.onFocus();
        }
    }

    public set textfieldValue(value: string) {
        this.textfieldValueInternal = value;
        this.$emit('update:value', value);
    }

    public get textfieldValue(): string {
        return this.textfieldValueInternal;
    }

    public get ariaControls(): string {
        return this.id + '-controls';
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

    public get isResultPopupActive(): boolean {
        return this.isResultsPopupOpen && !this.waitingResults && this.as<InputState>().active && !this.throttleTimeoutActive;
    }

    public get resultsCouldBeDisplay(): boolean {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            return this.hasResults && this.isTexfieldFocus && this.hasTextfieldValue && this.as<InputState>().active;
        } else {
            return this.isTexfieldFocus && this.as<InputState>().active;
        }
    }

    public openResultsPopup(): void {
        if (this.isResultsPopupOpen) {
            return;
        }
        if (this.resultsCouldBeDisplay) {
            this.isResultsPopupOpen = true;
        }
    }

    public closeResultsPopup(): void {
        if (!this.isResultsPopupOpen) {
            return;
        }
        this.isResultsPopupOpen = false;
    }

    public selectAndCloseResultWindow(index): void {
        this.select(index);
        this.closeResultsPopup();
    }

    public onFocus(): void {
        this.isTexfieldFocus = true;
    }

    public onBlur(): void {
        this.isTexfieldFocus = false;
    }

    public get hasSomeAResultSelected(): boolean {
        return this.filteredResults.some((e, index) => this.isSelected(index));
    }

    public select(index: number): void {
        if (this.hasSomeAResultSelected) {
            this.focusedIndex = index;
        } else {
            this.focusedIndex = 0;
        }
        this.textfieldValue = this.filteredResults[this.focusedIndex];
    }

    public isSelected(index: number): boolean {
        return this.isResultsPopupOpen ? this.textfieldValue.indexOf(this.filteredResults[index]) > -1 : false;
    }

    @Emit('keydup')
    public onKeyup(event: KeyboardEvent): void {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === KeyCode.M_UP || event.keyCode === KeyCode.M_DOWN) {
            return;
        }

        clearTimeout(this.throttleTimeout);
        this.throttleTimeoutActive = true;

        this.throttleTimeout = setTimeout(() => {
            this.throttleTimeout = undefined;
            this.throttleTimeoutActive = false;
            this.onFilterResulats();
            this.filterResultsEmit();
        }, this.throttle);
    }

    @Emit('keydown')
    public onKeydown(event: KeyboardEvent): void { }

    public onFilterResulats(): void {
        if (this.filterResultsManually) {
            this.filteredResults = this.results;
        } else {
            this.filteredResults = this.results.filter((r) => {
                if (this.hasTextfieldValue) {
                    return r.toLowerCase().includes(this.textfieldValue.toLowerCase());
                }
            }).sort();
        }

        this.filteredResultsWithStyles = this.filteredResults.map((fr) => {
            let regex: RegExp = RegExp(this.textfieldValue, 'i');
            return fr.replace(regex, '<b>$&</b>');
        });

        this.focusedIndex = -1;
        this.focusNextItem();
    }

    public onKeydownUp($event: KeyboardEvent): void {
        if (!this.isResultPopupActive) {
            return;
        }
        this.focusPreviousItem();
        this.select(this.focusedIndex);
    }

    public onKeydownDown($event: KeyboardEvent): void {
        if (!this.isResultPopupActive) {
            return;
        }
        this.focusNextItem();
        this.select(this.focusedIndex);
    }

    public onKeydownTab($event: KeyboardEvent): void {
        if (this.as<MediaQueries>().isMqMinS) {
            this.closeResultsPopup();
        }
    }

    public onKeydownEsc($event: KeyboardEvent): void {
        if (this.as<MediaQueries>().isMqMinS) {
            this.closeResultsPopup();
        }
    }

    public onKeydownEnter($event: KeyboardEvent): void {
        if (!this.isResultPopupActive) {
            return;
        }
        if (this.focusedIndex > -1) {
            this.select(this.focusedIndex);
            this.closeResultsPopup();
        }
    }

    public focusOnResearchInput(): void {
        this.$refs.researchInput.focus();
    }

    private scrollToFocused(): void {
        if (!this.isResultPopupActive) {
            return;
        }
        if (this.focusedIndex > -1 && this.as<MediaQueriesMixin>().isMqMinS) {

            let container: HTMLElement = this.$refs.resultsList;
            if (container) {
                let element: HTMLElement = container.children[this.focusedIndex] as HTMLElement;

                if (element) {
                    let top: number = element.offsetTop;
                    let bottom: number = element.offsetTop + element.offsetHeight;
                    let viewRectTop: number = container.scrollTop;
                    let viewRectBottom: number = viewRectTop + container.clientHeight;
                    if (top < viewRectTop) {
                        container.scrollTop = top;
                    } else if (bottom > viewRectBottom) {
                        container.scrollTop = bottom - container.clientHeight;
                    }
                }
            }
        }
    }

    private focusNextItem(): void {
        if (!this.isResultPopupActive) {
            return;
        }
        if (this.focusedIndex > -1) {
            this.focusedIndex++;
            if (this.focusedIndex >= this.filteredResults.length) {
                this.focusedIndex = 0;
            }
        } else {
            this.focusedIndex = this.filteredResults.length === 0 ? -1 : 0;
        }
        this.scrollToFocused();
    }

    private focusPreviousItem(): void {
        if (!this.isResultPopupActive) {
            return;
        }
        if (this.focusedIndex > -1) {
            this.focusedIndex--;
            if (this.focusedIndex < 0) {
                this.focusedIndex = this.filteredResults.length - 1;
            }
        } else {
            this.focusedIndex = this.filteredResults.length - 1;
        }
        this.scrollToFocused();
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
