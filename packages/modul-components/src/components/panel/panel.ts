import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { PANEL_NAME } from '../component-names';
import WithRender from './panel.html?style=./panel.scss';

export enum MPanelSkin {
    Light = 'light',
    Dark = 'dark',
    Darker = 'darker'
}

@WithRender
@Component
export class MPanel extends Vue {
    @Prop({
        default: MPanelSkin.Light,
        validator: value => Enums.toValueArray(MPanelSkin).includes(value)
    })
    public readonly skin: MPanelSkin;

    @Prop()
    public readonly highlighted: boolean;

    @Prop()
    public readonly shadow: boolean;

    @Prop({ default: true })
    public readonly border: boolean;

    @Prop()
    public readonly borderLarge: boolean;

    @Prop({ default: true })
    public readonly padding: boolean;

    @Prop()
    public readonly paddingLarge: boolean;

    @Prop({ default: true })
    public readonly paddingHeader: boolean;

    @Prop({ default: true })
    public readonly paddingBody: boolean;

    @Prop({ default: true })
    public readonly paddingFooter: boolean;

    @Emit('click')
    onClick(): void { }

    public get lightSkin(): boolean {
        return this.skin === MPanelSkin.Light;
    }

    public get darkSkin(): boolean {
        return this.skin === MPanelSkin.Dark;
    }

    public get darkerSkin(): boolean {
        return this.skin === MPanelSkin.Darker;
    }

    public get hasPaddingHeader(): boolean {
        return this.paddingHeader && this.padding;
    }

    public get hasPaddingBody(): boolean {
        return this.paddingBody && this.padding;
    }

    public get hasPaddingFooter(): boolean {
        return this.paddingFooter && this.padding;
    }
}

const PanelPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(PANEL_NAME, MPanel);
    }
};

export default PanelPlugin;
