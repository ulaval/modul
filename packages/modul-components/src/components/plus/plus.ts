import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { PLUS_NAME } from '../component-names';
import WithRender from './plus.html?style=./plus.scss';

export enum MPlusSkin {
    Default = 'default',
    Light = 'light',
    CurrentColor = 'current-color'
}

@WithRender
@Component
export class MPlus extends ModulVue {
    @Prop()
    public readonly titleOpen: string;

    @Prop()
    public readonly titleClose: string;

    @Prop()
    public readonly open: boolean;

    @Prop()
    public readonly large: boolean;

    @Prop()
    public readonly border: boolean;

    @Prop({
        default: MPlusSkin.Default,
        validator: value => Enums.toValueArray(MPlusSkin).includes(value)
    })
    public readonly skin: string;

    @Prop()
    public readonly disabled: boolean;

    public get title(): string {
        return this.open ? this.titleClose : this.titleOpen;
    }

    private onClick(event: Event): void {
        if (!this.disabled) {
            this.$emit('click', event);
        }
    }
}

const PlusPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(PLUS_NAME, MPlus);
    }
};

export default PlusPlugin;
