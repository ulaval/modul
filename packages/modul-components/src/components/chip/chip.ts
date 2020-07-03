import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { CHIP_ADD_NAME, CHIP_DELETE_NAME, CHIP_NAME } from '../component-names';
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
        [CHIP_ADD_NAME]: MChipAdd,
        [CHIP_DELETE_NAME]: MChipDelete
    }
})
export class MChip extends Vue {
    @Prop()
    disabled: boolean;

    @Prop({
        default: MChipMode.Add,
        validator: value =>
            value === MChipMode.Add ||
            value === MChipMode.Delete
    })
    mode: MChipMode;

    @Prop({
        default: MChipSize.Large,
        validator: value =>
            value === MChipSize.Large ||
            value === MChipSize.Small
    })
    size: MChipSize;

    @Emit('click')
    public emitClick(): void { }

    @Emit('add')
    public emitAdd(): void { }

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
