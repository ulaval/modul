import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Ref, Watch } from 'vue-property-decorator';
import { TEXTAREA_AUTO_HEIGHT } from '../../directives/directive-names';
import { MTextareaAutoHeight } from '../../directives/textarea-auto-height/textarea-auto-height';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement, InputManagementData } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { changeSelection, InputSelectable } from '../../utils/input/input';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MCharacterCount } from '../character-count/character-count';
import { CHARACTER_COUNT_NAME, ICON_BUTTON_NAME, INPUT_STYLE_NAME, TEXTFIELD_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './textfield.html?style=./textfield.scss';


export enum MTextfieldType {
    Text = 'text',
    Password = 'password',
    Email = 'email',
    Url = 'url',
    Telephone = 'tel',
    Number = 'number'
}

const ICON_NAME_PASSWORD_VISIBLE: string = 'm-svg__show';
const ICON_NAME_PASSWORD_HIDDEN: string = 'm-svg__hide';

@WithRender
@Component({
    components: {
        [INPUT_STYLE_NAME]: MInputStyle,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [CHARACTER_COUNT_NAME]: MCharacterCount,
        [ICON_BUTTON_NAME]: MIconButton
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
export class MTextfield extends ModulVue implements InputManagementData, InputSelectable {
    @Prop({
        default: MTextfieldType.Text,
        validator: value =>
            value === MTextfieldType.Email ||
            value === MTextfieldType.Password ||
            value === MTextfieldType.Telephone ||
            value === MTextfieldType.Text ||
            value === MTextfieldType.Url ||
            value === MTextfieldType.Number
    })
    public type: MTextfieldType;

    @Prop({ default: true })
    public icon: boolean;

    @Prop({ default: false })
    public wordWrap: boolean;

    @Prop()
    public characterCount: boolean;

    @Prop({ default: 0 })
    public maxLength: number;

    @Prop({ default: true })
    public lengthOverflow: boolean;

    @Prop({ default: 0 })
    public characterCountThreshold: number;

    @Prop({ default: '' })
    public selection: string;

    @Prop({ default: () => `mTextfield-${uuid.generate()}` })
    public id: string;

    @Prop({ default: () => uuid.generate() })
    public inputAriaDescribedby: string;

    @Prop()
    public inputAriaActivedescendant?: string;

    @Prop()
    public inputAriaAutocomplete?: string;

    @Prop()
    public inputAriaControls?: string;

    @Prop({ default: false })
    public append: boolean;

    @Ref('input')
    public refInput?: HTMLInputElement;

    public $refs: {
        input: HTMLElement
    };

    readonly internalValue: string;

    private passwordAsText: boolean = false;
    private iconDescriptionShowPassword: string = this.$i18n.translate('m-textfield:show-password');
    private iconDescriptionHidePassword: string = this.$i18n.translate('m-textfield:hide-password');

    protected created(): void {
        if (!this.$i18n) {
            throw new Error('<m-text-field> -> this.$i18n is undefined, you must install the i18n plugin.');
        }
    }

    protected mounted(): void {
        this.as<InputManagement>().trimWordWrap = this.hasWordWrap;
    }

    @Watch('type')
    private typeChanged(type: MTextfieldType): void {
        this.$log.warn(TEXTFIELD_NAME + ': Change of property "type" is not supported');
    }

    @Watch('inputType')
    private inputTypeChanged(value: string): void {
        this.as<InputManagement>().trimWordWrap = this.hasWordWrap;
    }

    @Watch('wordWrap')
    private wordWrapChanged(wordWrap: boolean): void {
        this.as<InputManagement>().trimWordWrap = this.hasWordWrap;
    }

    private togglePasswordVisibility(event): void {
        this.passwordAsText = !this.passwordAsText;
    }

    public get inputType(): MTextfieldType {
        switch (this.type) {
            case MTextfieldType.Password:
                return this.passwordAsText ? MTextfieldType.Text : MTextfieldType.Password;
            default:
                return this.type;
        }
    }

    private get passwordIcon(): boolean {
        return this.icon && this.type === MTextfieldType.Password && this.as<InputState>().active;
    }

    private get passwordIconName(): string {
        return this.passwordAsText ? ICON_NAME_PASSWORD_HIDDEN : ICON_NAME_PASSWORD_VISIBLE;
    }

    private get passwordIconDescription(): string {
        return this.passwordAsText ? this.iconDescriptionHidePassword : this.iconDescriptionShowPassword;
    }

    private get hasWordWrap(): boolean {
        let hasWordWrap: boolean = this.inputType === MTextfieldType.Text && this.wordWrap;
        if (this.inputType !== MTextfieldType.Text && this.wordWrap) {
            this.$log.warn(TEXTFIELD_NAME + ': If you want to use word-wrap prop, you need to set type prop at "text"');
        }
        return hasWordWrap;
    }

    public get valueLength(): number {
        return (this.internalValue || '').length;
    }

    private get maxLengthNumber(): number {
        return !this.lengthOverflow && this.maxLength > 0 ? this.maxLength : Infinity;
    }

    private get hasTextfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    private get isTextfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }

    private get hasCounterTransition(): boolean {
        return !this.as<InputState>().hasErrorMessage;
    }

    private resetModel(): void {
        this.$emit('input', '');
    }

    @Watch('selection')
    updateSelection(): void {
        changeSelection(this.as<InputState>().getInput() as HTMLInputElement, this.selection);
    }
}

const TextfieldPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(TEXTFIELD_NAME, MTextfield);
    }
};

export default TextfieldPlugin;
