import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { CHIP_NAME } from '../component-names';
import MChipAdd from './chip-add/chip-add';
import MChipDelete from './chip-delete/chip-delete';
import WithRender from './chip.html';

export enum MChipMode {
    Add = 'add',
    Delete = 'delete'
}

export enum MChipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    components: {
        MChipAdd,
        MChipDelete
    }
})
export class MChip extends Vue {
    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly tabindex: string;

    @Prop({
        default: MChipMode.Add,
        validator: value => Enums.toValueArray(MChipMode).includes(value)
    })
    public readonly mode: MChipMode;

    @Prop({
        default: MChipSize.Large,
        validator: value => Enums.toValueArray(MChipSize).includes(value)
    })
    public readonly size: MChipSize;

    @Emit('click')
    public emitClick(_event: MouseEvent): void { }

    @Emit('add')
    public emitAdd(_event: MouseEvent): void { }

    @Emit('delete')
    public emitDelete(): void { }

    public get isModeAdd(): boolean {
        return this.mode === MChipMode.Add;
    }

    public get isModeDelete(): boolean {
        return this.mode === MChipMode.Delete;
    }
}

const MChipPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CHIP_NAME, 'plugin.install');
        v.component(CHIP_NAME, MChip);
    }
};

export default MChipPlugin;
