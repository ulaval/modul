import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputStateTagStyle } from '../../mixins/input-state/input-state';
import { InputMaxWidth } from '../../mixins/input-width/input-width';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { AUTOCOMPLETE_NAME } from '../component-names';
import { MDropdown } from '../dropdown/dropdown';
import { MDropdownItem } from '../dropdown/dropdown-item/dropdown-item';
import WithRender from './autocomplete.html?style=./autocomplete.scss';

export interface MAutoCompleteResult {
    label: string;
    value: string;
}

@WithRender
@Component({
    components: {
        MDropdown,
        MDropdownItem
    }
})
export class MAutocomplete extends ModulVue {
    @Model('change')
    public readonly model: string;

    @Prop({ default: (): [] => [] })
    public readonly results: MAutoCompleteResult[];

    @Prop({ default: 250 })
    public readonly throttle: number;

    @Prop({ default: 1 })
    public readonly minimumChars: number;

    @Prop()
    public readonly textNoMatch: string;

    @Prop()
    public readonly maxLength: number;

    @Prop()
    public readonly placeholder: string;

    @Prop()
    public readonly focus: boolean;

    @Prop({ default: true })
    public readonly clearInvalidSelectionOnClose: boolean;

    @Prop()
    public readonly open: boolean;

    @Prop()
    public readonly labelUp: boolean;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly errorMessage: string;

    @Prop()
    public readonly validMessage: string;

    @Prop()
    public readonly helperMessage: string;

    @Prop({ default: '100%' })
    public readonly width: string;

    @Prop({ default: InputMaxWidth.Regular })
    public readonly maxWidth: string;

    @Prop()
    public readonly label: string;

    @Prop()
    public readonly requiredMarker: boolean;

    @Prop({
        default: InputStateTagStyle.Default,
        validator: value => Enums.toValueArray(InputStateTagStyle).indexOf(value) !== -1
    })
    public readonly tagStyle: string;

    selection: string = '';
    inputText: string = '';
    items: MAutoCompleteResult[] = [];
    loading: boolean = false;
    throttleTimeout: any;
    autocomplete: string = 'new-password';

    created(): void {
        this.refreshItemsOnSelectionChange(this.model);
        this.selection = this.model;
    }

    @Watch('model')
    onModelChange(): void {
        this.refreshItemsOnSelectionChange(this.model);
        this.selection = this.model;
    }

    @Emit('change')
    @Watch('selection')
    onSelection(): string {
        this.refreshItemsOnSelectionChange(this.selection);
        if (this.selection === '') {
            this.inputText = this.selection;
        }
        return this.selection;
    }

    @Watch('results')
    onResults(): void {
        this.items = this.results;
        this.loading = false;
    }

    onInputChangeThrottled(value: string): void {
        clearTimeout(this.throttleTimeout);
        this.throttleTimeout = setTimeout(() => {
            this.throttleTimeout = undefined;
            this.onInputChange(value);
        }, this.throttle);
    }

    get showNoResult(): boolean {
        return !this.loading &&
            this.items.length === 0 &&
            this.inputText.length >= this.minimumChars;
    }

    get propTextNoMatch(): string {
        return (this.textNoMatch ? this.textNoMatch : this.$i18n.translate('m-dropdown:no-result'));
    }

    private refreshItemsOnSelectionChange(value: string): void {
        let label: string = '';
        const result: MAutoCompleteResult | undefined = this.results.find(r => r.value === value);
        if (result) {
            label = result.label;
        }

        this.items = value !== '' ? [{ label: label, value: value, ...result }] : [];
    }

    private onInputChange(value: string): void {
        this.inputText = value;
        if (value === '') {
            this.items = [];
        } else if (value.length >= this.minimumChars) {
            this.emitComplete(value);
            this.loading = true;
        }
    }

    @Emit('complete')
    private emitComplete(value: string): string {
        return value;
    }
}

const AutoCompletePlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(AUTOCOMPLETE_NAME, 'plugin.install');
        v.component(AUTOCOMPLETE_NAME, MAutocomplete);
    }
};

export default AutoCompletePlugin;
