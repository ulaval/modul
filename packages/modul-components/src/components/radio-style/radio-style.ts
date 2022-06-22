import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';

import { ModulVue } from '../../utils/vue/vue';
import { RADIO_STYLE_NAME } from '../component-names';
import WithRender from './radio-style.html?style=./radio-style.scss';

export enum MRadioStylePosition {
    Left = 'left',
    Right = 'right'
}

export interface RadioGroup {
    name: string;
    radioPosition: MRadioStylePosition;
    enabled: boolean;
    inline: boolean;
    getValue(): string;
    updateValue(value: string): void;
}

@WithRender
@Component
export class MRadioStyle extends ModulVue {
    @Prop({
        default: MRadioStylePosition.Right,
        validator: value => Enums.toValueArray(MRadioStylePosition).includes(value)
    })
    public readonly radioPosition: MRadioStylePosition;

    @Prop({ default: '1em' })
    public readonly inputSize: string;

    @Prop()
    public readonly focus: boolean;

    @Prop()
    public readonly checked: boolean;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly fullWidth: boolean;

    public get isInputRight(): boolean {
        return this.radioPosition === MRadioStylePosition.Right;
    }

    public onClick(event: MouseEvent): void {
        if (!this.disabled) {
            this.$emit('click', event);
        }
    }
}

const RadioStylePlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(RADIO_STYLE_NAME, MRadioStyle);
    }
};

export default RadioStylePlugin;
