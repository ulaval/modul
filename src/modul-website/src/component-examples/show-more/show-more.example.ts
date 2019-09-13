import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './show-more.example.html';

@WithRender
@Component
export class MWShowmoreExample extends Vue {
    data: number[] = [];
    total: number = 20;
    loading: boolean = false;

    fetchData(): void {
        if (this.data.length < this.total) {
            setTimeout(() => {
                this.data.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                this.loading = false;
            }, 1000);
        }
    }
}
