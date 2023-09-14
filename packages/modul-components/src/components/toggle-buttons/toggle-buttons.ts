import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop } from 'vue-property-decorator';
import { TOGGLE_BUTTONS_NAME } from '../component-names';
import WithRender from './toggle-buttons.html?style=./toggle-buttons.scss';

export interface MToggleButton {
    id: string;
    title: string;
    pressed?: boolean;
}

export enum MToggleButtonSkin {
    SQUARED = 'default',
    ROUNDED = 'rounded'
}

@WithRender
@Component
export class MToggleButtons extends Vue {
    @Model('change')
    @Prop({ default: () => [] })
    public readonly buttons: MToggleButton[];

    @Prop({ required: true })
    public readonly ariaLabel?: string;

    @Prop({ default: true })
    public readonly multiple: boolean;

    @Prop({ default: false })
    public readonly disabled: boolean;

    @Prop({
        default: MToggleButtonSkin.SQUARED,
        validator: value =>
            value === MToggleButtonSkin.SQUARED ||
            value === MToggleButtonSkin.ROUNDED
    })
    public readonly skin: MToggleButtonSkin;

    public get skinButtons(): { [key: string]: boolean } {
        return {
            'm--is-default': this.skin === MToggleButtonSkin.SQUARED,
            'm--is-rounded': this.skin === MToggleButtonSkin.ROUNDED
        };
    }

    @Emit('click')
    public emitClick(_button: MToggleButton): void { }

    public toggle(button: MToggleButton): void {
        if (this.disabled) { return; }

        this.$emit('change', this.buttons.map(b => b.id !== button.id ?
            this.multiple ? b : { ...b, pressed: false } :
            { ...b, pressed: !b.pressed }
        ));

        this.emitClick({ ...button, pressed: !button.pressed });
    }

}

const ToggleButtonsPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(TOGGLE_BUTTONS_NAME, 'plugin.install');
        v.component(TOGGLE_BUTTONS_NAME, MToggleButtons);
    }
};

export default ToggleButtonsPlugin;
