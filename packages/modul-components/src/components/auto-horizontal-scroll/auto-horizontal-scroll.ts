import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { AUTO_HORIZONTAL_SCROLL, ICON_BUTTON_NAME } from '../component-names';
import { MIconButton, MIconButtonSkin } from '../icon-button/icon-button';
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

    public $refs!: {
        body: HTMLElement;
        bodyContent: HTMLElement;
    };

    public hasHorizontalScroll: boolean = false;
    public couldHaveLeftContent: boolean = false;
    public couldHaveRightContent: boolean = false;
    public componentWidth: string = '';
    public componentHeight: string = '';
    public scrollLeftCounter: number = 0;
    public scrollAnimationActive: boolean = false;
    public scrollAnimationInterval: any;
    public isDragging: boolean = false;
    public startXDragging: number = 0;
    public scrollLeftDragging: number = 0;
    private observer: MutationObserver = new MutationObserver(() => {
        this.resizeComponent();
    });

    // tslint:disable-next-line: no-null-keyword
    public start: number | null = null;
    public timestamp: number = 5000;
    public progress: number = 0;

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
        const maxScrollLeft: number = this.$refs.bodyContent.scrollWidth - this.$refs.body.clientWidth;
        if (this.scrollAnimationActive) {
            this.stopScrollAnimation();
            return;
        } else if (this.horizontalScrollOffset < 0) {
            this.emitUpdateHorizontalScrollOffset(0);
            return;
        } else if (this.horizontalScrollOffset > maxScrollLeft) {
            this.emitUpdateHorizontalScrollOffset(maxScrollLeft - 0.5);
            return;
        }
        if (
            this.$refs.body &&
            this.horizontalScrollOffset !== this.$refs.body.scrollLeft
        ) {

            if (this.scrollLeftCounter <= 0) {
                this.$refs.body.scrollLeft = this.horizontalScrollOffset;
            } else {
                this.startScrollAnimation();
            }

        }
        this.scrollLeftCounter++;
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
        if (this.$refs.body && this.$refs.body.scrollLeft >= 0) {
            const initialScrollLeft: number = this.$refs.body.scrollLeft;
            const difference: number =
                this.horizontalScrollOffset - initialScrollLeft <=
                    this.$refs.body.scrollWidth
                    ? this.horizontalScrollOffset - initialScrollLeft
                    : this.$refs.body.scrollWidth;
            const intervalDelay: number = difference > 500 ? 7 : 10;
            const increment: number = difference / intervalDelay;
            const isPositiveIncrement: boolean = increment > 0;
            let counter: number = 0;

            const scrollAnimationInterval: number = window.setInterval(() => {
                counter += intervalDelay;
                if (
                    !this.scrollAnimationActive ||
                    !this.$refs.body ||
                    this.$refs.body.scrollLeft === undefined ||
                    (
                        (
                            isPositiveIncrement &&
                            this.$refs.body.scrollLeft >= this.horizontalScrollOffset
                        ) ||
                        (
                            !isPositiveIncrement &&
                            this.$refs.body.scrollLeft <= this.horizontalScrollOffset
                        ) ||
                        counter >= 5000
                    )
                ) {
                    this.stopScrollAnimation();
                    window.clearInterval(scrollAnimationInterval);
                } else {
                    this.$refs.body.scrollLeft += increment;
                }
            }, intervalDelay);
        }
    }

    public stopScrollAnimation(): void {
        this.scrollAnimationActive = false;
        this.onScroll();
    }

    public async onScroll(): Promise<void> {
        const bodyEl: HTMLElement = this.$refs.body;

        if (bodyEl && bodyEl.scrollLeft >= 0 && !this.scrollAnimationActive) {
            this.emitUpdateHorizontalScrollOffset(bodyEl.scrollLeft);
        }

        await this.checkGradientPresence();
    }

    public onMousedown(e: MouseEvent): void {
        this.isDragging = this.dragActive;
        this.startXDragging = e.pageX - this.$refs.body.offsetLeft;
        this.scrollLeftDragging = this.$refs.body.scrollLeft;
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
        const x: number = e.pageX - this.$refs.body.offsetLeft;
        const walk: number = (x - this.startXDragging) * 2;
        this.$refs.body.scrollLeft = this.scrollLeftDragging - walk;
    }

    protected mounted(): void {
        this.resizeComponent();
        this.$on('resizeDone', this.resizeComponent);

        if (this.$refs.bodyContent) {
            this.observer.observe(this.$refs.bodyContent, {
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
        this.componentHeight = Boolean(this.$refs.bodyContent)
            ? `${this.$refs.bodyContent.clientHeight - 1}px`
            : '';
        this.emitResize({
            element: this.$el as HTMLElement,
            hasHorizontalScroll: this.hasHorizontalScroll,
            componentWidth: this.componentWidth,
            horizontalScollbarWidth: this.$refs.bodyContent.scrollWidth
                ? this.$refs.bodyContent.scrollWidth
                : 0
        });
        this.checkGradientPresence();
    }

    private async checkGradientPresence(): Promise<void> {
        await this.$nextTick();
        this.couldHaveLeftContent =
            this.hasHorizontalScroll &&
            Boolean(this.$refs.body) &&
            this.$refs.body.scrollLeft > 30;
        this.couldHaveRightContent =
            this.hasHorizontalScroll &&
            Boolean(this.$refs.body) &&
            this.$refs.body.scrollLeft <=
            Math.round(
                this.$refs.body.scrollWidth -
                this.$refs.body.clientWidth -
                50
            );
    }
}
const AutoHorizontalScrollPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(AUTO_HORIZONTAL_SCROLL, MAutoHorizontalScroll);
    }
};

export default AutoHorizontalScrollPlugin;
