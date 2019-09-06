import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { OPACITY_TRANSITION_NAME } from '../../component-names';
import WithRender from './opacity-transition.html?style=./opacity-transition.scss';

const CLASS_HAS_TRANSITION: string = 'm--has-transition';
const CLASS_HAS_ZOOM_EFFECT: string = 'm--has-zoom-effect';

@WithRender
@Component
export class MOpacityTransition extends ModulVue {
    @Prop({ default: false })
    public disabled: boolean;

    @Prop({ default: true })
    public zoomEffect: boolean;

    public setClassOfTransition(el: HTMLElement): void {
        if (!el.classList.contains(OPACITY_TRANSITION_NAME)) {
            el.classList.add(OPACITY_TRANSITION_NAME);
        }

        if (!this.disabled) {
            if (!el.classList.contains(CLASS_HAS_TRANSITION)) {
                el.classList.add(CLASS_HAS_TRANSITION);
            }
        } else if (el.classList.contains(CLASS_HAS_TRANSITION)) {
            el.classList.remove(CLASS_HAS_TRANSITION);
        }

        if (this.zoomEffect && !this.disabled) {
            if (!el.classList.contains(CLASS_HAS_ZOOM_EFFECT)) {
                el.classList.add(CLASS_HAS_ZOOM_EFFECT);
            }
        } else if (el.classList.contains(CLASS_HAS_ZOOM_EFFECT)) {
            el.classList.remove(CLASS_HAS_ZOOM_EFFECT);
        }
    }

    @Emit('before-enter')
    public beforeEnter(el: HTMLElement): void {
        this.setClassOfTransition(el);
    }

    @Emit('enter')
    public enter(el: HTMLElement, done): void { }

    @Emit('after-enter')
    public afterEnter(el: HTMLElement): void { }

    @Emit('enter-cancelled')
    public enterCancelled(el: HTMLElement): void { }

    @Emit('before-leave')
    public beforeLeave(el: HTMLElement): void {
        this.setClassOfTransition(el);
    }

    @Emit('leave')
    public leave(el: HTMLElement, done): void { }

    @Emit('after-leave')
    public afterLeave(el: HTMLElement): void { }

    @Emit('leave-cancelled')
    public leaveCancelled(el: HTMLElement): void { }
}

const OpacityTransitionPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(OPACITY_TRANSITION_NAME, MOpacityTransition);
    }
};

export default OpacityTransitionPlugin;
