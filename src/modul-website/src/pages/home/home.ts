import { MWCardDirections } from '@/components/card/card';
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

    private designTemplateMinWidth: number = 270;
    private designTemplateWidth: number = this.designTemplateMinWidth;
    private scrollDesignStart: boolean = false;
    private widthStep: number = 1;
    public designButtonPosition: number = 1;
    public componentIcon: any = require('./castle.svg');
    public normesIcon: any = require('./square-and-pen.svg');
    public philoIcon: any = require('./brain.svg');

    public refs: {
        body: HTMLElement;
    };

    public get cardDirection(): MWCardDirections {
        return !this.as<MediaQueries>().isMqMinM ? MWCardDirections.Column : MWCardDirections.Row;
    }

    // protected mounted(): void {
    //     this.setParallaxEffect();
    //     this.$modul.event.$on('scroll', this.onScroll);
    // }

    // protected beforeDestroy(): void {
    //     this.$modul.event.$off('scroll', this.onScroll);

    // }

    // private onScroll(): void {
    //     this.setParallaxEffect();
    // }

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

    public scrollToBody(): void {
        let offsetToScroll: number = (this.$refs.body as HTMLElement).offsetTop - 80;
        this.$scrollTo.goTo(document.body, offsetToScroll, ScrollToDuration.Long);
    }

    private onRoute(route: string): void {
        this.$router.push(route);
    }

    private get philosophy(): string {
        return this.$routerIndex.for(ROUTER_PHILOSOPHY);
    }

    private get componentsUi(): string {
        return this.$routerIndex.for(ROUTER_COMPONENTS_UI);
    }

    private get uiStandards(): any {
        return { name: ROUTER_STANDARDS_UI };
    }

    private get devStandards(): any {
        return { name: ROUTER_STANDARDS_DEVELOPMENT };
    }

    private get editorialStandards(): any {
        return { name: ROUTER_STANDARDS_EDITORIAL };

    }

    private get a11yStandards(): any {
        return { name: ROUTER_STANDARDS_ACCESSIBILITY };
    }

}
