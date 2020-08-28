import { PluginObject } from 'vue';
import { Component, Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
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

export enum MEmptyAreaBackgroundStyle {
    Any = 'any',
    Light = 'light'
}

export enum MEmptyAreaDisplayMode {
    Inline = 'inline',
    Block = 'block'
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
    public readonly svgName?: string;

    @Prop({
        default: MEmptyAreaBackgroundStyle.Light,
        validator: (value: MEmptyAreaBackgroundStyle) =>
            Enums.toValueArray(MEmptyAreaBackgroundStyle).includes(value)
    })
    public readonly backgroundStyle?: MEmptyAreaBackgroundStyle;

    @Prop({
        default: MEmptyAreaDisplayMode.Block,
        validator: (value: MEmptyAreaDisplayMode) =>
            Enums.toValueArray(MEmptyAreaDisplayMode).includes(value)
    })
    public readonly displayMode?: MEmptyAreaDisplayMode;

    @Prop({
        default: '60px',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly svgSize?: MEmptyAreaDisplayMode;

    @Prop({
        default: '280px',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value) || value === 'auto'
    })
    public readonly minHeight: string;

    public buttonSkin: MButtonSkin = MButtonSkin.Secondary;

    @Emit('button-click')
    public emitButtonClick(event: MouseEvent): void { }

    public get isButtonTypeAdd(): boolean {
        return this.buttonType === MEmptyAreaButtonType.AddButton;
    }

    public get hasContentArea(): boolean {
        return Boolean(this.svgName || this.title || this.subtitle);
    }
}


const EmptyAreaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(EMPTY_AREA_NAME, MEmptyArea);
    }
};

export default EmptyAreaPlugin;
