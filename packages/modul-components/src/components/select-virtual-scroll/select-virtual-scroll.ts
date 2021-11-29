import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import virtualList from 'vue-virtual-scroll-list';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { ModulVue } from '../../utils/vue/vue';
import { MSelect } from '../select/select';
import { MSelectItem } from '../select/select-item/select-item';
import WithRender from './select-virtual-scroll.html?style=./select-virtual-scroll.scss';

@WithRender
@Component({
    components: {
        MSelect,
        MSelectItem,
        'virtual-list': virtualList
    },
    mixins: [
        MSelect,
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelectVirtualScroll extends ModulVue {

    @Prop({ default: 52 }) // 208px / 4 -> base-select.scss
    public virtualScrollItemHeight: string;

    public get bindData(): any {
        return Object.assign({}, this.$props || {}, this.$attrs || {});
    }
}

