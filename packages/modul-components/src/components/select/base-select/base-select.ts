import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { POPUP_NAME as DIRECTIVE_POPUP_NAME } from '../../../directives/directive-names';
import { MPopupDirective } from '../../../directives/popup/popup';
import { InputWidth } from '../../../mixins/input-width/input-width';
import { MediaQueries, MediaQueriesMixin } from '../../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../../utils/props-validation/props-validation';
import { ModulVue } from '../../../utils/vue/vue';
import { POPUP_NAME } from '../../component-names';
import { MPopup } from '../../popup/popup';
import { MSelectItem } from '../../select/select-item/select-item';
import WithRender from './base-select.html';
import './base-select.scss';

const BASE_SELECT_STYLE_TRANSITION: string = 'max-height 0.3s ease';

@WithRender
@Component({
    components: {
        MSelectItem,
        [POPUP_NAME]: MPopup

    },
    directives: {
        [DIRECTIVE_POPUP_NAME]: MPopupDirective
    },
    mixins: [
        InputWidth,
        MediaQueries
    ]
})
export class MBaseSelect extends ModulVue {

    @Prop()
    public readonly items: any[];

    @Prop()
    public readonly selectedItems: any[];

    @Prop()
    public readonly active: boolean;

    @Prop({ required: true })
    public readonly controlId: string;

    @Prop({ default: false })
    public readonly open: boolean;

    @Prop({ default: true })
    public readonly closeOnSelect: boolean;

    @Prop({ default: false })
    public readonly hideRadioButtonMobile: boolean;

    @Prop({ default: false })
    public readonly sidebarFullHeight: boolean;

    @Prop({ default: true })
    public readonly enableAnimation: boolean;

    @Prop({ default: false })
    public readonly virtualScroll: boolean;

    @Prop({
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly listMinWidth: string;

    @Prop({
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly listMaxHeight: string;

    public $refs: {
        items: HTMLUListElement;
        popup: MPopup;
    };

    public focusedIndex: number = -1;
    private internalOpen: boolean = false;

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void { }

    @Emit('open')
    public async emitOpen(): Promise<void> {
        await this.$nextTick();
        this.focusFirstSelected();
        this.scrollToFocused();
    }

    @Emit('close')
    public emitClose(): void {
        this.focusedIndex = -1;
    }

    @Watch('open', { immediate: true })
    public onOpenChange(open: boolean): void {
        if (open !== this.internalOpen) {
            this.internalOpen = open;
        }
    }

    public set popupOpen(open: boolean) {
        this.internalOpen = open;
        this.emitUpdateOpen(open);
    }

    public get popupOpen(): boolean {
        return this.internalOpen;
    }

    public get ariaControls(): string {
        return this.controlId + '-controls';
    }

    public get listMaxHeightProps(): string | undefined {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            return this.listMaxHeight;
        }
    }

    public select(option: any, index: number, $event: Event): void {
        this.$emit('select-item', option, index, $event);
    }

    public getItemProps(item: any, index: number): any {
        return {
            value: item,
            focused: index === this.focusedIndex,
            selected: this.isSelected(item),
            hideRadioButtonMobile: this.hideRadioButtonMobile
        };
    }

    public getItemHandlers(item: any, index: number): any {
        return {
            click: (event: Event): void => this.onSelectItem(item, index, event)
        };
    }

    public togglePopup(): void {
        if (this.active) {
            this.popupOpen = !this.popupOpen;
        }
    }

    public closePopup(): void {
        this.popupOpen = false;
    }

    public setFocusedIndex(index): void {
        this.focusedIndex = index;
    }

    public selectFocusedItem($event: Event): void {
        this.select(this.items[this.focusedIndex], this.focusedIndex, $event);
    }

    public focusFirstSelected(): void {
        if (this.selectedItems && this.selectedItems.length > 0) {
            this.focusedIndex = this.items.indexOf(this.selectedItems[0]);
        } else {
            this.focusedIndex = 0;
        }
    }

    public focusNextItem(): void {
        if (this.focusedIndex > -1) {
            this.focusedIndex++;
            if (this.focusedIndex >= this.items.length) {
                this.focusedIndex = 0;
            }
        } else {
            this.focusedIndex = this.items.length === 0 ? -1 : 0;
        }
        this.scrollToFocused();
    }

    public focusPreviousItem(): void {
        if (this.focusedIndex > -1) {
            this.focusedIndex--;
            if (this.focusedIndex < 0) {
                this.focusedIndex = this.items.length - 1;
            }
        } else {
            this.focusedIndex = this.items.length - 1;
        }
        this.scrollToFocused();
    }

    public update(): void {
        this.$refs.popup.update();
    }

    public transitionEnter(el: HTMLElement, done: any): void {
        if (this.enableAnimation) {
            this.$nextTick(() => {
                if (this.as<MediaQueriesMixin>().isMqMinS) {
                    let height: number = el.clientHeight;

                    el.style.transition = BASE_SELECT_STYLE_TRANSITION;
                    el.style.overflowY = 'hidden';
                    el.style.maxHeight = '0';
                    el.style.width = this.$el.clientWidth + 'px';
                    if (this.listMinWidth) {
                        el.style.minWidth = this.listMinWidth;
                    }
                    requestAnimationFrame(() => {
                        el.style.maxHeight = height + 'px';
                        done();
                    });
                } else {
                    done();
                }

            });
        } else {
            done();
        }
    }

    public transitionLeave(el: HTMLElement, done: any): void {
        if (this.enableAnimation) {
            this.$nextTick(() => {
                if (this.as<MediaQueriesMixin>().isMqMinS) {
                    let height: number = el.clientHeight;

                    el.style.maxHeight = height + 'px';
                    el.style.maxHeight = '0';

                    setTimeout(() => {
                        el.style.maxHeight = 'none';
                        done();
                    }, 300);
                } else {
                    done();
                }
            });
        } else {
            done();
        }
    }

    // keyboard navigation of a drowdown
    // tab or esc : close the popup
    // up and down : change the focused option
    // enter : select the focused option and close popup
    // space : open the popup
    public onKeydownDown($event: KeyboardEvent): void {
        if (!this.popupOpen) {
            this.togglePopup();
        } else {
            this.focusNextItem();
        }
    }

    public onKeydownUp($event: KeyboardEvent): void {
        if (!this.popupOpen) {
            this.togglePopup();
        }
        this.focusPreviousItem();
    }

    public onKeydownSpace($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.select(this.items[this.focusedIndex], this.focusedIndex, $event);
            this.closePopup();
        } else {
            this.togglePopup();
        }
    }

    public onKeydownTab($event: KeyboardEvent): void {
        this.closePopup();
    }

    public onKeydownEsc($event: KeyboardEvent): void {
        this.closePopup();
    }

    public onKeydownEnter($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.select(this.items[this.focusedIndex], this.focusedIndex, $event);
            this.closePopup();
        } else {
            this.togglePopup();
        }
    }

    public onKeydownHome($event: KeyboardEvent): void {
        if (this.popupOpen) {
            this.focusedIndex = 0;
            this.scrollToFocused();
        }
    }

    public onKeydownEnd($event: KeyboardEvent): void {
        if (this.popupOpen) {
            this.focusedIndex = this.items.length - 1;
            this.scrollToFocused();
        }
    }

    public onKeydownLetter($event: KeyboardEvent): void {
        if (/^[a-z0-9]$/i.test($event.key)) {
            this.findFirstItemWithLetter($event.key);
        }
    }

    private onSelectItem(option: any, index: number, $event: Event): void {
        this.select(option, index, $event);
        if (this.closeOnSelect) {
            this.closePopup();
        }
    }

    private findFirstItemWithLetter(key: string): void {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            const index: number = this.items.indexOf(this.items.find((item: any) => item.startsWith(key)));
            if (index !== -1) {
                this.focusedIndex = index;
                this.scrollToFocused();
            }
        }
    }

    private scrollToFocused(): void {
        if (this.focusedIndex > -1 && this.as<MediaQueriesMixin>().isMqMinS) {

            let container: HTMLElement = this.$refs.items;
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

    private isSelected(option: any): boolean {
        if (this.selectedItems && this.selectedItems.length > 0) {
            return this.selectedItems.indexOf(option) > -1;
        }
        return false;
    }
}
