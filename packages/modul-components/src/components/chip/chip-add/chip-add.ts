import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { CHIP_ADD_NAME } from '../../component-names';
import { MChipSize } from '../chip';
import WithRender from './chip-add.html?style=./chip-add.scss';

@WithRender
@Component
export class MChipAdd extends Vue {
    @Prop()
    disabled: boolean;

    @Prop()
    readonly: boolean;

    @Prop({ default: true })
    icon: boolean;

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

    public get iconSize(): string {
        return this.size === MChipSize.Small ? '13px' : '20px';
    }

    public onClick(event: Event): void {
        if (this.disabled || this.readonly) {
            return;
        }
        this.emitClick();
        this.emitAdd();
        (this.$el as HTMLElement).blur();
    }
}

const MChipAddPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CHIP_ADD_NAME, 'plugin.install');
        v.component(CHIP_ADD_NAME, MChipAdd);
    }
};

export default MChipAddPlugin;
