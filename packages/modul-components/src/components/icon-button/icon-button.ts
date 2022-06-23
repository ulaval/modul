import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ICON_BUTTON_NAME } from '../component-names';
import IconPlugin, { MIcon } from '../icon/icon';
import WithRender from './icon-button.html?style=./icon-button.scss';

export enum MIconButtonSkin {
    Light = 'light',
    Dark = 'dark',
    Primary = 'primary',
    Secondary = 'secondary',
    Link = 'link',
    Bold = 'bold'
}

@WithRender
@Component({
    components: {
        MIcon
    }
})
export class MIconButton extends Vue {
    @Prop({
        default: MIconButtonSkin.Light,
        validator: value => Enums.toValueArray(MIconButtonSkin).indexOf(value) !== -1
    })
    public readonly skin: MIconButtonSkin;

    @Prop()
    public readonly disabled: boolean;

    @Prop({ default: '44px' })
    public readonly buttonSize: string;

    @Prop({ default: 'm-svg__close-clear' })
    public readonly iconName: string;

    @Prop({ default: '20px' })
    public readonly iconSize: string;

    @Prop({ default: true })
    public readonly ripple: boolean;

    @Prop()
    public readonly title: string;

    private hasSlot: boolean = false;

    @Emit('keydown')
    public onKeydown(event: KeyboardEvent): void { }

    public onClick(event: Event): void {
        this.$emit('click', event);
    }

    public onFocus(event: Event): void {
        this.$emit('focus');
    }

    public onBlur(event: Event): void {
        this.$emit('blur');
    }

    public get isSkinLight(): boolean {
        return this.skin === MIconButtonSkin.Light;
    }

    public get isSkinDark(): boolean {
        return this.skin === MIconButtonSkin.Dark;
    }

    public get isSkinPrimary(): boolean {
        return this.skin === MIconButtonSkin.Primary;
    }

    public get isSkinSecondary(): boolean {
        return this.skin === MIconButtonSkin.Secondary;
    }

    public get isSkinLink(): boolean {
        return this.skin === MIconButtonSkin.Link;
    }

    public get isSkinBold(): boolean {
        return this.skin === MIconButtonSkin.Bold;
    }
}

const IconButtonPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(ICON_BUTTON_NAME, 'plugin.install');
        v.use(IconPlugin);
        v.component(ICON_BUTTON_NAME, MIconButton);
    }
};

export default IconButtonPlugin;
