import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { ADD_NAME, BUTTON_NAME, EMPTY_AREA_NAME, SVG_NAME } from '../component-names';
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
    components: {
        [BUTTON_NAME]: MButton,
        [ADD_NAME]: MAdd,
        [SVG_NAME]: MSvg
    }
})
export class MEmptyArea extends ModulVue {
    @Prop()
    public readonly title?: string;

    @Prop()
    public readonly subtitle?: string;

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
    public emitButtonClick(event: MouseEvent): void { }

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
