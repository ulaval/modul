import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import { POPUP_NAME as DIRECTIVE_POPUP_NAME } from '../../../directives/directive-names';
import { MPopupDirective } from '../../../directives/popup/popup';
import { InputWidth } from '../../../mixins/input-width/input-width';
import { MediaQueries, MediaQueriesMixin } from '../../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../../utils/props-validation/props-validation';
import uuid from '../../../utils/uuid/uuid';
import { ModulVue } from '../../../utils/vue/vue';
import { POPUP_NAME } from '../../component-names';
import { MPopup } from '../../popup/popup';
import { MSelectItem } from '../../select/select-item/select-item';
import WithRender from './base-select.html';
import './base-select.scss';

const BASE_SELECT_STYLE_TRANSITION: string = 'max-height 0.3s ease';

export interface MBaseSelectItem<T> {
    value: string,
    disabled?: boolean,
    hideRadioButtonMobile?: boolean,
    data?: T
}

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
    public readonly items: MBaseSelectItem<unknown>[] | string[];

    @Prop()
    public readonly selectedItems: string[];

    @Prop()
    public readonly multiselect: boolean;

    @Prop()
    public readonly active: boolean;

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

    @Prop()
    public readonly listboxAriaLabelledby?: string;

    @Ref('items')
    public readonly refItems: HTMLUListElement;

    @Ref('popup')
    public readonly refPopup: MPopup;

    public readonly listboxId: string = `listbox-${uuid.generate()}`;
    public focusedIndex: number = -1;
    private internalOpen: boolean = false;

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void { }

    @Emit('open')
    public async emitOpen(): Promise<void> {
        await this.$nextTick();
        this.focusFirstSelected();
    }

    @Emit('close')
    public emitClose(): void {
        this.focusedIndex = -1;
    }

    public emitSelectItem(option: MBaseSelectItem<unknown> | string, index: number, event: Event): void {
        this.$emit('select-item', option, index, event);
        if (this.closeOnSelect) {
            this.closePopup();
        }
    }

    @Watch('open', { immediate: true })
    public onOpenChange(open: boolean): void {
        if (open != this.internalOpen) {
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

    public get listMaxHeightProps(): string | undefined {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            return this.listMaxHeight;
        }
    }

    public get itemIds(): string[] {
        return this.items.map(() => uuid.generate());
    }

    public get ariaActivedescendantId(): string {
        if (this.selectedItems && this.selectedItems.length > 0) {
            let ids: string[] = [];
            this.items.forEach((item, index) => {
                if (this.selectedItems.some(i => {
                    return this.itemsIsStringArray ? i === item : i === item.value
                })) {
                    ids.push(this.itemIds[index]);
                }
            })
            return ids.join(' ');
        }
        return this.focusedIndex >= 0 ? this.itemIds[this.focusedIndex] : '';
    }

    public get itemsIsStringArray(): boolean {
        if (this.items.length === 0) return false;
        return typeof this.items[0] === 'string';
    }

    public getItemProps(item: MBaseSelectItem<unknown> | string, index: number): any {
        return {
            id: this.itemIds[index],
            value: this.itemsIsStringArray ? item : (item as MBaseSelectItem<unknown>).value,
            focused: index === this.focusedIndex,
            selected: this.isSelected(item),
            multiselect: this.multiselect,
            disabled: this.itemsIsStringArray ? undefined : (item as MBaseSelectItem<unknown>).disabled,
            hideRadioButtonMobile: this.hideRadioButtonMobile || this.itemsIsStringArray ? false : (item as MBaseSelectItem<unknown>).hideRadioButtonMobile,
        };
    }

    public getItemHandlers(item: MBaseSelectItem<unknown> | string, index: number): any {
        return {
            click: (event: MouseEvent): void => this.emitSelectItem(item, index, event),
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
        this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
    }

    public focusFirstSelected(): void {
        if (this.items.length > 0 && this.selectedItems && this.selectedItems.length > 0) {
            if (this.itemsIsStringArray) {
                this.focusedIndex = (this.items as string[]).indexOf(this.selectedItems[0]);
            } else {
                const items = this.items as MBaseSelectItem<unknown>[];
                const findSelectedItem = items.find((items) => items.value === this.selectedItems[0]);

                this.focusedIndex = findSelectedItem ? items.indexOf(findSelectedItem) : 0;
            }
        } else {
            this.focusedIndex = 0;
        }

        if (
            !this.itemsIsStringArray
            && this.items.length > 0
            && (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].disabled
        ) {
            this.focusNextItem();
        } else {
            this.scrollToFocused();
        }
    }

    public focusNextItem(): void {
        if (this.focusedIndex < 0 || this.focusedIndex >= this.items.length - 1) return;
        if (this.itemsIsStringArray) {
            this.focusedIndex++;
        } else {
            const items = this.items as MBaseSelectItem<unknown>[];
            if (this.focusedIndex + 1 === items.length - 1 && items[items.length - 1].disabled) {
                return;
            } else {
                this.focusedIndex++;
                if (items[this.focusedIndex].disabled) {
                    this.focusNextItem();
                }
            }
        }

        this.scrollToFocused();
    }

    public focusPreviousItem(): void {
        if (this.focusedIndex <= 0) return;

        if (this.itemsIsStringArray) {
            this.focusedIndex--;
        } else {
            const items = this.items as MBaseSelectItem<unknown>[];
            if (this.focusedIndex - 1 === 0 && items[0].disabled) {
                return;
            } else {
                this.focusedIndex--;
                if (items[this.focusedIndex].disabled) {
                    this.focusPreviousItem();
                }
            }
        }
        this.scrollToFocused();
    }

    public update(): void {
        this.refPopup.update();
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
            this.scrollToFocused();
        }
    }

    public onKeydownUp($event: KeyboardEvent): void {
        this.focusPreviousItem();
    }

    public onKeydownSpace($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
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
            this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
            this.closePopup();
        } else {
            this.togglePopup();
        }
    }

    public onKeydownHome($event: KeyboardEvent): void {
        if (this.popupOpen) {
            this.focusedIndex = 0;

            if (
                !this.itemsIsStringArray
                && this.items.length > 0
                && (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].disabled
            ) {
                this.focusNextItem();
            } else {
                this.scrollToFocused();
            }
        }
    }

    public onKeydownEnd($event: KeyboardEvent): void {
        if (this.popupOpen) {
            this.focusedIndex = this.items.length - 1;

            if (
                !this.itemsIsStringArray
                && this.items.length > 0
                && (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].disabled
            ) {
                this.focusPreviousItem();
            } else {
                this.scrollToFocused();
            }
        }
    }

    public onKeydownLetter($event: KeyboardEvent): void {
        if (/^[a-z0-9]$/i.test($event.key)) {
            this.findFirstItemWithLetter($event.key);
        }
    }

    private findFirstItemWithLetter(key: string): void {
        // if (this.as<MediaQueriesMixin>().isMqMinS) {
        //     const findItem = this.items.find(
        //         (item: MBaseSelectItem<unknown> | string) => {
        //             if (
        //                 this.itemsIsStringArray
        //             ) {
        //                 return (item as string).startsWith(key)
        //             }
        //             return (item as MBaseSelectItem<unknown>).value.startsWith(key)
        //         }
        //     );
        //     const index: number = findItem ? this.items.indexOf(
        //         findItem
        //     ) : -1;
        //     if (index !== -1) {
        //         this.focusedIndex = index;
        //         this.scrollToFocused();
        //     }
        // }
    }

    private scrollToFocused(): void {
        if (this.focusedIndex < 0 && this.as<MediaQueriesMixin>().isMqMaxS) return;

        const container: HTMLElement = this.refItems;
        if (container) {
            const element: HTMLElement = container.children[this.focusedIndex] as HTMLElement;

            if (element) {
                const top: number = element.offsetTop;
                const bottom: number = element.offsetTop + element.offsetHeight;
                const viewRectTop: number = container.scrollTop;
                const viewRectBottom: number = viewRectTop + container.clientHeight;
                if (top < viewRectTop) {
                    container.scrollTop = top;
                } else if (bottom > viewRectBottom) {
                    container.scrollTop = bottom - container.clientHeight;
                }
            }
        }
    }

    private isSelected(item: MBaseSelectItem<unknown> | string): boolean {
        if (this.selectedItems && this.selectedItems.length > 0) {
            if (this.itemsIsStringArray) {
                return this.selectedItems.indexOf(item as string) > -1;
            }
            item = item as MBaseSelectItem<unknown>;
            return item.disabled ? false : this.selectedItems.indexOf(item.value) > -1;
        }
        return false;
    }
}
