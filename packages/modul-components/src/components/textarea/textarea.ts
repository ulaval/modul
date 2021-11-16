import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Mixins, Prop } from 'vue-property-decorator';
import { TEXTAREA_AUTO_HEIGHT } from '../../directives/directive-names';
import { MTextareaAutoHeight } from '../../directives/textarea-auto-height/textarea-auto-height';
import { ElementQueries } from '../../mixins/element-queries/element-queries';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { MCharacterCount } from '../character-count/character-count';
import { TEXTAREA_NAME } from '../component-names';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './textarea.html?style=./textarea.scss';


@WithRender
@Component({
    components: {
        MInputStyle,
        MValidationMessage,
        MCharacterCount
    },
    directives: {
        [TEXTAREA_AUTO_HEIGHT]: MTextareaAutoHeight
    },
})
export class MTextarea extends Mixins(
    InputState,
    InputManagement,
    InputWidth,
    InputLabel,
    ElementQueries
) {
    @Prop()
    public characterCount: boolean;

    @Prop({ default: 0 })
    public maxLength: number;

    @Prop({ default: true })
    public lengthOverflow: boolean;

    @Prop({ default: 0 })
    public characterCountThreshold: number;

    @Prop({ default: () => `mTextarea-${uuid.generate()}` })
    public id: string;

    @Prop({ default: () => uuid.generate() })
    public inputAriaDescribedby: string;

    @Prop()
    public inputAriaActivedescendant?: string;

    @Prop()
    public inputAriaAutocomplete?: string;

    @Prop()
    public inputAriaControls?: string;

    public $refs: {
        input: HTMLElement
    };

    readonly internalValue: string;
    private internalTextareaHeight: string = '0';

    private get valueLength(): number {
        return this.internalValue.length;
    }

    private get maxLengthNumber(): number {
        return !this.lengthOverflow && this.maxLength > 0 ? this.maxLength : Infinity;
    }

    private get hasTextareaError(): boolean {
        return this.hasError;
    }

    private get isTextareaValid(): boolean {
        return this.isValid;
    }
}

const TextareaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TEXTAREA_NAME, MTextarea);
    }
};

export default TextareaPlugin;
