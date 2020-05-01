import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { OPTION_ITEM_NAME } from '../../component-names';
import { MOptionItem } from './option-item';
import WithRender from './option-item-predefined.html';


@Component({
    components: {
        [OPTION_ITEM_NAME]: MOptionItem
    }
})
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

    private onClick(event: Event): void {
        this.$emit('click', event);
    }
}
