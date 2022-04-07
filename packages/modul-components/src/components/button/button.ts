import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { BUTTON_NAME } from '../component-names';
import { MIcon } from '../icon/icon';
import { MSpinner } from '../spinner/spinner';
import WithRender from './button.html?style=./button.scss';

export enum MButtonType {
    Button = 'button',
    Submit = 'submit',
    Reset = 'reset'
}

export enum MButtonSkin {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary'
}

export enum MButtonIconPosition {
    Left = 'left',
    Right = 'right'
}

@WithRender
@Component({
    components: {
        MSpinner,
        MIcon
    }
})
export class MButton extends Vue {
    @Prop({
        default: MButtonType.Button,
        validator: value => Enums.toValueArray(MButtonType).includes(value)
    })
    public readonly type!: MButtonType;

    @Prop({
        default: MButtonSkin.Primary,
        validator: value => Enums.toValueArray(MButtonSkin).includes(value)
    })
    public readonly skin!: MButtonSkin;

    @Prop()
    public readonly precision: string;

    @Prop({ default: false })
    public readonly disabled!: boolean;

    @Prop({ default: false })
    public readonly waiting!: boolean;

    @Prop({ default: false })
    public readonly fullSize!: boolean;

    @Prop()
    public readonly iconName?: string;

    @Prop({
        default: MButtonIconPosition.Left,
        validator: value => Enums.toValueArray(MButtonIconPosition).includes(value)
    })
    public readonly iconPosition!: MButtonIconPosition;

    @Prop({ default: '12px' })
    public readonly iconSize: string;

    @Emit('click')
    public onClick(event: Event): void { }

    @Emit('mousedown')
    public onMousedown(event: MouseEvent): void { }

    @Emit('touchstart')
    public onTouchstart(event: TouchEvent): void { }

    @Emit('touchend')
    public onTouchend(event: TouchEvent): void { }

    @Emit('focus')
    public onFocus(event: FocusEvent): void { }

    @Emit('blur')
    public onBlur(event: FocusEvent): void { }

    public get isSkinPrimary(): boolean {
        return this.skin === MButtonSkin.Primary;
    }

    public get isSkinSecondary(): boolean {
        return this.skin === MButtonSkin.Secondary;
    }

    public get isSkinTertiary(): boolean {
        return this.skin === MButtonSkin.Tertiary;
    }

    public get isWaiting(): boolean {
        return !this.disabled ? this.waiting : false;
    }

    public get hasIcone(): boolean {
        return Boolean(this.iconName);
    }

    public get hasIconLeft(): boolean {
        return this.iconPosition === MButtonIconPosition.Left && this.hasIcone && !this.waiting;
    }

    public get hasIconRight(): boolean {
        return this.iconPosition === MButtonIconPosition.Right && this.hasIcone && !this.waiting;
    }

    public get hasWaitingIconLeft(): boolean {
        return this.iconPosition === MButtonIconPosition.Left && this.waiting;
    }

    public get hasWaitingIconRight(): boolean {
        return this.iconPosition === MButtonIconPosition.Right && this.waiting;
    }

    public get hasPrecision(): boolean {
        return !!this.precision || !!this.$slots.precision;
    }
}

const ButtonPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(BUTTON_NAME, 'plugin.install');
        v.component(BUTTON_NAME, MButton);
    }
};

export default ButtonPlugin;
