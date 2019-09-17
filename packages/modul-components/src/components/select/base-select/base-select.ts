import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { MediaQueries, MediaQueriesMixin } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import { MSelectItem } from '../../select/select-item/select-item';
import WithRender from './base-select.html';
import './base-select.scss';

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

    @Prop()
    public waitingResults: boolean;

    @Prop({
        required: true
    })
    public controlId: string;

    @Prop({
        default: false
    })
    public open: boolean;

    @Prop({
        default: false
    })
    public sidebarFullHeight: boolean;

    public $refs: {
        items: HTMLUListElement;
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
    }

    @Emit('select-item')
    select(option: any, index: number): void {
    }

    @Watch('open', { immediate: true })
    onPopupOpen(open: boolean): void {
        if (open !== this.internalOpen) {
            this.internalOpen = open;
        }
    }

    onSelectItem(option: any, index: number): void {

        this.select(option, index);
        this.closePopup();
    }

    public togglePopup(): void {
        this.internalOpen = !this.internalOpen;
    }

    public closePopup(): void {
        this.internalOpen = false;
    }


    public setFocusedIndex(index): void {
        this.focusedIndex = index;
    }


    public selectFocusedItem(): void {
        this.select(this.items[this.focusedIndex], this.focusedIndex);
    }


    public focusFirstSelected(): void {
        if (this.selectedItems && this.selectedItems.length > 0) {
            this.focusedIndex = this.items.indexOf(this.selectedItems[0]);
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




    // keyboard navigation of a drowdown
    // tab or esc : close the popup
    // up and down : change the focused option
    // enter : select the focused option and close popup
    // space : open the popup
    onKeydownDown($event: KeyboardEvent): void {
        this.focusNextItem();
        this.selectFocusedItem();
    }

    onKeydownUp($event: KeyboardEvent): void {
        this.focusPreviousItem();
        this.selectFocusedItem();
    }

    onKeydownSpace($event: KeyboardEvent): void {
        this.togglePopup();
    }

    onKeydownTab($event: KeyboardEvent): void {
        this.closePopup();
    }

    onKeydownEsc($event: KeyboardEvent): void {
        this.closePopup();
    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (this.focusedIndex > -1) {
            this.select(this.items[this.focusedIndex], this.focusedIndex);
        }
        this.closePopup();
    }


}
