import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
@Component
export class InputLabel extends ModulVue {
    @Prop()
    public label: string;

    @Prop()
    public labelUp: boolean;

    @Prop({ default: () => uuid.generate() })
    public labelId?: string;

    @Prop()
    public requiredMarker: boolean;

    private get hasLabel(): boolean {
        return !!this.label;
    }
}
