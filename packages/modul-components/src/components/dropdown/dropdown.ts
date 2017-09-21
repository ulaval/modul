import Vue from 'vue';
import { ModulVue } from '../../utils/vue/vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './dropdown.html?style=./dropdown.scss';
import { DROPDOWN_NAME } from '../component-names';
import { normalizeString } from '../../utils/str/str';
import { KeyCode } from '../../utils/keycode/keycode';
import { MDropDownItemInterface, BaseDropdown } from '../dropdown-item/dropdown-item';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';

const PAGE_STEP: number = 3;
const DROPDOWN_MAX_HEIGHT: number = 198;
const DROPDOWN_STYLE_TRANSITION: string = 'max-height 0.3s ease';

export interface SelectedValue {
    key: string | undefined;
    value: any;
    label: string | undefined;
}

export interface MDropdownInterface extends Vue {
    value: any;
    items: Vue[];
    selected: Array<SelectedValue>;
    currentElement: SelectedValue;
    addAction: boolean;
    nbItemsVisible: number;
    isDisabled: boolean;
    multiple: boolean;
    defaultFirstElement: boolean;
    setFocus(item: Vue): void;
    toggleDropdown(open: boolean): void;
}

@WithRender
@Component({
    mixins: [
        InputState,
        MediaQueries
    ]
})
export class MDropdown extends BaseDropdown implements MDropdownInterface {

    @Prop()
    public value: any;
    @Prop()
    public label: string;
    @Prop()
    public defaultText: string;
    @Prop()
    public defaultValue: any;
    @Prop({ default: false })
    public open: boolean;
    @Prop({ default: false })
    public editable: boolean;
    @Prop({ default: false })
    public multiple: boolean;
    @Prop()
    public width: string;
    @Prop({ default: false })
    public defaultFirstElement: boolean;
    @Prop()
    public textNoData: string;
    @Prop()
    public textNoMatch: string;

    public componentName: string = DROPDOWN_NAME;
    public isDisabled: boolean;

    public items: Vue[] = [];
    public selected: Array<SelectedValue> = [];
    public currentElement: SelectedValue = { 'key': undefined, 'value': undefined, 'label': '' };
    public addAction: true;
    public nbItemsVisible: number = 0;
    public selectedText: string = '';
    private internalOpen: boolean = false;
    private noItemsLabel: string;

    private textFieldLabelEl: HTMLElement;
    private textFieldInputValueEl: HTMLElement;

    public setFocus(elementFocus: Vue): void {
        for (let item of this.items) {
            if (item === elementFocus) {
                (item as MDropDownItemInterface).hasFocus = true;
            } else {
                (item as MDropDownItemInterface).hasFocus = false;
            }
        }
    }

    public getFocus(): MDropDownItemInterface | undefined {
        let elementFocus: MDropDownItemInterface | undefined = undefined;

        for (let item of this.items) {
            if ((item as MDropDownItemInterface).hasFocus) {
                elementFocus = (item as MDropDownItemInterface);
                break;
            }
        }

        return elementFocus;
    }

    public toggleDropdown(open: boolean): void {
        this.propOpen = open;
    }

    protected mounted(): void {
        let textField = this.$children[0].$children[0].$children[0];
        this.textFieldLabelEl = textField.$refs.label as HTMLElement;
        this.textFieldInputValueEl = textField.$refs.inputValue as HTMLElement;
        this.propOpen = this.open;
    }

    protected beforeDestroy() {
        console.log('Dropdown', 'beforeDestroy');
    }

    protected destroyed() {
        console.log('Dropdown', 'destroyed');
    }

    @Watch('selected')
    private selectedChanged(value): void {
        if (!this.as<InputStateMixin>().isDisabled) {
            let values: any[] = [];

            for (let selectedValue of this.selected) {
                values.push(selectedValue.value);
            }

            if (value.length == 0 && this.defaultValue) {
                values.push(this.defaultValue);
            }

            this.selectedText = '';
            for (let item of this.selected) {
                if (this.selectedText != '') {
                    this.selectedText += ', ';
                }
                this.selectedText += item.label;
            }

            this.$emit('change', values, this.addAction);

            if (this.multiple) {
                this.$emit('input', values, this.addAction);
            } else {
                this.$emit('input', values[0], this.addAction);
            }
        }
    }

    @Watch('currentElement')
    private currentElementChanged(value): void {
        this.$emit('elementSelected', this.currentElement.value, this.addAction);
    }

    @Watch('open')
    private openChanged(open: boolean): void {
        this.propOpen = open;
    }

    @Watch('isDisabled')
    private isDisabledChanged(disabled: boolean): void {
        if (disabled) {
            this.propOpen = false;
        }
    }

    public get propOpen(): boolean {
        return this.internalOpen;
    }

    public set propOpen(open: boolean) {
        this.internalOpen = open != undefined ? open : false;
        this.$nextTick(() => {
            if (open) {
                this.$emit('open');
            } else {
                this.$emit('close');
            }
        });
    }

    private get propEditable(): boolean {
        return this.editable && this.selected.length == 0;
    }

    private get propTextNoData(): string {
        if (this.textNoData) {
            return this.textNoData;
        } else {
            return this.$i18n.translate('m-dropdown:no-data');
        }
    }

    private get propTextNoMatch(): string {
        if (this.textNoMatch) {
            return this.textNoMatch;
        } else {
            return this.$i18n.translate('m-dropdown:no-result');
        }
    }

    private get showNoItemsLabel(): boolean {
        let show: boolean = false;

        if (this.nbItemsVisible == 0) {
            this.noItemsLabel = this.items.length == 0 ? this.propTextNoData : this.propTextNoMatch;
            show = true;
        }

        return show;
    }

    private filterDropdown(text: string): void {
        if (this.selected.length == 0) {
            for (let item of this.items) {
                if (!(item as MDropDownItemInterface).inactif) {
                    (item as MDropDownItemInterface).filter = normalizeString(text.trim());
                }
            }
        }
    }

    private keyupReference($event): void {
        if (!this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_SPACE)) {
            $event.preventDefault();
            (this.$refs.mDropdownValue as Vue).$el.click();
        }

        if (this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_END || $event.keyCode == KeyCode.M_PAGE_DOWN)) {
            $event.preventDefault();
            let htmlElement: HTMLElement = this.$el.querySelector(`[data-index='0']`) as HTMLElement;
            if (htmlElement) {
                htmlElement.focus();
            }
        }
    }

    private keyupItem($event: KeyboardEvent): void {
        let element: Vue | undefined = undefined;
        let focusElement: MDropDownItemInterface | undefined = this.getFocus();
        let itemsEnabled: MDropDownItemInterface[] = (this.items as MDropDownItemInterface[]).filter(item => (item.disabled === false && item.visible === true));

        switch ($event.keyCode) {
            case KeyCode.M_UP:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    if (index == 0) {
                        element = itemsEnabled[0];
                    } else {
                        element = itemsEnabled[index - 1];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;
            case KeyCode.M_HOME:
                element = itemsEnabled[0];
                break;
            case KeyCode.M_PAGE_UP:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    index -= PAGE_STEP;

                    if (index < 0) {
                        element = itemsEnabled[0];
                    } else {
                        element = itemsEnabled[index];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;
            case KeyCode.M_DOWN:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    if (index == itemsEnabled.length - 1) {
                        element = itemsEnabled[itemsEnabled.length - 1];
                    } else {
                        element = itemsEnabled[index + 1];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;

            case KeyCode.M_END:
                element = itemsEnabled[itemsEnabled.length - 1];
                break;
            case KeyCode.M_PAGE_DOWN:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    index += PAGE_STEP;

                    if (index > itemsEnabled.length - 1) {
                        element = itemsEnabled[itemsEnabled.length - 1];
                    } else {
                        element = itemsEnabled[index];
                    }
                } else {
                    let index: number = (PAGE_STEP < itemsEnabled.length ? PAGE_STEP - 1 : itemsEnabled.length - 1);
                    element = itemsEnabled[index];
                }
                break;
            case KeyCode.M_ENTER:
            case KeyCode.M_RETURN:
                if (focusElement) {
                    (focusElement as MDropDownItemInterface).onSelectElement();
                }
                return;
        }

        if (element) {
            element.$el.focus();
        }
    }

    private transitionEnter(el: HTMLElement, done: any): void {
        this.$nextTick(() => {
            if (this.as<MediaQueriesMixin>().isMqMinS) {
                let height: number = el.clientHeight > DROPDOWN_MAX_HEIGHT ? DROPDOWN_MAX_HEIGHT : el.clientHeight;
                el.style.webkitTransition = DROPDOWN_STYLE_TRANSITION;
                el.style.transition = DROPDOWN_STYLE_TRANSITION;
                el.style.overflowY = 'hidden';
                el.style.maxHeight = '0';
                el.style.width = this.$el.clientWidth + 'px';
                setTimeout(() => {
                    el.style.maxHeight = height + 'px';
                    done();
                }, 0);
            } else {
                done();
            }
        });

    }

    private transitionAfterEnter(el: HTMLElement): void {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            setTimeout(() => {
                el.style.maxHeight = DROPDOWN_MAX_HEIGHT + 'px';
                el.style.overflowY = 'auto';
            }, 300);
        }
    }

    private transitionLeave(el: HTMLElement, done: any): void {
        this.$nextTick(() => {
            if (this.as<MediaQueriesMixin>().isMqMinS) {
                let height: number = el.clientHeight;
                el.style.width = this.$el.clientWidth + 'px';
                el.style.maxHeight = height + 'px';
                el.style.overflowY = 'hidden';
                el.style.maxHeight = '0';
                setTimeout(() => {
                    el.style.maxHeight = 'none';
                    done();
                }, 300);
            } else {
                done();
            }
        });
    }
}

const DropdownPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(DROPDOWN_NAME, MDropdown);
    }
};

export default DropdownPlugin;
