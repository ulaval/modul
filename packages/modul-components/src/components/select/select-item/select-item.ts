import { Component, Emit, Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import WithRender from './select-item.html?style=./select-item.scss';

@WithRender
@Component({
    mixins: [MediaQueries]
})
export class MSelectItem extends ModulVue {
    @Prop()
    public label: string;

    @Prop()
    public value: any;

    @Prop()
    public disabled: boolean;

    @Prop()
    public readonly: boolean;

    @Prop()
    public selected: boolean;

    @Prop()
    public focused: boolean;

    @Emit('click')
    public emitClick($event: Event): void { }

    public get isItemActive(): boolean {
        return !this.disabled;
    }

    public onClick($event: Event): void {
        if (!this.disabled) {
            this.emitClick($event);
        }
    }
}
