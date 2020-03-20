import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import uuid from '../../../utils/uuid/uuid';
import WithRender from './chip-delete.html?style=./chip-delete.scss';

enum MChipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component
export default class MChipDelete extends Vue {
    @Prop()
    disabled: boolean;

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
        if (this.disabled) {
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
