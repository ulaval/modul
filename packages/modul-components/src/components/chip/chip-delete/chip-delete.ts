import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import uuid from '../../../utils/uuid/uuid';
import { CHIP_DELETE_NAME } from '../../component-names';
import { MChipSize } from '../chip';
import WithRender from './chip-delete.html?style=./chip-delete.scss';

@WithRender
@Component
export class MChipDelete extends Vue {
    @Prop()
    disabled: boolean;

    @Prop()
    readonly: boolean;

    @Prop({
        default: MChipSize.Large,
        validator: value =>
            value === MChipSize.Large ||
            value === MChipSize.Small
    })
    size: MChipSize;

    @Emit('click')
    public emitClick(): void { }

    @Emit('focus')
    public emitFocus(event: FocusEvent): void { }

    @Emit('blur')
    public emitBlur(event: FocusEvent): void { }

    @Emit('delete')
    public emitDelete(): void { }

    public textId: string = `mChipDeleteText-${uuid.generate()}`;
    public iconHover: boolean = false;
    public focus: boolean = false;

    public get iconSize(): string {
        return this.size === MChipSize.Small ? '8px' : '14px';
    }

    public onClick(event: Event): void {
        if (this.disabled || this.readonly) {
            return;
        }
        this.emitClick();
        this.emitDelete();
    }

    public onMouseOver(event: Event): void {
        this.iconHover = true;
    }

    public onMouseLeave(event: Event): void {
        this.iconHover = false;
    }

    public onFocus(event: FocusEvent): void {
        this.focus = true;
        this.emitFocus(event);
    }

    public onBlur(event: FocusEvent): void {
        this.focus = false;
        this.emitBlur(event);
    }
}

const MChipDeletePlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CHIP_DELETE_NAME, 'plugin.install');
        v.component(CHIP_DELETE_NAME, MChipDelete);
    }
};

export default MChipDeletePlugin;
