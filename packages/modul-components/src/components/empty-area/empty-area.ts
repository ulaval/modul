import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { EMPTY_AREA_NAME } from '../component-names';
import { MAdd } from './../add/add';
import {
    MButton,
    MButtonSkin
} from './../button/button';
import { MSvg } from './../svg/svg';
import WithRender from './empty-area.html?style=./empty-area.scss';

export enum MEmptyAreaButtonType {
    Button = 'button',
    AddButton = 'add-button'
}

@WithRender
@Component({
    components: { MButton, MAdd, MSvg }
})
export class MEmptyArea extends ModulVue {
    @Prop()
    public readonly text?: string;

    @Prop()
    public readonly buttonText?: string;

    @Prop({
        default: MEmptyAreaButtonType.AddButton,
        validator: (value: MEmptyAreaButtonType) =>
            Enums.toValueArray(MEmptyAreaButtonType).includes(value)
    })
    public readonly buttonType!: MEmptyAreaButtonType;

    @Prop()
    public svgName?: string;

    public readonly buttonSkin: MButtonSkin = MButtonSkin.Secondary;

    @Emit('button-click')
    public emitButtonClick(): void { }

    public get isButtonTypeAdd(): boolean {
        return this.buttonType === MEmptyAreaButtonType.AddButton;
    }
}


const EmptyAreaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(EMPTY_AREA_NAME, MEmptyArea);
    }
};

export default EmptyAreaPlugin;
