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
    public disabled: boolean;
    @Prop()
    public url: string | Location;
    @Prop()
    public ariaHaspopup: boolean;
    @Prop()
    public ariaExpanded: boolean;
    @Prop()
    public ariaControls: string;

    // should be initialized to be reactive
    // tslint:disable-next-line:no-null-keyword
    private parentNavbar: Navbar | null = null;

    protected mounted(): void {
        let parentNavbar: BaseNavbar | undefined;
        parentNavbar = this.getParent<BaseNavbar>(
            p => p instanceof BaseNavbar || // these will fail with Jest, but should pass in prod mode
                p.$options.name === 'MNavbar' // these are necessary for Jest, but the first two should pass in prod mode
        );

        if (parentNavbar) {
            this.parentNavbar = (parentNavbar as any) as Navbar;
            this.setDimension();

            if (this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        } else {
            console.error('m-navbar-item need to be inside m-navbar');
        }

        this.$modul.event.$on('resize', this.setDimension);
    }

    private beforeDestroy(): void {
        this.$modul.event.$off('resize', this.setDimension);
    }

    private get isMultiline(): boolean {
        return this.parentNavbar ? this.parentNavbar.multiline : false;
    }

    @Watch('isMultiline')
    private isMultilineChanged(): void {
        this.setDimension();
    }

    @Watch('$route')
    private routeChanged(): void {
        this.$nextTick(() => {
            if (this.parentNavbar && this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        });
    }

    private _computingHeightFontSizeRatio: boolean = false;
    private _resizedWhileComputing: boolean = false;

    private _computeHeightFontSizeRatio(): void {
        if (this._computingHeightFontSizeRatio) {
            this._resizedWhileComputing = true;
            return;
        }

        this._computingHeightFontSizeRatio = true;

        const element: HTMLElement = this.$refs.item as HTMLElement;
        const itemElementComputedStype: CSSStyleDeclaration = window.getComputedStyle(element);
        const yPadding: number =
            parseInt(itemElementComputedStype.getPropertyValue('padding-top'), 10)
            +
            parseInt(itemElementComputedStype.getPropertyValue('padding-bottom'), 10);
        const fontSize: number = parseFloat(itemElementComputedStype.getPropertyValue('font-size'));

        const compute: Function = (
            stepInPixels: number = 1,
            safetyCount: number = 0
        ) => {
            if (safetyCount >= RESIZING_ELEMENT_WIDTH_SAFETY_COUNT) {
                return;
            }

            const itemElementHeightWithoutPadding: number = element.clientHeight - yPadding;
            const ratio: number = Math.floor(itemElementHeightWithoutPadding / fontSize);

            element.style.width = (element.clientWidth + stepInPixels) + 'px';

            if (ratio <= 2) {
                return;
            }

            compute(
                ratio > 5
                    ? stepInPixels * 2
                    : ratio === 4
                        ? Math.floor(stepInPixels * 1.5)
                        : stepInPixels + 5,
                ++safetyCount
            );
        };

        compute();

        this._computingHeightFontSizeRatio = false;

        if (this._resizedWhileComputing) {
            this._resizedWhileComputing = false;
            this._computeHeightFontSizeRatio();
        }
    }

    private setDimension(): void {
        let itemElement: HTMLElement = this.$refs.item as HTMLElement;

        if (!itemElement || !itemElement.style) {
            return;
        }

        itemElement.style.removeProperty('width');
        itemElement.style.removeProperty('max-width');
        itemElement.style.removeProperty('white-space');

        if (
            this.isMultiline
            && (
                !!itemElement.innerText
                &&
                itemElement.innerText.trim().length > 15
            )
        ) {
            this._computeHeightFontSizeRatio();
        } else {
            itemElement.style.whiteSpace = 'nowrap';
        }
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

}


