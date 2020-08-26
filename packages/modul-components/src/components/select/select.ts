import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { I18N_NAME, ICON_BUTTON_NAME, ICON_NAME, INPUT_STYLE_NAME, SELECT_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MI18n } from '../i18n/i18n';
import { MIconButton } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MInputStyle } from '../input-style/input-style';
import { MOpacityTransition } from '../transitions/opacity-transition/opacity-transition';
import { MValidationMessage } from '../validation-message/validation-message';
import { MBaseSelect } from './base-select/base-select';
import WithRender from './select.html?style=./select.scss';
@WithRender
@Component({
    components: {
        MBaseSelect,
        MOpacityTransition,
        [INPUT_STYLE_NAME]: MInputStyle,
        [ICON_NAME]: MIcon,
        [VALIDATION_MESSAGE_NAME]: MValidationMessage,
        [I18N_NAME]: MI18n,
        [ICON_BUTTON_NAME]: MIconButton
    },
    mixins: [
        InputState,
        MediaQueries,
        InputManagement,
        InputWidth,
        InputLabel
    ]
})
export class MSelect extends ModulVue {

    @Model('input')
    @Prop()
    public value: any;

    @Prop()
    public options: any[];

    @Prop()
    public clearable: boolean;

    @Prop({ default: false })
    public virtualScroll: boolean;

    @Prop()
    public listMinWidth: string;

    @Prop()
    public listMaxHeight: string;

    id: string = `${SELECT_NAME}-${uuid.generate()}`;
    open: boolean = false;

    onSelect(option: any, index: number, $event: Event): void {
        this.$emit('select-item', option, index, $event);
        this.as<InputManagement>().model = this.options[index];
    }

    @Emit('open')
    onOpen(): void { }

    @Emit('close')
    onClose(): void { }

    get hasItems(): boolean {
        return this.options && this.options.length > 0;
    }

    get isEmpty(): boolean {
        return this.as<InputManagement>().hasValue || (this.open) ? false : true;
    }

    get isClearable(): boolean {
        return this.clearable !== undefined ? this.clearable && this.hasItems && this.as<InputManagement>().hasValue && this.isSelectable : this.hasItems && this.as<InputManagement>().hasValue && this.isSelectable && !this.as<InputLabel>().requiredMarker;
    }

    get selectedItems(): any {
        if (this.value) {
            return [this.value];
        }
        return [];
    }

    get isSelectable(): boolean {
        return !this.as<InputState>().isDisabled &&
            !this.as<InputState>().isReadonly;
    }

    get internalLabelUp(): boolean {
        return !this.as<InputState>().isReadonly ? this.as<InputLabel>().labelUp : true;
    }

    get internalPlaceholder(): string {
        return !this.as<InputState>().isReadonly ? this.as<InputManagement>().placeholder : '';
    }

    public onReset(): void {
        this.as<InputManagement>().model = '';
    }

    public onKeyDownDelete(event: KeyboardEvent): void {
        if (event.key === 'Delete' && this.isClearable) {
            this.onReset();
        }
    }
}

const SelectPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SELECT_NAME, MSelect);
    }
};

export default SelectPlugin;
