import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { ICON_BUTTON_NAME, ICON_NAME, INPUT_STYLE_NAME, SEARCHFIELD_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MInputStyle } from '../input-style/input-style';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './searchfield.html';
import './searchfield.scss';

@WithRender
@Component({
    components: {
        [INPUT_STYLE_NAME]: MInputStyle,
        [ICON_BUTTON_NAME]: MIconButton,
        [ICON_NAME]: MIcon,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    },
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ],
    modul: {
        i18n: {
            'fr': require('./searchfield.lang.fr.json'),
            'en': require('./searchfield.lang.en.json')
        }
    }

})
export class MSearchfield extends ModulVue {
    @Prop({ default: () => `mSearchfield-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();
    public searchIconDescription: string = this.$i18n.translate('m-textfield:search');

    public $refs: {
        input: HTMLElement
    };

    @Emit('empty-field')
    public onReset(): void {
        this.as<InputManagement>().model = '';
        this.$refs?.input?.focus();
    }

    public onSearch(event: KeyboardEvent | MouseEvent): void {
        this.search(this.as<InputManagement>().model);
    }

    @Emit('search')
    private search(model: string): void { }

    private get hasSearchfieldError(): boolean {
        return this.as<InputState>().hasError;
    }

    private get isSearchfieldValid(): boolean {
        return this.as<InputState>().isValid;
    }
}

const SearchfieldPlugin: PluginObject<any> = {
    install(v): void {
        v.component(SEARCHFIELD_NAME, MSearchfield);
    }
};

export default SearchfieldPlugin;
