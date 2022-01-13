import { PluginObject } from 'vue';
import { Component, Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { AUTO_HORIZONTAL_SCROLL, ICON_BUTTON_NAME } from '../component-names';
import { MIconButton, MIconButtonSkin } from '../icon-button/icon-button';
import './auto-horizontal-scroll-unscoped.scss';
import WithRender from './auto-horizontal-scroll.html?style=./auto-horizontal-scroll.scss';

export enum MAutoHorizontalScrollGradientStyle {
    Any = 'Any',
    White = 'white',
    Light = 'light',
    Dark = 'dark',
    GreyBlack = 'grey-black',
    Interactive = 'interactive',
    InteractiveDark = 'interactive-dark',
    InteractiveDarker = 'interactive-darker',
    CurrentColor = 'current-color'
}

export interface MAutoHorizontalScrollResizeProperties {
    element: HTMLElement;
    hasHorizontalScroll: boolean;
    componentWidth: string;
    horizontalScollbarWidth: number;
}

@WithRender
@Component({
    modul: {
        i18n: {
            'fr': require('./auto-horizontal-scroll.lang.fr.json'),
            'en': require('./auto-horizontal-scroll.lang.en.json')
        }
    },
    components: { [ICON_BUTTON_NAME]: MIconButton },
    mixins: [ElementQueries]
})
export class MAutoHorizontalScroll extends ModulVue {
    @Prop({
        default: '100%',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly minWidth!: string;

    @Prop({
        default: true
    })
    public readonly horizontalScrollOffset!: number;

    @Prop({
        default: true
    })
    public readonly dragActive!: boolean;

    @Prop({
        default: MAutoHorizontalScrollGradientStyle.White,
        validator: (value: MAutoHorizontalScrollGradientStyle) =>
            Enums.toValueArray(
                MAutoHorizontalScrollGradientStyle
            ).includes(value)
    })
    public readonly gradientStyle!: MAutoHorizontalScrollGradientStyle;

    @Prop({
        default: true
    })
    public readonly leftGradientActive!: boolean;

    @Prop({
        default: true
    })
    public readonly rightGradientActive!: boolean;

    @Prop({
        default: false
    })
    public readonly previousButtonActive!: boolean;

    @Prop({
        default: false
    })
    public readonly nextButtonActive!: boolean;

    @Prop({
        default: (): string => ModulVue.prototype.$i18n.translate('m-auto-horizontal-scroll:previous-button-text')
    })
    public readonly previousButtonText?: string;

    @Prop({
        default: (): string => ModulVue.prototype.$i18n.translate('m-auto-horizontal-scroll:next-button-text')
    })
    public readonly nextButtonText?: string;

    @Prop({
        default: false
    })
    public readonly displayHorizontalScrollbar!: boolean;

    @Ref('body')
    public readonly refBody: HTMLElement;

    @Ref('bodyContent')
    public readonly refBodyContent: HTMLElement;

    public hasHorizontalScroll: boolean = false;
    public couldHaveLeftContent: boolean = false;
    public couldHaveRightContent: boolean = false;
    public componentWidth: string = '';
    public componentHeight: string = '';
    public scrollLeftCounter: number = -1;
    public scrollAnimationActive: boolean = false;
    public scrollAnimationInterval: any;
    public isDragging: boolean = false;
    public startXDragging: number = 0;
    public scrollLeftDragging: number = 0;
    private observer: MutationObserver = new MutationObserver(() => {
        this.resizeComponent();
    });

    @Emit('resize')
    public emitResize(resizeProperties: MAutoHorizontalScrollResizeProperties): void { }

    @Emit('update:horizontalScrollOffset')
    public emitUpdateHorizontalScrollOffset(horizontalScrollOffset: number): void { }

    @Emit('previous-button-click')
    public emitPreviousButtonClick(event: MouseEvent): void { }

    @Emit('next-button-click')
    public emitNextButtonClick(event: MouseEvent): void { }

    @Watch('leftGradientActive')
    public onLeftGradientActiveChange(): void {
        this.checkGradientPresence();
    }

    @Watch('displayHorizontalScrollbar')
    public onDisplayHorizontalScrollbarChange(): void {
        this.resizeComponent();
    }

    @Watch('horizontalScrollOffset', { immediate: true })
    public async onHorizontalScrollOffsetChange(): Promise<void> {
        await this.$nextTick();
        this.scrollLeftCounter++;
        if (this.scrollAnimationActive) {
            this.stopScrollAnimation();
            return;
        }
        if (
            this.refBody &&
            this.horizontalScrollOffset !== this.refBody.scrollLeft
        ) {

            if (this.scrollLeftCounter <= 0) {
                this.refBody.scrollLeft = this.horizontalScrollOffset;
            } else {
                this.startScrollAnimation();
            }

        }
    }

    @Watch('rightGradientActive')
    public onRightGradientActiveChange(): void {
        this.checkGradientPresence();
    }

    public get componentHeightStyle(): { height?: string } {
        return {
            height: !this.displayHorizontalScrollbar ? this.componentHeight : undefined
        };
    }

    public get buttonAreaHeightStyle(): { height?: string } {
        return {
            height: this.componentHeight
        };
    }

    public get hasLeftGradient(): boolean {
        return this.leftGradientActive && this.couldHaveLeftContent;
    }

    public get hasRightGradient(): boolean {
        return this.rightGradientActive && this.couldHaveRightContent;
    }

    public get hasPreviousButton(): boolean {
        return this.previousButtonActive && this.couldHaveLeftContent;
    }

    public get hasNextButton(): boolean {
        return this.nextButtonActive && this.couldHaveRightContent;
    }

    public get isGradientStyleDark(): boolean {
        return (
            this.gradientStyle ===
            MAutoHorizontalScrollGradientStyle.Dark
        );
    }

    public get isGradientStyleInteractive(): boolean {
        return (
            this.gradientStyle ===
            MAutoHorizontalScrollGradientStyle.Interactive
        );
    }

    public get isGradientStyleGreyBlack(): boolean {
        return (
            this.gradientStyle ===
            MAutoHorizontalScrollGradientStyle.GreyBlack
        );
    }

    public get isGradientStyleInteractiveDark(): boolean {
        return (
            this.gradientStyle ===
            MAutoHorizontalScrollGradientStyle.InteractiveDark
        );
    }

    public get isGradientStyleInteractiveDarker(): boolean {
        return (
            this.gradientStyle ===
            MAutoHorizontalScrollGradientStyle.InteractiveDarker
        );
    }

    public get iconButtonSkin(): string {
        return this.isGradientStyleDark ||
            this.isGradientStyleGreyBlack ||
            this.isGradientStyleInteractive ||
            this.isGradientStyleInteractiveDark ||
            this.isGradientStyleInteractiveDarker
            ? MIconButtonSkin.Dark
            : MIconButtonSkin.Light;
    }

    public async startScrollAnimation(): Promise<void> {
        this.scrollAnimationActive = true;
        await this.$nextTick();

        if (this.refBody) {
            const initialScrollLeft: number = this.refBody.scrollLeft;
            const difference: number =
                this.horizontalScrollOffset - initialScrollLeft <=
                    this.refBody.scrollWidth
                    ? this.horizontalScrollOffset - initialScrollLeft
                    : this.refBody.scrollWidth;
            const intervalDelay: number = difference > 500 ? 7 : 10;
            const increment: number = difference / intervalDelay;
            const isPositiveIncrement: boolean = increment > 0;
            let counter: number = 0;

            const scrollAnimationInterval: number = window.setInterval(() => {
                counter += intervalDelay;
                if (
                    !this.scrollAnimationActive ||
                    !this.refBody ||
                    this.refBody.scrollLeft === undefined ||
                    (
                        (
                            isPositiveIncrement &&
                            this.refBody.scrollLeft >= this.horizontalScrollOffset
                        ) ||
                        (
                            !isPositiveIncrement &&
                            this.refBody.scrollLeft <= this.horizontalScrollOffset
                        ) ||
                        counter >= 5000
                    )
                ) {
                    this.stopScrollAnimation();
                    window.clearInterval(scrollAnimationInterval);
                } else {
                    this.setScrollLeftOffset(this.refBody.scrollLeft += increment);
                }
            }, intervalDelay);
        }
    }

    public stopScrollAnimation(): void {
        this.scrollAnimationActive = false;
        this.onScroll();
    }

    public async onScroll(): Promise<void> {
        if (this.refBody && !this.scrollAnimationActive) {
            this.emitUpdateHorizontalScrollOffset(this.refBody.scrollLeft);
        }

        await this.checkGradientPresence();
    }

    public onMousedown(e: MouseEvent): void {
        this.isDragging = this.dragActive;
        this.startXDragging = e.pageX - this.refBody.offsetLeft;
        this.scrollLeftDragging = this.refBody.scrollLeft;
    }

    public onMouseleave(): void {
        this.isDragging = false;
    }

    public onMouseup(): void {
        this.isDragging = false;
    }

    public onMousemove(e: MouseEvent): void {
        if (!this.isDragging) {
            return;
        }
        e.preventDefault();
        const x: number = e.pageX - this.refBody.offsetLeft;
        const walk: number = (x - this.startXDragging) * 2;
        this.refBody.scrollLeft = this.scrollLeftDragging - walk;
    }

    protected mounted(): void {
        this.resizeComponent();
        this.$on('resizeDone', this.resizeComponent);

        if (this.refBodyContent) {
            this.observer.observe(this.refBodyContent, {
                subtree: true,
                childList: true
            });
        }
    }

    protected beforeDestroy(): void {
        this.$off('resizeDone', this.resizeComponent);

        if (this.observer) {
            this.observer.disconnect();
        }

        this.stopScrollAnimation();
    }

    private async resizeComponent(): Promise<void> {
        await this.$nextTick();
        this.componentWidth = this.$el.clientWidth
            ? `${this.$el.clientWidth}px`
            : '100%';
        this.hasHorizontalScroll =
            this.$el.clientWidth < parseInt(this.minWidth, 10);
        this.componentHeight = Boolean(this.refBodyContent)
            ? `${this.refBodyContent.clientHeight}px`
            : '';
        this.emitResize({
            element: this.$el as HTMLElement,
            hasHorizontalScroll: this.hasHorizontalScroll,
            componentWidth: this.componentWidth,
            horizontalScollbarWidth: this.refBodyContent.scrollWidth
                ? this.refBodyContent.scrollWidth
                : 0
        });
        this.checkGradientPresence();
    }

    private async setScrollLeftOffset(scrollLeftOffset: number): Promise<void> {
        await this.$nextTick();

        if (!this.refBody) {
            return;
        }

        const maxScrollLeft: number = this.refBodyContent.scrollWidth - this.refBody.clientWidth;
        if (scrollLeftOffset < 0) {
            this.refBody.scrollLeft = 0;
            this.scrollAnimationActive = false;
        } else if (scrollLeftOffset >= maxScrollLeft) {
            this.refBody.scrollLeft = maxScrollLeft - 0.5;
            this.scrollAnimationActive = false;
        } else {
            this.refBody.scrollLeft = scrollLeftOffset;
        }
    }

    private async checkGradientPresence(): Promise<void> {
        await this.$nextTick();
        this.couldHaveLeftContent =
            this.hasHorizontalScroll &&
            Boolean(this.refBody) &&
            this.refBody.scrollLeft > 2;
        this.couldHaveRightContent =
            this.hasHorizontalScroll &&
            Boolean(this.refBody) &&
            this.refBody.scrollLeft <=
            Math.round(
                this.refBody.scrollWidth -
                this.refBody.clientWidth -
                2
            );
    }
}
const AutoHorizontalScrollPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(AUTO_HORIZONTAL_SCROLL, MAutoHorizontalScroll);
    }
};

export default AutoHorizontalScrollPlugin;
