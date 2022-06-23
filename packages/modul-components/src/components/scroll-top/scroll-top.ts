import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import ScrollToPlugin, { ScrollToDuration } from '../../utils/scroll-to/scroll-to';
import { ModulVue } from '../../utils/vue/vue';
import { SCROLL_TOP_NAME } from '../component-names';
import { MIcon } from '../icon/icon';
import WithRender from './scroll-top.html?style=./scroll-top.scss';

export enum MScrollTopPosition {
    Fixed = 'fixed',
    Relative = 'relative'
}

@WithRender
@Component({
    components: {
        MIcon
    }
})
export class MScrollTop extends ModulVue {
    @Prop({
        default: MScrollTopPosition.Fixed,
        validator: value => Enums.toValueArray(MScrollTopPosition).includes(value)
    })
    public readonly position: string;

    @Prop({
        default: ScrollToDuration.Regular,
        validator: value => Enums.toValueArray(ScrollToDuration).includes(value)
    })
    public readonly duration: ScrollToDuration;

    public show: boolean = false;

    public scrollTopBreakPoint: number = window.innerHeight * 0.2;

    @Emit('click')
    public onClick(event: Event): void {
        this.$scrollTo.goToTop(this.duration);
    }

    protected created(): void {
        if (this.isPositionFixed) {
            this.$modul.event.$on('scroll', this.onScroll);
        } else {
            this.show = true;
        }
    }

    public onScroll(): void {
        let scrollPosition: number = window.pageYOffset;
        this.show = scrollPosition > this.scrollTopBreakPoint;
    }

    public get isPositionFixed(): boolean {
        return this.position === MScrollTopPosition.Fixed;
    }

}

const ScrollTopPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(ScrollToPlugin);
        v.component(SCROLL_TOP_NAME, MScrollTop);
    }
};

export default ScrollTopPlugin;
