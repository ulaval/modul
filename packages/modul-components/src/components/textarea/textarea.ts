import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { TEXTAREA_AUTO_HEIGHT } from '../../directives/directive-names';
import { MTextareaAutoHeight } from '../../directives/textarea-auto-height/textarea-auto-height';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement, InputManagementData } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MCharacterCount } from '../character-count/character-count';
import { CHARACTER_COUNT_NAME, INPUT_STYLE_NAME, TEXTAREA_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './textarea.html?style=./textarea.scss';


@WithRender
@Component({
    components: {
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [CHARACTER_COUNT_NAME]: MCharacterCount
    },
    directives: {
        [TEXTAREA_AUTO_HEIGHT]: MTextareaAutoHeight
    },
    mixins: [
        InputState,
        InputManagement,
        InputWidth,
        InputLabel,
        ElementQueries
    ]
})
export class MTextarea extends ModulVue implements InputManagementData {
    @Prop()
    public characterCount: boolean;
    @Prop({ default: 0 })
    public maxLength: number;
    @Prop({ default: true })
    public lengthOverflow: boolean;
    @Prop({ default: 0 })
    public characterCountThreshold: number;

    public $refs: {
        input: HTMLElement
    };

    readonly internalValue: string;
    private internalTextareaHeight: string = '0';
    private id: string = `mTextarea-${uuid.generate()}`;

    private get valueLength(): number {
        return this.internalValue.length;
    }

    private get maxLengthNumber(): number {
        return !this.lengthOverflow && this.maxLength > 0 ? this.maxLength : Infinity;
    }

    private get hasTextareaError(): boolean {
        return this.as<InputState>().hasError;
    }

    private get isTextareaValid(): boolean {
        return this.as<InputState>().isValid;
    }
}

const TextareaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TEXTAREA_NAME, MTextarea);
    }
};

export default TextareaPlugin;
