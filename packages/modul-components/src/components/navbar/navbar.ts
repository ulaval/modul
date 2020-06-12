import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { ModulVue } from '../../utils/vue/vue';
import { ICON_BUTTON_NAME, NAVBAR_ITEM_NAME, NAVBAR_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MNavbarItem } from './navbar-item/navbar-item';
import WithRender from './navbar.html?style=./navbar.scss';

const OVERFLOWOFFSET: number = 20;

export abstract class BaseNavbar extends ModulVue { }

export interface Navbar {
    model: string;
    multiline: boolean;
    autoSelect: boolean;
    updateValue(value: string): void;
    onMouseover(event: Event, value: string): void;
    onMouseleave(event: Event, value: string): void;
    onClick(event: Event, value: string): void;
}

interface NavbarItems {
    elements: Vue[];
    firstElement: HTMLElement;
    lastElement: HTMLElement;
}

export enum MNavbarSkin {
    NavMain = 'nav-main',
    NavSub = 'nav-sub',
    NavSoft = 'nav-soft',
    TabLight = 'tab-light',
    TabLightMain = 'tab-light-main',
    TabDark = 'tab-dark',
    TabDarkMain = 'tab-dark-main',
    TabArrow = 'tab-arrow',
    TabUnderline = 'tab-underline',
    TabSoft = 'tab-soft',
    Plain = 'plain'
}

export enum MNavbarMaxWidth {
    XLarge = '1400px',
    Large = '1200px',
    Regular = '1000px',
    Small = '800px',
    Text = '720px'
}

@WithRender
@Component({
    components: {
        [ICON_BUTTON_NAME]: MIconButton
    },
    mixins: [ElementQueries]
})
export class MNavbar extends BaseNavbar implements Navbar {

    @Prop()
    public selected: string;

    @Prop({
        default: MNavbarSkin.NavMain,
        validator: value =>
            value === MNavbarSkin.NavMain ||
            value === MNavbarSkin.NavSub ||
            value === MNavbarSkin.NavSoft ||
            value === MNavbarSkin.TabLight ||
            value === MNavbarSkin.TabLightMain ||
            value === MNavbarSkin.TabDark ||
            value === MNavbarSkin.TabDarkMain ||
            value === MNavbarSkin.TabArrow ||
            value === MNavbarSkin.TabUnderline ||
            value === MNavbarSkin.TabSoft ||
            value === MNavbarSkin.Plain
    })
    public skin: string;

    @Prop()
    public disabled: boolean;

    @Prop({ default: true })
    public navigationArrow: boolean;

    @Prop({ default: MNavbarMaxWidth.Large })
    public maxWidth: string;

    @Prop({ default: true })
    public multiline: boolean;

    @Prop()
    public titleButtonLeft: string;

    @Prop()
    public titleButtonRight: string;

    @Prop({ default: false })
    public autoSelect: boolean;

    public $refs: {
        buttonRight: HTMLElement,
        buttonLeft: HTMLElement,
        list: HTMLElement,
        wrap: HTMLElement,
        contents: HTMLElement
    };

    public animReady: boolean = false;
    private internalValue: any | undefined = '';
    private showArrowLeft: boolean = false;
    private showArrowRight: boolean = false;
    private computedHeight: number = 0;
    private observer: MutationObserver;

    @Emit('click')
    private emitClick(event: MouseEvent, value: string): void { }

    @Emit('mouseover')
    private emitMouseover(event: MouseEvent, value: string): void { }

    @Emit('mouseleave')
    private emitMouseleave(event: MouseEvent, value: string): void { }

    @Watch('model', { immediate: true })
    private onModelChangement(): void {
        if (this.isTabUnderlineSkin || this.isTabArrowSkin) {
            if (this.model.toString()) { this.updateSelectedIndicatorPosition(); }
        }
    }

    @Watch('multiline')
    private onMultilineChanged(): void {
        // Wait for navbar-item height calculation -> setimension()
        setTimeout(() => {
            this.setupScrolllH();
        });
    }

    @Watch('selected')
    private setAndUpdate(value): void {
        this.internalValue = value;
        this.scrollToSelected();
    }

    protected created(): void {
        if (this.skin === MNavbarSkin.TabLight) {
            this.$log.warn('MNavbarSkin.TabLight is deprecated, please use MNavbarSkin.TabLightMain instead.');
        } else if (this.skin === MNavbarSkin.TabDark) {
            this.$log.warn('MNavbarSkin.TabDark is deprecated, please use MNavbarSkin.TabDarkMain instead.');
        }
        this.internalValue = undefined;
    }

    protected mounted(): void {
        this.watchResizes();

        this.$refs.wrap.addEventListener('scroll', this.setDisplayNavigationButtons);

        this.observer = new MutationObserver((mutations: MutationRecord[]) => {
            if (mutations.some((mutation: MutationRecord) => mutation.type === 'childList')) {
                this.watchResizes();
            }

            if (this.skin === MNavbarSkin.TabUnderline || this.skin === MNavbarSkin.TabArrow) {
                this.updateSelectedIndicatorPosition();
            }
        });

        this.observer.observe(this.$refs.list, { subtree: true, childList: true, characterData: true });
        if (this.skin === MNavbarSkin.TabUnderline || this.skin === MNavbarSkin.TabArrow) {
            if (this.selected) { this.updateSelectedIndicatorPosition(); }
        }
    }

    protected beforeDestroy(): void {
        this.as<ElementQueries>().$off('resize', this.setupScrolllH);
        this.$refs.wrap.removeEventListener('scroll', this.setDisplayNavigationButtons);
        if (this.observer) { this.observer.disconnect(); }
    }

    public get model(): any {
        return this.selected === undefined ? this.internalValue : this.selected;
    }

    public set model(value: any) {
        this.setAndUpdate(value);
        this.$emit('update:selected', value);
    }

    public updateValue(value: any): void {
        this.model = value;
    }

    public onMouseover(event: MouseEvent, value: string): void {
        this.emitMouseover(event, value);
    }

    public onMouseleave(event: MouseEvent, value: string): void {
        this.emitMouseleave(event, value);
    }

    public onClick(event: MouseEvent, value: string): void {
        this.emitClick(event, value);
    }

    public get hasArrowRight(): boolean {
        return this.showArrowRight && this.navigationArrow;
    }

    public get hasArrowLeft(): boolean {
        return this.showArrowLeft && this.navigationArrow;
    }

    public get buttonSkin(): string {
        return this.skin === MNavbarSkin.NavMain || this.skin === MNavbarSkin.NavSub || this.skin === MNavbarSkin.NavSoft || this.skin === MNavbarSkin.TabDark || this.skin === MNavbarSkin.TabDarkMain ? 'dark' : 'light';
    }

    public get buttonRipple(): boolean {
        return this.skin === MNavbarSkin.TabUnderline || this.skin === MNavbarSkin.TabArrow || this.skin === MNavbarSkin.TabSoft;
    }

    public get isTabLightSkin(): boolean {
        return this.skin === MNavbarSkin.TabLight || this.skin === MNavbarSkin.TabLightMain;
    }

    public get isTabUnderlineSkin(): boolean {
        return this.skin === MNavbarSkin.TabUnderline;
    }

    public get isTabArrowSkin(): boolean {
        return this.skin === MNavbarSkin.TabArrow;
    }

    private watchResizes(): void {
        this.as<ElementQueries>().$off('resize', this.setupScrolllH);
        this.$children.forEach((child: Vue) => {
            child.$off('resize', this.setupScrolllH);
        });

        this.setupScrolllH();

        this.as<ElementQueries>().$on('resize', this.setupScrolllH);
        this.$children.forEach((child: Vue) => {
            child.$on('resize', this.setupScrolllH);
        });
    }

    private setSelectedIndicatorPosition(element, ref: string): void {
        let positionX: number = element.$el.offsetLeft;
        let width: number = element.$el.clientWidth;
        let localRef: HTMLElement = this.$refs[ref];

        localRef.style.transform = 'translate3d(' + positionX + 'px, 0, 0)';
        localRef.style.width = width + 'px';
    }

    private setupScrolllH(): void {
        let contentsEl: HTMLElement = this.$refs.contents;
        let wrapEl: HTMLElement = this.$refs.wrap;
        let listEl: HTMLElement = this.$refs.list;

        if (wrapEl.scrollWidth > wrapEl.clientWidth) {
            this.computedHeight = listEl.clientHeight;
            wrapEl.style.height = this.computedHeight + OVERFLOWOFFSET + 'px';
            contentsEl.style.height = this.computedHeight + 'px';
            this.scrollToSelected();
        } else {
            this.showArrowLeft = false;
            this.showArrowRight = false;
            wrapEl.style.removeProperty('height');
            contentsEl.style.removeProperty('height');
        }

        if (!this.animReady) {
            setTimeout(() => {
                this.animReady = true;
            });
        }
    }

    private async scrollToSelected(): Promise<void> {
        const navbarItems: NavbarItems = await this.navbarItems();
        if (!navbarItems) {
            return;
        }

        navbarItems.elements.forEach(element => {
            // Allow time to make sure an item is selected
            setTimeout(() => {
                let wrapEl: HTMLElement = this.$refs.wrap;
                if (element && element.$props.value === this.model && wrapEl) {
                    let buttonLeftWidth: number = this.$refs.buttonLeft && this.hasArrowLeft ? this.$refs.buttonLeft.clientWidth : 0;
                    let buttonRightWidth: number = this.$refs.buttonRight && this.hasArrowRight ? this.$refs.buttonRight.clientWidth : 0;
                    let scrollPositionAlignLeft: number = (element.$el as HTMLElement).offsetLeft - buttonLeftWidth;

                    // Check if selected element is visible in navbar
                    if (wrapEl && wrapEl.clientWidth > ((element.$el as HTMLElement).offsetLeft - wrapEl.scrollLeft + buttonRightWidth)) {
                        // Check if the selected element exceeds on the left side
                        if (((element.$el as HTMLElement).offsetLeft - buttonLeftWidth - wrapEl.scrollLeft) < 0) {
                            wrapEl.scrollLeft = scrollPositionAlignLeft;
                            // Check if the selected element exceeds on the right side
                        } else if (wrapEl.clientWidth < ((element.$el as HTMLElement).offsetLeft - wrapEl.scrollLeft + element.$el.clientWidth + buttonRightWidth)) {
                            wrapEl.scrollLeft = wrapEl.scrollLeft + element.$el.clientWidth + buttonRightWidth - (wrapEl.scrollLeft + wrapEl.clientWidth - (element.$el as HTMLElement).offsetLeft);
                        }
                    } else if (wrapEl) {
                        wrapEl.scrollLeft = scrollPositionAlignLeft;
                    }

                    if (this.skin === MNavbarSkin.TabUnderline || this.skin === MNavbarSkin.TabArrow) {
                        this.setSelectedIndicatorPosition(element, this.skin);
                    }

                    this.setDisplayNavigationButtons();
                }
            });
        });
    }

    private setDisplayNavigationButtons(): void {
        let spaceBeforeDisplayingButton: number = this.isTabLightSkin ? 5 : 0;
        let wrapEl: HTMLElement = this.$refs.wrap;
        if (wrapEl) {
            const maxScrollLeft: number = Math.round(wrapEl.scrollWidth - wrapEl.clientWidth - spaceBeforeDisplayingButton);
            this.showArrowRight = Math.round(wrapEl.scrollLeft) < maxScrollLeft;
            this.showArrowLeft = wrapEl.scrollLeft > spaceBeforeDisplayingButton;
        }
    }

    private async updateSelectedIndicatorPosition(): Promise<void> {
        const navbarItems: NavbarItems = await this.navbarItems();
        if (!navbarItems) {
            return;
        }
        navbarItems.elements.forEach(element => {
            if (element && element.$props.value === this.model) {
                this.setSelectedIndicatorPosition(element, this.skin);
            }
        });
    }

    private async navbarItems(): Promise<NavbarItems> {
        let navbarItems: Vue[] = this.$children.filter(element => element instanceof MNavbarItem);
        let interval: number;
        let countIntervalIteration: number = 0;

        let getNavbarItems: Function = (navbarItems: Vue[]) => {
            clearInterval(interval);

            let firstElement: HTMLElement = navbarItems[0].$el as HTMLElement;
            let lastElement: HTMLElement = navbarItems[navbarItems.length - 1].$el as HTMLElement;

            return {
                elements: navbarItems,
                firstElement: firstElement,
                lastElement: lastElement
            };
        };

        return new Promise((resolve, reject) => {
            if (navbarItems.length < 1) {
                interval = window.setInterval(() => {
                    navbarItems = this.$children.filter(element => element instanceof MNavbarItem);

                    if (navbarItems.length > 0) {
                        return resolve(getNavbarItems(navbarItems));
                    }

                    if (countIntervalIteration > 8) {
                        clearInterval(interval);
                    }
                    countIntervalIteration++;
                }, 300);
            } else {
                return resolve(getNavbarItems(navbarItems));
            }
        });
    }

    private async scrollLeft(): Promise<void> {
        let wrapEl: HTMLElement = this.$refs.wrap;
        let outbound: Vue | undefined;

        const navbarItems: NavbarItems = await this.navbarItems();

        if (!navbarItems) {
            return;
        }

        // find the previus element outside visible area
        navbarItems.elements.forEach(element => {
            if ((element.$el as HTMLElement).offsetLeft < wrapEl.scrollLeft) {
                outbound = element;
            }
        });

        if (outbound) {
            wrapEl.scrollLeft = (outbound.$el as HTMLElement).offsetLeft - this.$refs.buttonLeft.clientWidth;
        }
    }

    private async scrollRight(): Promise<void> {
        let wrapEl: HTMLElement = this.$refs.wrap;
        let cRight: number = wrapEl.scrollLeft + wrapEl.clientWidth;

        const navbarItems: NavbarItems = await this.navbarItems();

        if (!navbarItems) {
            return;
        }
        // find the next element outside visible area
        let outbound: Vue | undefined = navbarItems.elements.find(element => (element.$el as HTMLElement).offsetLeft + element.$el.clientWidth > cRight);

        if (outbound) {
            // get the threshold of visible part of the element
            let threshold: number = cRight - (outbound.$el as HTMLElement).offsetLeft;

            // move the container scroll
            wrapEl.scrollLeft += (outbound.$el.clientWidth + this.$refs.buttonRight.clientWidth) - threshold;
        }
    }
}

const NavbarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(NAVBAR_ITEM_NAME, MNavbarItem);
        v.component(NAVBAR_NAME, MNavbar);
    }
};

export default NavbarPlugin;
