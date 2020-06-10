import { Component, Emit, Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import { RADIO_STYLE_NAME } from '../../component-names';
import { MRadioStyle } from '../../radio-style/radio-style';
import WithRender from './select-item.html?style=./select-item.scss';

@WithRender
@Component({
    components: {
        [RADIO_STYLE_NAME]: MRadioStyle
    },
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

    @Prop({ default: false })
    public hideRadioButtonMobile: boolean;

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
