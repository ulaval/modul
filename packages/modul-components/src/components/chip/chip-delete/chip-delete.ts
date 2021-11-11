import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { I18N_NAME } from '../../../filters/filter-names';
import { i18nFilter } from '../../../filters/i18n/i18n';
import uuid from '../../../utils/uuid/uuid';
import { ICON_NAME } from '../../component-names';
import { MIcon } from '../../icon/icon';
import WithRender from './chip-delete.html?style=./chip-delete.scss';

enum MChipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    components: {
        [ICON_NAME]: MIcon
    },
    filters: {
        [I18N_NAME]: i18nFilter
    }
})
export default class MChipDelete extends Vue {
    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly tabindex: string;

    @Prop({
        default: MChipSize.Large,
        validator: value =>
            value === MChipSize.Large ||
            value === MChipSize.Small
    })
    public readonly size: MChipSize;

    @Emit('click')
    public emitClick(_event: MouseEvent): void { }

    @Emit('delete')
    public emitDelete(_event: MouseEvent): void { }

    public textId: string = `mChipDeleteText-${uuid.generate()}`;
    public iconHover: boolean = false;
    public focused: boolean = false;

    public get iconSize(): string {
        return this.size === MChipSize.Small ? '8px' : '14px';
    }

    public onClick(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }
        this.emitClick(event);
        this.emitDelete(event);
        (event.currentTarget as HTMLElement).blur();
    }

    public onFocus(): void {
        this.focused = true;
    }

    public onBlur(): void {
        this.focused = false;
    }

    public onMouseOver(event: Event): void {
        this.iconHover = true;
    }

    public onMouseLeave(event: Event): void {
        this.iconHover = false;
    }
}
