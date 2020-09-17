import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { AUTO_HORIZONTAL_SCROLL, ICON_BUTTON_NAME, NAVBAR_ITEM_NAME, NAVBAR_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MAutoHorizontalScroll, MAutoHorizontalScrollGradientStyle, MAutoHorizontalScrollResizeProperties } from './../auto-horizontal-scroll/auto-horizontal-scroll';
import { MNavbarItem } from './navbar-item/navbar-item';
import WithRender from './navbar.html?style=./navbar.scss';

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
        [ICON_BUTTON_NAME]: MIconButton,
        [AUTO_HORIZONTAL_SCROLL]: MAutoHorizontalScroll,
    }
})
export class MNavbar extends BaseNavbar implements Navbar {
    @Prop()
    public readonly selected: string;

    @Prop({
        default: MNavbarSkin.NavMain,
        validator: value => Enums.toValueArray(MNavbarSkin).includes(value)
    })
    public readonly skin: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop({ default: true })
    public readonly navigationArrow: boolean;

    @Prop({ default: MNavbarMaxWidth.Large })
    public readonly maxWidth: string;

    @Prop({ default: true })
    public readonly multiline: boolean;

    @Prop()
    public readonly titleButtonLeft: string;

    @Prop()
    public readonly titleButtonRight: string;

    @Prop({ default: false })
    public readonly autoSelect: boolean;

    public $refs: {
        buttonRight: HTMLElement,
        buttonLeft: HTMLElement,
        list: HTMLElement,
        wrap: HTMLElement,
        contents: HTMLElement
    };

    public animReady: boolean = false;
    public minWidth: string = '100px';
    public componentWidth: string = '';
    public horizontalScrollOffset: number = 0;
    private internalValue: any | undefined = '';
    private observer: MutationObserver;
    private navbarItemsInterne: MNavbarItem[] = [];

    @Emit('update:selected')
    public emitUpdateSelected(value: string): void { }

    @Emit('click')
    public emitClick(event: MouseEvent, value: string): void { }

    @Emit('mouseover')
    public emitMouseover(event: MouseEvent, value: string): void { }

    @Emit('mouseleave')
    public emitMouseleave(event: MouseEvent, value: string): void { }

    @Watch('model', { immediate: true })
    public onModelChangement(): void {
        if (this.model.toString()) {
            this.updateSelectedIndicatorPosition();
        }
    }

    @Watch('selected', { immediate: true })
    public setAndUpdate(value): void {
        this.internalValue = value;

        this.$nextTick(() => {
            this.scrollToSelected();
        });
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
        this.observer = new MutationObserver((mutations: MutationRecord[]) => {
            this.setNavbarItems();
            if (mutations.some((mutation: MutationRecord) => mutation.type === 'childList')) {
                this.resizeComponant();
            }
            this.updateSelectedIndicatorPosition();
        });

        this.observer.observe(this.$refs.list, { subtree: true, childList: true, characterData: true });

        this.setNavbarItems();

        if (this.selected) {
            this.updateSelectedIndicatorPosition();
        }
    }

    protected beforeDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    public get model(): string {
        return this.selected === undefined ? this.internalValue : this.selected;
    }

    public set model(value: string) {
        this.setAndUpdate(value);
        this.emitUpdateSelected(value);
    }

    public updateValue(value: string): void {
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

    public get gradientStyle(): MAutoHorizontalScrollGradientStyle {
        switch (this.skin) {
            case MNavbarSkin.NavMain:
            case MNavbarSkin.NavSub:
            case MNavbarSkin.TabDark:
            case MNavbarSkin.TabDarkMain :
                return MAutoHorizontalScrollGradientStyle.Dark;
            case MNavbarSkin.NavSoft:
                return MAutoHorizontalScrollGradientStyle.Interactive;
            case MNavbarSkin.TabLightMain:
                return MAutoHorizontalScrollGradientStyle.Light;
            case MNavbarSkin.TabArrow:
            default:
                return MAutoHorizontalScrollGradientStyle.White;
        }
    }

    public get hasGradient(): boolean {
        return !(this.skin === MNavbarSkin.TabLightMain && this.navigationArrow);
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

    public async onPreviousButtonClick(): Promise<void> {
        if (this.navbarItemsInterne.length < 1) {
            return;
        }

        let outbound: Vue | undefined;

        // find the previus element outside visible area
        this.navbarItemsInterne.forEach(item => {
            if ((item.$el as HTMLElement).offsetLeft < this.horizontalScrollOffset) {
                outbound = item;
            }
        });

        if (outbound) {
            this.horizontalScrollOffset = (outbound.$el as HTMLElement).offsetLeft;
        }

    }

    public async onNextButtonClick(): Promise<void> {
        if (this.navbarItemsInterne.length < 1) {
            return;
        }

        let cRight: number = this.horizontalScrollOffset + parseInt(this.componentWidth, 10);

        // find the next element outside visible area
        let outbound: Vue | undefined = this.navbarItemsInterne.find(
            item =>
                (item.$el as HTMLElement).offsetLeft + item.$el.clientWidth > cRight
        );

        if (outbound) {
            // get the threshold of visible part of the element
            let threshold: number = cRight - (outbound.$el as HTMLElement).offsetLeft;

            // move the container scroll
            this.horizontalScrollOffset += (outbound.$el.clientWidth) - threshold;
        }
    }

    private resizeComponant(properties?: MAutoHorizontalScrollResizeProperties): void {
        this.minWidth = `${this.$refs.list.clientWidth}px`;

        if (properties) {
            this.componentWidth = properties.componentWidth;
        }
    }

    private setSelectedIndicatorPosition(element, ref: string): void {
        if (!this.isTabUnderlineSkin && !this.isTabArrowSkin) {
            return;
        }
        let positionX: number = element.$el.offsetLeft;
        let width: number = element.$el.clientWidth;
        let localRef: HTMLElement = this.$refs[ref];

        localRef.style.transform = 'translate3d(' + positionX + 'px, 0, 0)';
        localRef.style.width = width + 'px';
    }

    private setNavbarItems(): void {
        this.navbarItemsInterne = this.$children &&
            this.$children[0] &&
            this.$children[0].$children ?
                this.$children[0].$children.filter(element => element instanceof MNavbarItem) as MNavbarItem[]
                : [];
    }

    private async scrollToSelected(): Promise<void> {
        if (this.navbarItemsInterne.length < 1) {
            this.animReady = true;
            return;
        }

        const navbarItemSelected: Vue | undefined = this.navbarItemsInterne.find(i => i && i.$props.value === this.model);

        if (navbarItemSelected) {
            const componentWidth: number = parseInt(this.componentWidth, 10);
            let scrollPositionAlignLeft: number = (navbarItemSelected.$el as HTMLElement).offsetLeft;
            // Check if selected element is visible in navbar
            if (componentWidth > ((navbarItemSelected.$el as HTMLElement).offsetLeft - this.horizontalScrollOffset)) {
                // Check if the selected element exceeds on the left side
                if (((navbarItemSelected.$el as HTMLElement).offsetLeft - this.horizontalScrollOffset) < 0) {
                    this.horizontalScrollOffset = scrollPositionAlignLeft;
                    // Check if the selected element exceeds on the right side
                } else if (componentWidth < ((navbarItemSelected.$el as HTMLElement).offsetLeft - this.horizontalScrollOffset + navbarItemSelected.$el.clientWidth )) {
                    this.horizontalScrollOffset = this.horizontalScrollOffset + navbarItemSelected.$el.clientWidth - (this.horizontalScrollOffset + componentWidth - (navbarItemSelected.$el as HTMLElement).offsetLeft);
                }
            } else {
                this.horizontalScrollOffset = scrollPositionAlignLeft;
            }
            this.setSelectedIndicatorPosition(navbarItemSelected, this.skin);
        }

        this.animReady = true;
    }

    private async updateSelectedIndicatorPosition(): Promise<void> {
        if ((!this.isTabUnderlineSkin && !this.isTabArrowSkin) || this.navbarItemsInterne.length < 1) {
            return;
        }
        this.setSelectedIndicatorPosition(
            this.navbarItemsInterne.find(i => i && i.$props.value === this.model),
            this.skin
        );
    }
}

const NavbarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(NAVBAR_ITEM_NAME, MNavbarItem);
        v.component(NAVBAR_NAME, MNavbar);
    }
};

export default NavbarPlugin;
