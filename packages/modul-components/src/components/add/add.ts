import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulVue } from '../../utils/vue/vue';
import { ADD_NAME } from '../component-names';
import { MLink, MLinkIconPosition, MLinkSkin } from '../link/link';
import WithRender from './add.html';
import './add.scss';

@WithRender
@Component({
    components: {
        MLink
    }
})
export class MAdd extends ModulVue {
    @Prop()
    public readonly disabled: boolean;

    @Prop({ default: true })
    public readonly underline: boolean;

    @Prop({
        default: MLinkSkin.Default,
        validator: value => Enums.toValueArray(MLinkSkin).includes(value)
    })
    public readonly skin: MLinkSkin;

    @Prop({
        default: MLinkIconPosition.Left,
        validator: value => Enums.toValueArray(MLinkIconPosition).includes(value)
    })
    public readonly iconPosition: MLinkIconPosition;

    @Prop({ default: '24px' })
    public readonly iconSize: string;

    @Emit('click')
    public emitClick(): void { }

    public onClick(): void {
        if (this.disabled) return;
        this.emitClick();
    }
}

const AddPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(ADD_NAME, 'plugin.install');
        v.component(ADD_NAME, MAdd);
    }
};

export default AddPlugin;
