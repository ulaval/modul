import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './transition.example.html';

@WithRender
@Component
export class MWTransitionExample extends Vue {

    open: boolean = true;
    type: string = 'm-accordion-transition';

    toggleOpenAccordion(): void {

        this.open = !this.open;
    }

    toggleOpenSlide(): void {
        this.type = 'm-slide-transition';
        this.open = !this.open;
    }
}
