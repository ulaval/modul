import { Component, Emit, Mixins, Prop, Ref, Watch } from 'vue-property-decorator';
import { POPUP_NAME as DIRECTIVE_POPUP_NAME } from '../../../directives/directive-names';
import { MPopupDirective } from '../../../directives/popup/popup';
import { InputWidth } from '../../../mixins/input-width/input-width';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { REGEX_CSS_NUMBER_VALUE } from '../../../utils/props-validation/props-validation';
import uuid from '../../../utils/uuid/uuid';
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
        MPopup

    },
    directives: {
        [DIRECTIVE_POPUP_NAME]: MPopupDirective
    }
})
export class MBaseSelect extends Mixins(InputWidth, MediaQueries) {
    @Prop()
    public readonly items: MBaseSelectItem<unknown>[] | string[];

    @Prop()
    public readonly selectedItems: unknown[];

    @Prop()
    public readonly multiselect: boolean;

    @Prop()
    public readonly active: boolean;

    @Prop({ default: false })
    public readonly open: boolean;

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

    public readonly popupId: string = `popup-${uuid.generate()}`;
    public readonly listboxId: string = `listbox-${uuid.generate()}`;
    public focusedIndex: number = -1;
    private internalOpen: boolean = false;
    private letterTap: string = '';
    private timerLetterTap: number | NodeJS.Timeout = 0;
    private timerLetterTapActive: boolean = false;

    @Emit('update:open')
    public emitUpdateOpen(_open: boolean): void { }

    @Emit('click-on-item')
    public emitClickOnItem(_event: MouseEvent): void { }

    @Emit('open')
    public async emitOpen(): Promise<void> { }

    @Emit('close')
    public emitClose(): void {
        this.focusedIndex = -1;
    }

    @Emit('portal-after-close')
    public emitPortalAfterClose(): void { }

    public emitSelectItem(option: MBaseSelectItem<unknown> | string, index: number, event: Event): void {
        this.$emit('select-item', option, index, event);
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
        if (this.isMqMinS) {
            return this.listMaxHeight;
        }
    }

    public get itemIds(): string[] {
        return this.items?.map(() => uuid.generate()) ?? [];
    }

    public get ariaActivedescendantId(): string {
        if (this.focusedIndex < 0) {
            return ''
        }
        return this.itemIds[this.focusedIndex];
    }

    public get itemsAreStringArray(): boolean {
        if (!this.items || this.items.length === 0) return false;
        return typeof this.items[0] === 'string';
    }

    public get focusValue(): string {
        if (this.focusedIndex < 0) return '';
        return this.itemsAreStringArray
            ? (this.items as string[])[this.focusedIndex]
            : (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].value;
    }

    public getItemProps(item: MBaseSelectItem<unknown> | string, index: number): any {
        return {
            id: this.itemIds[index],
            value: this.itemsAreStringArray ? item : (item as MBaseSelectItem<unknown>).value,
            focused: index === this.focusedIndex,
            selected: this.isSelected(item),
            multiselect: this.multiselect,
            disabled: this.itemsAreStringArray ? undefined : (item as MBaseSelectItem<unknown>).disabled,
            hideRadioButtonMobile: this.hideRadioButtonMobile || this.itemsAreStringArray ? false : (item as MBaseSelectItem<unknown>).hideRadioButtonMobile,
        };
    }

    public getItemHandlers(item: MBaseSelectItem<unknown> | string, index: number): any {
        return {
            click: (event: MouseEvent): void => {
                this.focusedIndex = index;
                this.emitSelectItem(item, index, event);
                this.emitClickOnItem(event);
                if (!this.multiselect) {
                    this.closePopup();
                }
            },
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
        if (this.items && this.items.length > 0 && this.selectedItems && this.selectedItems.length > 0) {
            if (this.itemsAreStringArray) {
                this.focusedIndex = (this.items as string[]).indexOf((this.selectedItems as string[])[0]);
            } else {
                const items = this.items as MBaseSelectItem<unknown>[];
                const findSelectedItem = items.find((items) => items.value === this.selectedItems[0]);

                this.focusedIndex = findSelectedItem ? items.indexOf(findSelectedItem) : 0;
            }
        } else {
            this.focusedIndex = 0;
        }

        if (
            !this.itemsAreStringArray
            && this.items
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
        if (this.itemsAreStringArray) {
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

        if (this.itemsAreStringArray) {
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
        this.$nextTick(() => {
            if (this.isMqMinS) {
                let height: number = el.clientHeight;
                el.style.transition = BASE_SELECT_STYLE_TRANSITION;
                el.style.overflowY = 'hidden';
                el.style.width = this.$el.clientWidth + 'px';
                if (this.listMinWidth) {
                    el.style.minWidth = this.listMinWidth;
                }
                if (this.enableAnimation) {
                    el.style.maxHeight = '0';
                    requestAnimationFrame(() => {
                        el.style.maxHeight = height + 'px';
                        done();
                    });
                } else {
                    done();
                }

            } else {
                done();
            }
        });
    }

    public transitionLeave(el: HTMLElement, done: any): void {
        if (this.enableAnimation) {
            this.$nextTick(() => {
                if (this.isMqMinS) {
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
            if (!this.multiselect) {
                this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
            }
        }
    }

    public onKeydownUp($event: KeyboardEvent): void {
        if (!this.popupOpen) return;
        this.focusPreviousItem();
        if (!this.multiselect) {
            this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
        }
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
        if (!this.popupOpen) return
        this.focusedIndex = 0;

        if (
            !this.itemsAreStringArray
            && this.items.length > 0
            && (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].disabled
        ) {
            this.focusNextItem();
        } else {
            this.scrollToFocused();
        }
        if (!this.multiselect) {
            this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
        }
    }

    public onKeydownEnd($event: KeyboardEvent): void {
        if (!this.popupOpen) return

        this.focusedIndex = this.items.length - 1;
        if (
            !this.itemsAreStringArray
            && this.items.length > 0
            && (this.items as MBaseSelectItem<unknown>[])[this.focusedIndex].disabled
        ) {
            this.focusPreviousItem();
        } else {
            this.scrollToFocused();
        }
        if (!this.multiselect) {
            this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, $event);
        }
    }

    public onKeydownLetter($event: KeyboardEvent): void {
        if (/^[a-z0-9]$/i.test($event.key)) {
            this.findFirstItemWithLetter($event.key, $event);
        }
    }

    private scrollToFocused(): void {
        if (this.focusedIndex < 0) return;

        const sidebarBody = this.isMqMaxS ?
            document.querySelector(`#${this.popupId} .m-sidebar__body`)
            : undefined;
        const refUl: HTMLElement = this.refItems as HTMLElement;
        const container = sidebarBody || refUl;
        if (container) {
            const element: HTMLElement = refUl.children[this.focusedIndex] as HTMLElement;

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

    private createTimeoutLetterTap(): void {
        this.timerLetterTap = setTimeout(() => {
            this.timerLetterTapActive = false;
            this.letterTap = '';
        }, 400);
    }

    private findFirstItemWithLetter(key: string, event: KeyboardEvent): void {
        if (
            this.timerLetterTapActive
        ) {
            clearTimeout(this.timerLetterTap as NodeJS.Timeout);
            this.createTimeoutLetterTap();
        } else {
            this.timerLetterTapActive = true;
            this.createTimeoutLetterTap();
        }
        this.letterTap += key;

        if (this.itemsAreStringArray) {
            const items = this.items as string[];
            const findItem = items.find(items => items.toUpperCase().startsWith(this.letterTap.toUpperCase()))
            if (findItem) {
                const index: number = findItem ? items.indexOf(
                    findItem
                ) : -1;
                this.focusedIndex = index;
                this.scrollToFocused();

                if (!this.multiselect) {
                    this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, event);
                }
            }
        } else if (this.items.length > 0) {
            const items = this.items as MBaseSelectItem<unknown>[];
            const findItem = items.find(items => items.value.toUpperCase().startsWith(this.letterTap.toUpperCase()))
            if (findItem) {
                const index: number = findItem ? items.indexOf(
                    findItem
                ) : -1;
                if (items[index].disabled) return;

                this.focusedIndex = index;
                this.scrollToFocused();

                if (!this.multiselect) {
                    this.emitSelectItem(this.items[this.focusedIndex], this.focusedIndex, event);
                }
            }
        }
    }

    private isSelected(item: MBaseSelectItem<unknown> | string): boolean {
        if (this.selectedItems && this.selectedItems.length > 0) {
            if (this.itemsAreStringArray) {
                return this.selectedItems.some(i => i === item);
            }

            item = item as MBaseSelectItem<unknown>;
            return item.disabled ? false : this.selectedItems.some(i => i === item);
        }
        return false;
    }
}
