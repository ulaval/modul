import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { INPUT_STYLE_NAME, MASKEDFIELD_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './maskedfield.html?style=./maskedfield.scss';

@WithRender
@Component({
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ],
    components: {
        MInputMask,
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    }
})
export class MMaskedfield extends ModulVue {
    @Prop({ default: {} })
    public readonly maskOptions: InputMaskOptions;

    @Prop({ default: true })
    public readonly raw: boolean;

    @Prop({ default: () => `mMaskedfield-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();

    public get hasMaskedfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get isMaskedfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

}

const MaskedfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.component(MASKEDFIELD_NAME, MMaskedfield);
    }
};

export default MaskedfieldPlugin;
