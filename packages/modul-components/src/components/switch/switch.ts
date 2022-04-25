import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SWITCH_NAME } from '../component-names';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './switch.html?style=./switch.scss';

export enum MSwitchPosition {
    Left = 'left',
    Right = 'right'
}
@WithRender
@Component({
    components: {
        MValidationMessage
    },
    mixins: [InputState]
})
export class MSwitch extends ModulVue {
    @Model('change')
    @Prop()
    public readonly value: boolean;

    @Prop({
        default: MSwitchPosition.Left,
        validator: value => Enums.toValueArray(MSwitchPosition).includes(value)
    })
    public readonly position: string;

    @Prop({ default: true })
    public readonly stateText: boolean;

    public isFocus = false;
    public id: string = `switch${uuid.generate()}`;
    private internalValue: boolean = false;

    @Watch('value')
    public onValueChange(value: boolean): void {
        this.internalValue = value;
    }

    public get propChecked(): boolean {
        return this.value !== undefined ? this.value : this.internalValue;
    }

    public set propChecked(value: boolean) {
        this.$emit('change', value);
        this.internalValue = value;
    }


    public get hasSwitchLeft(): boolean {
        return ((this.position === MSwitchPosition.Right) ? false : true);
    }

    public onClick(event): void {
        this.$emit('click', event);
    }
}

const SwitchPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SWITCH_NAME, MSwitch);
    }
};

export default SwitchPlugin;
