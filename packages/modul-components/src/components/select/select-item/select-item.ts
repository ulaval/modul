import { Component, Emit, Mixins, Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../../mixins/media-queries/media-queries';
import { MCheckbox } from '../../checkbox/checkbox';
import { MRadioStyle } from '../../radio-style/radio-style';
import WithRender from './select-item.html?style=./select-item.scss';

@WithRender
@Component({
    components: {
        MRadioStyle,
        MCheckbox
    }
})
export class MSelectItem extends Mixins(MediaQueries) {
    @Prop()
    public readonly label: string;

    @Prop()
    public readonly value: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly waiting: boolean;

    @Prop()
    public readonly readonly: boolean;

    @Prop()
    public readonly selected: boolean;

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
