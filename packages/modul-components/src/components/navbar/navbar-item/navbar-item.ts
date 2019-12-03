import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { ModulVue } from '../../../utils/vue/vue';
import { BaseNavbar, Navbar } from '../navbar';
import NavbarItemHelper from './navbar-item-helper';
import WithRender from './navbar-item.html?style=./navbar-item.scss';

// must be sync with selected css class
const FAKE_SELECTED_CLASS: string = 'm--is-fake-selected';
const RESIZING_ELEMENT_WIDTH_SAFETY_COUNT: number = 100;

@WithRender
@Component
export class MNavbarItem extends ModulVue {

    @Prop()
    public value: string;
    @Prop()
    public label: string;
    @Prop()
    public disabled: boolean;
    @Prop()
    public url: string | Location;
    @Prop()
    public ariaHaspopup: boolean;
    @Prop()
    public ariaExpanded: boolean;
    @Prop()
    public ariaControls: string;
    @Prop({ default: false })
    public useNewWrapStrategy: boolean;

    // should be initialized to be reactive
    // tslint:disable-next-line:no-null-keyword
    private parentNavbar: Navbar | null = null;
    private shouldWrap: boolean = false;

    protected mounted(): void {
        let parentNavbar: BaseNavbar | undefined;
        parentNavbar = this.getParent<BaseNavbar>(
            p => p instanceof BaseNavbar || // these will fail with Jest, but should pass in prod mode
                p.$options.name === 'MNavbar' // these are necessary for Jest, but the first two should pass in prod mode
        );

        if (parentNavbar) {
            this.parentNavbar = (parentNavbar as any) as Navbar;

            this.setShouldWrap();
            this.setDimension();

            if (this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        } else {
            console.error('m-navbar-item need to be inside m-navbar');
        }

        this.$modul.event.$on('resize', () => {
            this.setShouldWrap();
            this.setDimension();
        });
    }

    protected beforeDestroy(): void {
        this.$modul.event.$off('resize', this.setDimension);
        this.$modul.event.$off('resize', this.setShouldWrap);
    }

    public get shouldNotWrap(): boolean {
        return this.label.length < 15;
    }

    public async setShouldWrap(): Promise<void> {
        if (!this.useNewWrapStrategy || !this.label) {
            return;
        }

        this.shouldWrap = false;

        await this.$nextTick();

        if (!this.isMultiline) {
            return;
        }

        if (this.label) {
            if (this.label.length < 15) {
                return;
            } else if (this.label.length > 30) {
                this.shouldWrap = true;
                return;
            }
        }

        const element: HTMLElement = this.$refs.item as HTMLElement;

        if (!element) {
            return;
        }

        const itemElementComputedStyle: CSSStyleDeclaration = window.getComputedStyle(element);
        const yPadding: number =
            parseInt(itemElementComputedStyle.getPropertyValue('padding-top'), 10)
            +
            parseInt(itemElementComputedStyle.getPropertyValue('padding-bottom'), 10);
        const fontSize: number = parseFloat(itemElementComputedStyle.getPropertyValue('font-size'));

        this.shouldWrap = (element.clientHeight - yPadding) / fontSize > 2;
    }

    public get formatedLabel(): string {
        if (!this.shouldWrap) {
            return this.label;
        }

        const half: number = Math.floor(this.label.length / 2);
        return '<span style="all: inherit; white-space: nowrap;">'
            + this.label.slice(0, half)
            + '</br>'
            + this.label.slice(half + Math.abs(0))
            + '</span>';
    }

    private get isMultiline(): boolean {
        return this.parentNavbar ? this.parentNavbar.multiline : false;
    }

    @Watch('$route')
    private routeChanged(): void {
        this.$nextTick(() => {
            if (this.parentNavbar && this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        });
    }

    @Watch('isMultiline')
    private isMultilineChanged(): void {
        this.setDimension();
    }

    private get isDisabled(): boolean {
        return this.disabled;
    }

    public get isSelected(): boolean {
        return !!this.parentNavbar && !this.disabled && this.value === this.parentNavbar.model;
    }

    private get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    private onClick(event: Event): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onClick(event, this.value);
            if (this.value !== this.parentNavbar.model) {
                this.parentNavbar.updateValue(this.value);
            }
            this.$emit('click', event);
        }
    }

    private onMouseover(event: Event): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onMouseover(event, this.value);
            this.$emit('mouseover', event);
        }

    }

    private onMouseleave(event: Event): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onMouseleave(event, this.value);
            this.$emit('mouseleave', event);
        }
    }

    private setDimension(): void {
        if (this.useNewWrapStrategy) {
            return;
        }

        let itemEl: HTMLElement = this.$refs.item as HTMLElement;
        if (itemEl && itemEl.style) {
            itemEl.style.removeProperty('width');
            itemEl.style.removeProperty('max-width');
            itemEl.style.removeProperty('white-space');

            if (this.isMultiline && ((itemEl.innerText === undefined ? '' : itemEl.innerText).trim().length > 15)) {
                let itemElComputedStyle: any = window.getComputedStyle(itemEl);
                let fontSize: number = parseFloat(itemElComputedStyle.getPropertyValue('font-size'));
                let paddingH: number = parseInt(itemElComputedStyle.getPropertyValue('padding-top'), 10) + parseInt(itemElComputedStyle.getPropertyValue('padding-bottom'), 10);
                // must subtract the padding, create a infinite loop
                let itemElHeight: number = itemEl.clientHeight - paddingH;
                let lines: number = Math.floor(itemElHeight / fontSize);

                if (lines > 2) {
                    // use selected class to reserve space for when selected
                    this.$el.classList.add(FAKE_SELECTED_CLASS);
                    // create a infinite loop if the parent has 'align-items: stretch'
                    (this.$parent.$refs.list as HTMLElement).style.alignItems = 'flex-start';

                    do {
                        itemEl.style.width = itemEl.clientWidth + 1 + 'px'; // increment width

                        // update values
                        itemElHeight = itemEl.clientHeight - paddingH;
                        lines = Math.floor(itemElHeight / fontSize);
                    } while (lines > 2);

                    // reset styles once completed
                    this.$el.classList.remove(FAKE_SELECTED_CLASS);
                    (this.$parent.$refs.list as HTMLElement).style.removeProperty('align-items');
                }
            } else {
                itemEl.style.whiteSpace = 'nowrap';
            }
        }
    }

}


