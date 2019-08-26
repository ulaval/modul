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
    public waiting: boolean;

    @Prop()
    public readonly: boolean;

    @Prop()
    public selected: boolean;

    @Prop()
    public focused: boolean;

    @Emit('click')
    public clickEmit(): void { }

    public get isItemActive(): boolean {
        return !this.disabled && !this.waiting;
    }

    public onClick(): void {
        if (!this.disabled) {
            this.clickEmit();
        }
    }
}
