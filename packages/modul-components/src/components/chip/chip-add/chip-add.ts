import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import addCircleSvg from '../../../assets/icons/svg/add-circle.svg';
import { Enums } from '../../../utils/enums/enums';
import { ModulIconName } from '../../../utils/modul-icons/modul-icons';
import { MSvg } from '../../svg/svg';
import { MChipSize } from '../chip.def';
import WithRender from './chip-add.html?style=./chip-add.scss';

@WithRender
@Component({
    components: {
        MSvg
    },
    modul: {
        i18n: {
            'fr': require('./../chip.lang.fr.json'),
            'en': require('./../chip.lang.en.json')
        }
    }
})
export default class MChipAdd extends Vue {
    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly tabindex: string;

    @Prop({ default: true })
    public readonly icon: boolean;

    @Prop({
        default: MChipSize.Large,
        validator: value => Enums.toValueArray(MChipSize).includes(value)
    })
    public readonly size: MChipSize;

    public readonly iconName = ModulIconName.AddCircle;

    @Emit('click')
    public emitClick(_event: MouseEvent): void { }

    @Emit('add')
    public emitAdd(_event: MouseEvent): void { }

    public get iconSize(): string {
        return this.size === MChipSize.Small ? '13px' : '20px';
    }

    public onClick(event: MouseEvent): void {
        if (this.disabled) {
            return;
        }
        this.emitClick(event);
        this.emitAdd(event);
    }

    protected beforeCreate(): void {
        this.$svgSprite.addSvg(ModulIconName.AddCircle, addCircleSvg as string);
    }
}
