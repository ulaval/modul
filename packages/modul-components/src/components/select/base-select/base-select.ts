import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { MediaQueries, MediaQueriesMixin } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import { MPopup } from '../../popup/popup';
import { MSelectItem } from '../../select/select-item/select-item';
import WithRender from './base-select.html';
import './base-select.scss';


const DROPDOWN_STYLE_TRANSITION: string = 'max-height 0.3s ease';
@WithRender
@Component({
    components: {
        MSelectItem
    },
    mixins: [
        MediaQueries
    ]
})
export class MBaseSelect extends ModulVue {

    @Prop()
    public items: any[];

    @Prop()
    public selectedItems: any[];

    @Prop()
    public active: boolean;

    @Prop()
    public inputMaxWidth: string;

    @Prop({ required: true })
    public controlId: string;

    @Prop({ default: false })
    public open: boolean;

    @Prop({ default: true })
    public closeOnSelect: boolean;

    @Prop({ default: false })
    public hideRadioButtonMobile: boolean;

    @Prop({ default: false })
    public sidebarFullHeight: boolean;

    @Prop({ default: true })
    public enableAnimation: boolean;

    @Prop({ default: false })
    public virtualScroll: boolean;

    public $refs: {
        items: HTMLUListElement;
        popup: MPopup;
    };

    internalOpen: boolean = false;
    focusedIndex: number = -1;

    @Emit('open')
    async onOpen(): Promise<void> {
        await this.$nextTick();
        this.focusFirstSelected();
        this.scrollToFocused();
        this.$emit('update:open', true);
    }

    get ariaControls(): string {
        return this.controlId + '-controls';
    }

    @Emit('close')
    onClose(): void {
        this.$emit('update:open', false);
        this.focusedIndex = -1;
    }

    select(option: any, index: number, $event: Event): void {
        this.$emit('select-item', option, index, $event);
    }

    @Watch('open', { immediate: true })
    onPopupOpen(open: boolean): void {
        if (open !== this.internalOpen) {
            this.internalOpen = open;
        }
    }

    onSelectItem(option: any, index: number, $event: Event): void {
        this.select(option, index, $event);
        if (this.closeOnSelect) {
            this.closePopup();
        }
    }

    getItemProps(item: any, index: number): any {
        return {
            value: item,
            focused: index === this.focusedIndex,
            selected: this.isSelected(item),
            hideRadioButtonMobile: this.hideRadioButtonMobile
        };
    }

    getItemHandlers(item: any, index: number): any {
        return {
            click: (event: Event): void => this.onSelectItem(item, index, event)
        };
    }

    public togglePopup(): void {
        if (this.active) {
            this.internalOpen = !this.internalOpen;
        }
    }

    public closePopup(): void {
        this.internalOpen = false;
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

    isSelected(option: any): boolean {
        if (this.selectedItems && this.selectedItems.length > 0) {
            return this.selectedItems.indexOf(option) > -1;
        }
        return false;
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

    private findFirstItemWithLetter(key: string): void {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            const index: number = this.items.indexOf(this.items.find((item: any) => item.startsWith(key)));
            this.focusedIndex = index;
            this.scrollToFocused();
        }
    }

    transitionEnter(el: HTMLElement, done: any): void {
        if (this.enableAnimation) {
            this.$nextTick(() => {

                if (this.as<MediaQueriesMixin>().isMqMinS) {
                    let height: number = el.clientHeight;

                    el.style.transition = DROPDOWN_STYLE_TRANSITION;
                    el.style.overflowY = 'hidden';
                    el.style.maxHeight = '0';

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

    transitionLeave(el: HTMLElement, done: any): void {
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
    onKeydownDown($event: KeyboardEvent): void {
        if (!this.internalOpen) {
            this.togglePopup();
        } else {
            this.focusNextItem();
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (!this.internalOpen) {
            this.togglePopup();
        }
        this.focusPreviousItem();
    }

    onKeydownSpace($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.select(this.items[this.focusedIndex], this.focusedIndex, $event);
            this.closePopup();
        } else {
            this.togglePopup();
        }
    }

    onKeydownTab($event: KeyboardEvent): void {
        this.closePopup();
    }

    onKeydownEsc($event: KeyboardEvent): void {
        this.closePopup();
    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.select(this.items[this.focusedIndex], this.focusedIndex, $event);
            this.closePopup();
        } else {
            this.togglePopup();
        }
    }

    onKeydownHome($event: KeyboardEvent): void {
        if (this.internalOpen) {
            this.focusedIndex = 0;
            this.scrollToFocused();
        }
    }

    onKeydownEnd($event: KeyboardEvent): void {
        if (this.internalOpen) {
            this.focusedIndex = this.items.length - 1;
            this.scrollToFocused();
        }
    }

    onKeydownLetter($event: KeyboardEvent): void {
        if (/^[a-z0-9]$/i.test($event.key)) {
            this.findFirstItemWithLetter($event.key);
        }
    }
}
