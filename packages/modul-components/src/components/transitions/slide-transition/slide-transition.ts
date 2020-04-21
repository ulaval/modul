
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ScrollToDuration } from '../../../utils/scroll-to/scroll-to';
import { ModulVue } from '../../../utils/vue/vue';
import { SLIDE_TRANSITION_NAME } from '../../component-names';
import WithRender from './slide-transition.html?style=./slide-transition.scss';

export enum MSlideTransitionDirection {
    LeftToRight = 'left-to-right',
    RightToLeft = 'right-to-left'
}

@WithRender
@Component
export class MSlideTransition extends ModulVue {

    @Prop({ default: MSlideTransitionDirection.LeftToRight })
    public direction: MSlideTransitionDirection;

    @Prop({ default: 0 })
    public scrollToOffset: number; // the offset to add (in case of a sticky header)

    @Prop({ default: true })
    public automaticScroll: boolean;

    @Prop({ default: false })
    public disabled: boolean;

    public get transitionName(): string | undefined {
        return !this.disabled ? 'm--is' : undefined;
    }

    public get isLeftToRight(): boolean {
        return this.direction === MSlideTransitionDirection.LeftToRight;
    }

    @Emit('before-enter')
    public beforeEnter(el: HTMLElement): void { }

    @Emit('enter')
    public enter(el: HTMLElement, done): void {
        if (!this.disabled) {
            if (this.automaticScroll) {
                this.$scrollTo.goTo(this.$el as HTMLElement, this.scrollToOffset, ScrollToDuration.Regular);
            }
            setTimeout(() => {
                this.addStyleProperty(el);
            }, 100);
        } else {
            done();
        }
    }

    @Emit('after-enter')
    public afterEnter(el: HTMLElement): void {
        this.removeStyleProperty(el);
    }

    @Emit('enter-cancelled')
    public enterCancelled(el: HTMLElement): void { }

    @Emit('before-leave')
    public beforeLeave(el: HTMLElement): void {
        this.addStyleProperty(el);
    }

    @Emit('leave')
    public leave(el: HTMLElement, done): void { }

    @Emit('after-leave')
    public afterLeave(el: HTMLElement): void {
        this.removeStyleProperty(el);
    }

    @Emit('leave-cancelled')
    public leaveCancelled(el: HTMLElement): void { }

    public addStyleProperty(el: HTMLElement): void {
        (this.$el as HTMLElement).style.height = this.getHeightEl(el) + 'px';
        (this.$el as HTMLElement).style.overflow = 'hidden';
    }

    public removeStyleProperty(el: HTMLElement): void {
        (this.$el as HTMLElement).style.removeProperty('height');
        (this.$el as HTMLElement).style.removeProperty('overflow');
    }

    private getHeightEl(el: HTMLElement): number {
        let elComputedStyle: any = window.getComputedStyle(el);
        return el.getBoundingClientRect().height +
            + parseInt(elComputedStyle.marginTop as string, 10)
            + parseInt(elComputedStyle.marginBottom as string, 10);
    }
}

const SlideTransitionPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SLIDE_TRANSITION_NAME, MSlideTransition);
    }
};

export default SlideTransitionPlugin;
