import { ModulWebsite } from '@/components/modul-website';
import { ROUTER_COMPONENTS_UI, ROUTER_PHILOSOPHY, ROUTER_STANDARDS_ACCESSIBILITY, ROUTER_STANDARDS_DEVELOPMENT, ROUTER_STANDARDS_EDITORIAL, ROUTER_STANDARDS_UI } from '@/router';
import { MediaQueries } from '@ulaval/modul-components/dist/mixins/media-queries/media-queries';
import { ScrollToDuration } from '@ulaval/modul-components/dist/utils/scroll-to/scroll-to';
import Component from 'vue-class-component';
import WithRender from './home.html?style=./home.scss';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MWHomePage extends ModulWebsite {

    // private designTemplateMinWidth: number = 270;
    // private designTemplateWidth: number = this.designTemplateMinWidth;
    // private scrollDesignStart: boolean = false;
    // private widthStep: number = 1;

    // public designButtonPosition: number = 1;
    public windowScrollY: number = 0;
    public hasButtonScrollToBody: boolean = true;
    public componentIcon: any = require('./castle.svg');
    public normesIcon: any = require('./square-and-pen.svg');
    public philoIcon: any = require('./brain.svg');

    public refs: {
        body: HTMLElement;
    };

    protected mounted(): void {
        this.setParallaxEffect();
        this.$modul.event.$on('scroll', this.onScroll);
    }

    protected beforeDestroy(): void {
        this.$modul.event.$off('scroll', this.onScroll);
    }

    // private setParallaxEffect() {
    //     if (this.as<MediaQueriesMixin>().isMqMinS) {
    //         let windowHeight: number = window.innerHeight;
    //         let scrollY: number = this.$modul.scrollPosition == 0 ? this.$modul.stopScrollPosition : this.$modul.scrollPosition;
    //         let designTop: number = (this.$refs.design as HTMLElement).getBoundingClientRect().top - 70;
    //         let designTemplateMaxWidth: number = (this.$refs.designBody as HTMLElement).clientWidth;
    //         let designTemplateWidthRemaining: number = designTemplateMaxWidth - this.designTemplateMinWidth;
    //         this.experimentContentPosition = scrollY / 18;
    //         this.experimentTitlePosition = - (scrollY / 18);
    //         this.designButtonPosition = (designTop - 60) <= windowHeight ? ((designTop - 60) - windowHeight) / 2 : 1;
    //         if (designTop >= 0) {
    //             this.designTemplateWidth = designTop <= designTemplateWidthRemaining ? designTemplateMaxWidth - designTop : this.designTemplateMinWidth;
    //         } else {
    //             this.designTemplateWidth = designTemplateMaxWidth;
    //         }
    //     }
    // }

    public get logoModulStyle(): Object {
        return { marginTop: `${-(this.windowScrollY * 0.2)}px` };
    }

    public get philosophy(): string {
        return this.$routerIndex.for(ROUTER_PHILOSOPHY);
    }

    public get componentsUi(): string {
        return this.$routerIndex.for(ROUTER_COMPONENTS_UI);
    }

    public get uiStandards(): any {
        return { name: ROUTER_STANDARDS_UI };
    }

    public get devStandards(): any {
        return { name: ROUTER_STANDARDS_DEVELOPMENT };
    }

    public get editorialStandards(): any {
        return { name: ROUTER_STANDARDS_EDITORIAL };

    }

    public get a11yStandards(): any {
        return { name: ROUTER_STANDARDS_ACCESSIBILITY };
    }

    public scrollToBody(): void {
        let offsetToScroll: number = (this.$refs.body as HTMLElement).offsetTop - 54;
        this.$scrollTo.goTo(document.body, offsetToScroll, ScrollToDuration.Long);
    }

    private onScroll(): void {
        this.setParallaxEffect();
    }

    public onRoute(route: string): void {
        this.$router.push(route);
    }

    private setParallaxEffect(): void {
        this.windowScrollY = window.scrollY;
        let windowheight: number = window.innerHeight;
        if (this.windowScrollY > (windowheight / 3)) {
            this.hasButtonScrollToBody = false;
        } else {
            this.hasButtonScrollToBody = true;
        }
    }
}
