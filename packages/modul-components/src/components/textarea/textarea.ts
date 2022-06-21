import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { TEXTAREA_AUTO_HEIGHT } from '../../directives/directive-names';
import { MTextareaAutoHeight } from '../../directives/textarea-auto-height/textarea-auto-height';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
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
    mixins: [
        InputState,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MTextarea extends ModulVue {
    @Prop()
    public readonly characterCount: boolean;

    @Prop({ default: 0 })
    public readonly maxLength: number;

    @Prop({ default: true })
    public readonly lengthOverflow: boolean;

    @Prop({ default: 0 })
    public readonly characterCountThreshold: number;

    @Prop({ default: () => `mTextarea-${uuid.generate()}` })
    public readonly id: string;

    @Prop({ default: () => uuid.generate() })
    public readonly inputAriaDescribedby: string;

    @Prop()
    public readonly inputAriaActivedescendant?: string;

    @Prop()
    public readonly inputAriaAutocomplete?: string;

    @Prop()
    public readonly inputAriaControls?: string;

    public $refs: {
        input: HTMLElement
    };

    public readonly internalValue: string;
    private internalTextareaHeight: string = '0';

    public get valueLength(): number {
        return this.internalValue.length;
    }

    public get maxLengthNumber(): number {
        return !this.lengthOverflow && this.maxLength > 0 ? this.maxLength : Infinity;
    }

    public get hasTextareaError(): boolean {
        return this.as<InputState>().hasError;
    }

    public get isTextareaValid(): boolean {
        return this.as<InputState>().isValid;
    }
}

const TextareaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TEXTAREA_NAME, MTextarea);
    }
};

export default TextareaPlugin;
