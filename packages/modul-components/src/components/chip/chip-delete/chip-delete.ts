import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import closeClearSvg from '../../../assets/icons/svg/close-clear.svg';
import { Enums } from '../../../utils/enums/enums';
import { ModulIconName } from '../../../utils/modul-icons/modul-icons';
import uuid from '../../../utils/uuid/uuid';
import { MSvg } from '../../svg/svg';
import { MChipSize } from '../chip.def';
import WithRender from './chip-delete.html?style=./chip-delete.scss';

@WithRender
@Component({
    components: {
        MSvg
    },
    modul: {
        i18n: {
            fr: require('./../chip.lang.fr.json'),
            en: require('./../chip.lang.en.json')
        }
    }
})
export default class MChipDelete extends Vue {
    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly tabindex: string;

    @Prop({
        default: MChipSize.Large,
        validator: value => Enums.toValueArray(MChipSize).includes(value)
    })
    public readonly size: MChipSize;

    public readonly iconName = ModulIconName.CloseClear;
    public textId: string = `mChipDeleteText-${uuid.generate()}`;
    public iconHover: boolean = false;
    public focused: boolean = false;


    @Emit('click')
    public emitClick(_event: MouseEvent): void { }

    @Emit('delete')
    public emitDelete(_event: MouseEvent): void { }


    public get iconSize(): string {
        return this.size === MChipSize.Small ? '8px' : '14px';
    }

    public onClick(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }
        this.emitClick(event);
        this.emitDelete(event);
    }

    public onFocus(): void {
        this.focused = true;
    }

    public onBlur(): void {
        this.focused = false;
    }

    public onMouseOver(): void {
        this.iconHover = true;
    }

    public onMouseLeave(): void {
        this.iconHover = false;
    }

    protected beforeCreate(): void {
        this.$svgSprite.addSvg(ModulIconName.CloseClear, closeClearSvg as string);
    }
}
