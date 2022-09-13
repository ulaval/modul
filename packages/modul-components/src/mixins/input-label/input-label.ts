import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
@Component
export class InputLabel extends ModulVue {
    @Prop()
    public readonly label: string;

    @Prop()
    public readonly inputAriaLabel: string;

    @Prop()
    public readonly labelUp: boolean;

    @Prop({ default: () => uuid.generate() })
    public readonly labelId?: string;

    @Prop()
    public readonly requiredMarker: boolean;


    public get hasLabel(): boolean {
        return !!this.label;
    }
}
