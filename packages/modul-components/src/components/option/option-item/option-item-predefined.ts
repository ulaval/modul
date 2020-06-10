import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import WithRender from './option-item-predefined.html';

@Component
@WithRender
export class MOptionItemPredefined extends ModulVue {
    @Prop()
    public disabled: boolean;

    protected get iconName(): string {
        throw new Error('not implemented');
    }

    protected get label(): string {
        throw new Error('not implemented');
    }

    @Emit('click')
    public onClick(_event: MouseEvent): void { }
}
