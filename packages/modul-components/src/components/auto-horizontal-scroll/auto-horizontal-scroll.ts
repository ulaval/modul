import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { AUTO_HORIZONTAL_SCROLL } from '../component-names';
import IconButtonPlugin, { MIconButtonSkin } from '../icon-button/icon-button';
import WithRender from './auto-horizontal-scroll.html?style=./auto-horizontal-scroll.scss';

export enum MAutoHorizontalScrollGradientSkin {
    WhiteBackground = 'white-background',
    LightBackground = 'light-background',
    DarkBackground = 'dark-background',
    InteractiveBackground = 'interactive-background'
}

export interface MAutoHorizontalScrollResizeProperties {
    element: HTMLElement;
    hasHorizontalScroll: boolean;
    componentWidth: string;
    horizontalScollbarWidth: number;
}

@WithRender
@Component({
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
    public readonly currentScrollLeft!: number;

    @Prop({
        default: true
    })
    public readonly dragActive!: boolean;

    @Prop({
        default: MAutoHorizontalScrollGradientSkin.WhiteBackground,
        validator: (value: MAutoHorizontalScrollGradientSkin) =>
            Enums.toValueArray(
                MAutoHorizontalScrollGradientSkin
            ).includes(value)
    })
    public readonly gradientSkin!: MAutoHorizontalScrollGradientSkin;

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
        default: (): string => ModulVue.prototype.$i18n.translate('m-auto-horizontal-scroll:text-previous-button')
    })
    public readonly textPreviousButton?: string;

    @Prop({
        default: (): string => ModulVue.prototype.$i18n.translate('m-auto-horizontal-scroll:text-next-button')
    })
    public readonly textNextButton?: string;

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

    @Emit('resize')
    public emitResize(
        _resizeProperties: MAutoHorizontalScrollResizeProperties
    ): void { }

    @Emit('update:currentScrollLeft')
    public emitUpdateCurrentScrollLeft(_currentScrollLeft: number): void { }

    @Emit('click-previous-button')
    public emitClickPreviousButton(_event: MouseEvent): void { }

    @Emit('click-next-button')
    public emitClickNextButton(_event: MouseEvent): void { }

    @Watch('leftGradientActive')
    public onLeftGradientActiveChange(): void {
        this.checkGradientPresence();
    }

    @Watch('currentScrollLeft', { immediate: true })
    public async onCurrentScrollLeftChange(): Promise<void> {
        await this.$nextTick();
        if (this.scrollAnimationActive) {
            this.stopScrollAnimation();
            return;
        }
        if (
            this.$refs.body &&
            this.currentScrollLeft !== this.$refs.body.scrollLeft
        ) {
            if (this.scrollLeftCounter <= 0) {
                this.$refs.body.scrollLeft = this.currentScrollLeft;
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

    public get isSkinWhiteBackground(): boolean {
        return (
            this.gradientSkin ===
            MAutoHorizontalScrollGradientSkin.WhiteBackground
        );
    }

    public get isSkinLightBackground(): boolean {
        return (
            this.gradientSkin ===
            MAutoHorizontalScrollGradientSkin.LightBackground
        );
    }

    public get isSkinDarkBackground(): boolean {
        return (
            this.gradientSkin ===
            MAutoHorizontalScrollGradientSkin.DarkBackground
        );
    }

    public get isSkinInteractiveBackground(): boolean {
        return (
            this.gradientSkin ===
            MAutoHorizontalScrollGradientSkin.InteractiveBackground
        );
    }

    public get iconButtonSkin(): string {
        return this.isSkinDarkBackground
            ? MIconButtonSkin.Dark
            : MIconButtonSkin.Light;
    }

    public async startScrollAnimation(): Promise<void> {
        await this.$nextTick();
        const initialScrollLeft: number = this.$refs.body.scrollLeft;
        const difference: number =
            this.currentScrollLeft - initialScrollLeft <=
                this.$refs.body.scrollWidth
                ? this.currentScrollLeft - initialScrollLeft
                : this.$refs.body.scrollWidth;
        const intervaleDelay: number = difference > 500 ? 7 : 10;
        const increment: number = difference / intervaleDelay;
        const isPositiveIncrement: boolean = increment > 0;
        let counter: number = 0;
        this.scrollAnimationActive = true;

        this.scrollAnimationInterval = setInterval(() => {
            counter += intervaleDelay;
            if (
                (isPositiveIncrement &&
                    this.$refs.body.scrollLeft >= this.currentScrollLeft) ||
                (!isPositiveIncrement &&
                    this.$refs.body.scrollLeft <= this.currentScrollLeft) ||
                counter >= 5000
            ) {
                this.stopScrollAnimation();
            } else {
                this.$refs.body.scrollLeft += increment;
            }
        }, intervaleDelay);
    }

    public stopScrollAnimation(): void {
        window.clearInterval(this.scrollAnimationInterval);
        this.scrollAnimationActive = false;
        this.onScroll();
    }

    public async onScroll(): Promise<void> {
        const bodyEl: HTMLElement = this.$refs.body;

        if (bodyEl && bodyEl.scrollLeft >= 0 && !this.scrollAnimationActive) {
            this.emitUpdateCurrentScrollLeft(bodyEl.scrollLeft);
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
    }

    private async resizeComponent(): Promise<void> {
        await this.$nextTick();
        this.componentWidth = this.$el.clientWidth
            ? `${this.$el.clientWidth}px`
            : '100%';
        this.hasHorizontalScroll =
            this.$el.clientWidth < parseInt(this.minWidth, 10);
        this.componentHeight =
            !this.displayHorizontalScrollbar && Boolean(this.$refs.bodyContent)
                ? `${this.$refs.bodyContent.clientHeight}px`
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
        v.use(IconButtonPlugin);
        v.component(AUTO_HORIZONTAL_SCROLL, MAutoHorizontalScroll);
    }
};

export default AutoHorizontalScrollPlugin;
