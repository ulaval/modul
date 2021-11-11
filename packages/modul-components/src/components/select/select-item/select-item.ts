import { Component, Emit, Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { ModulVue } from '../../../utils/vue/vue';
import { MCheckbox } from '../../checkbox/checkbox';
import { CHECKBOX_NAME, RADIO_STYLE_NAME } from '../../component-names';
import { MRadioStyle } from '../../radio-style/radio-style';
import WithRender from './select-item.html?style=./select-item.scss';

@WithRender
@Component({
    components: {
        [RADIO_STYLE_NAME]: MRadioStyle,
        [CHECKBOX_NAME]: MCheckbox
    },
    mixins: [MediaQueries]
})
export class MSelectItem extends ModulVue {
    @Prop()
    public readonly label: string;

    @Prop()
    public readonly value: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly waiting: boolean;

    @Prop()
    public readonly: boolean;

    @Prop()
    public selected: boolean;

    @Prop()
    public readonly multiselect: boolean;

    @Prop()
    public readonly focused: boolean;

    @Prop({ default: false })
    public readonly hideRadioButtonMobile: boolean;

    @Prop()
    public readonly id: string;

    @Emit('click')
    public emitClick($event: Event): void { }

    public get isItemActive(): boolean {
        return !this.disabled;
    }

    public get isFocused(): boolean {
        return this.isItemActive && this.focused;
    }

    public onClick($event: Event): void {
        if (!this.disabled) {
            this.emitClick($event);
        }
    }
}
