import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import L10nPlugin from '../../utils/l10n/l10n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MASKEDFIELD_NAME } from '../component-names';
import { InputMaskOptions, MInputMask } from '../input-mask/input-mask';
import InputStyle from '../input-style/input-style';
import ValidationMesagePlugin from '../validation-message/validation-message';
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
        MInputMask
    }
})
export class MMaskedfield extends ModulVue {

    // Infinite value to display normaly the default values if no blocks is specified!
    @Prop({ default: [1e+23] })
    public blocks: number[];

    @Prop({ default: ' ' })
    public delimiter: string;

    @Prop({ default: [] })
    public delimiters: string[];

    @Prop({ default: false })
    public numericOnly: boolean;

    @Prop({ default: '' })
    public prefix: string;

    protected id: string = `mMaskedfield-${uuid.generate()}`;

    get hasMaskedfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    get isMaskedfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    get inputMaskOptions(): InputMaskOptions {
        return {
            blocks: this.blocks,
            delimiter: this.delimiter,
            delimiters: this.delimiters,
            numericOnly: this.numericOnly,
            prefix: this.prefix
        };
    }
}

const MaskedfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.use(L10nPlugin);
        v.use(InputStyle);
        v.use(ValidationMesagePlugin);
        v.component(MASKEDFIELD_NAME, MMaskedfield);
    }
};

export default MaskedfieldPlugin;
