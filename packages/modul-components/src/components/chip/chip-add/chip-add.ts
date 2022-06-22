import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../../utils/enums/enums';
import { MIcon } from '../../icon/icon';
import WithRender from './chip-add.html?style=./chip-add.scss';

enum MChipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    components: {
        MIcon
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
}
