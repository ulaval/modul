import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
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
        validator: value =>
            value === MPanelSkin.Light ||
            value === MPanelSkin.Dark ||
            value === MPanelSkin.Darker
    })
    public skin: MPanelSkin;

    @Prop()
    public highlighted: boolean;

    @Prop()
    public shadow: boolean;

    @Prop({ default: true })
    public border: boolean;

    @Prop()
    public borderLarge: boolean;

    @Prop({ default: true })
    public padding: boolean;

    @Prop()
    public paddingLarge: boolean;

    @Prop({ default: true })
    public paddingHeader: boolean;

    @Prop({ default: true })
    public paddingBody: boolean;

    @Prop({ default: true })
    public paddingFooter: boolean;

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
