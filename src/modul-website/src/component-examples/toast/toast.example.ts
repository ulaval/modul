import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './toast.example.html';

@WithRender
@Component
export class MWToastExample extends Vue {

    openProp: boolean = false;

    onClick(): void {
        this.openProp = !this.openProp;
    }
}
