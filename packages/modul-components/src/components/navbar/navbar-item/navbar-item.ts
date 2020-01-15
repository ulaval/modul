import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Location } from 'vue-router';
import { ModulVue } from '../../../utils/vue/vue';
import { BaseNavbar, Navbar } from '../navbar';
import NavbarItemHelper from './navbar-item-helper';
import WithRender from './navbar-item.html?style=./navbar-item.scss';

// must be sync with selected css class
const FAKE_SELECTED_CLASS: string = 'm--is-fake-selected';

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
    public formatedLabel: string = '';

    @Emit('click')
    private emitClick(event: MouseEvent): void { }

    @Emit('mouseover')
    private emitMouseover(event: MouseEvent): void { }

    @Emit('mouseleave')
    private emitMouseleave(event: MouseEvent): void { }

    @Watch('isMultiline')
    private isMultilineChanged(): void {
        this.setDimension();
        this.setFormatedLabel();
    }

    @Watch('$route')
    private routeChanged(): void {
        this.$nextTick(() => {
            if (this.parentNavbar && this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        });
    }

    protected mounted(): void {
        this.formatedLabel = this.label;
        let parentNavbar: BaseNavbar | undefined;
        parentNavbar = this.getParent<BaseNavbar>(
            p => p instanceof BaseNavbar || // these will fail with Jest, but should pass in prod mode
                p.$options.name === 'MNavbar' // these are necessary for Jest, but the first two should pass in prod mode
        );

        if (parentNavbar) {
            this.parentNavbar = (parentNavbar as any) as Navbar;

            this.setFormatedLabel();
            this.setDimension();

            if (this.parentNavbar.autoSelect && NavbarItemHelper.isRouterLinkActive(this)) {
                this.parentNavbar.updateValue(this.value);
            }
        } else {
            console.error('m-navbar-item need to be inside m-navbar');
        }

        this.$modul.event.$on('resize', this.setFormatedLabel);
        this.$modul.event.$on('resize', this.setDimension);
    }

    protected beforeDestroy(): void {
        this.$modul.event.$off('resize', this.setDimension);
        this.$modul.event.$off('resize', this.setFormatedLabel);
    }

    public get shouldNotWrap(): boolean {
        return Boolean(this.label) && this.label.length < 15;
    }

    public async setFormatedLabel(): Promise<void> {
        if (!this.useNewWrapStrategy || !this.label) {
            return;
        }

        this.formatedLabel = this.label;

        await this.$nextTick();

        if (!this.isMultiline) {
            return;
        }

        if (this.label) {
            if (this.label.length < 15) {
                return;
            } else if (this.label.length > 30) {
                this._splitAndWrap();
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

        if ((element.clientHeight - yPadding) / fontSize <= 3) {
            return;
        }

        this._splitAndWrap();
        return;
    }

    private _splitAndWrap(): void {
        const split: string[] = this.label.split(' ');

        split.splice(Math.round(split.length / 2), 0, '</br>');

        this.formatedLabel = '<span style="all: inherit; white-space: nowrap;">'
            + split.join(' ')
            + '</span>';
    }


    public get isSelected(): boolean {
        return !!this.parentNavbar && !this.disabled && this.value === this.parentNavbar.model;
    }

    public get isMultiline(): boolean {
        return this.parentNavbar ? this.parentNavbar.multiline : false;
    }

    public onClick(event: MouseEvent): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onClick(event, this.value);
            if (this.value !== this.parentNavbar.model) {
                this.parentNavbar.updateValue(this.value);
            }
            this.emitClick(event);
        }
    }

    public onMouseover(event: MouseEvent): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onMouseover(event, this.value);
            this.emitMouseover(event);
        }
    }

    public onMouseleave(event: MouseEvent): void {
        if (!this.disabled && this.parentNavbar) {
            this.parentNavbar.onMouseleave(event, this.value);
            this.emitMouseleave(event);
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
