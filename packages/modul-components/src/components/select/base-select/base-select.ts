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

    @Prop({
        required: true
    })
    public controlId: string;

    @Prop({
        default: false
    })
    public open: boolean;

    public $refs: {
        items: HTMLUListElement;
    };

    internalOpen: boolean = false;
    focusedIndex: number = -1;


    async onOpen(): Promise<void> {
        await this.$nextTick();
        this.focusFirstSelected();
        this.scrollToFocused();
        this.$emit('update:open', true);
    }

    get ariaControls(): string {
        return this.controlId + '-controls';
    }


    onClose(): void {
        this.$emit('update:open', false);
    }

    @Watch('open', { immediate: true })
    onPopupOpen(open: boolean): void {
        if (open !== this.internalOpen) {
            this.internalOpen = open;
        }
    }


    private focusFirstSelected(): void {
        if (this.selectedItems && this.selectedItems.length > 0) {
            this.focusedIndex = this.items.indexOf(this.selectedItems[0]);
        } else {
            this.focusedIndex = -1;
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

    private focusNextItem(): void {
        if (this.focusedIndex > -1) {
            this.focusedIndex++;
            if (this.focusedIndex >= this.items.length) {

                this.focus(this.items[0], 0);
            }
        } else {
            const _focusedIndex: number = this.items.length === 0 ? -1 : 0;
            this.focus(this.items[_focusedIndex], _focusedIndex);
        }
        this.scrollToFocused();
    }

    private focusPreviousItem(): void {
        if (this.focusedIndex > -1) {
            this.focusedIndex--;
            if (this.focusedIndex < 0) {
                const _focusedItemIndex: number = this.items.length - 1;
                this.focus(this.items[_focusedItemIndex], _focusedItemIndex);
            }
        } else {
            const _focusedItemIndex: number = this.items.length - 1;
            this.focus(this.items[_focusedItemIndex], _focusedItemIndex);
        }
        this.scrollToFocused();
    }

    isSelected(option: any): boolean {
        if (this.selectedItems && this.selectedItems.length > 0) {
            return this.selectedItems.indexOf(option) > -1;
        }
        return false;
    }

    @Emit('select-item')
    select(option: any, index: number): void {
        this.internalOpen = false;
    }

    @Emit('focus-item')
    focus(option: any, index: number): void {
        this.focusedIndex = index;
    }


    // keyboard navigation
    onKeydownDown($event: KeyboardEvent): void {
        if (!this.internalOpen) {
            this.internalOpen = true;
        } else {
            this.focusNextItem();
        }
    }

    onKeydownUp($event: KeyboardEvent): void {
        if (!this.internalOpen) {
            this.internalOpen = true;
        } else {
            this.focusPreviousItem();
        }
    }

    onKeydownTab($event: KeyboardEvent): void {
        if (this.as<MediaQueries>().isMqMinS) {
            this.internalOpen = false;
        }
    }

    onKeydownEsc($event: KeyboardEvent): void {
        if (this.as<MediaQueries>().isMqMinS) {
            this.internalOpen = false;
        }
    }

    onKeydownEnter($event: KeyboardEvent): void {
        if (!this.internalOpen) {
            this.internalOpen = true;
        }
        if (this.focusedIndex > -1) {

            this.select(this.items[this.focusedIndex], this.focusedIndex);
        }
    }


}
