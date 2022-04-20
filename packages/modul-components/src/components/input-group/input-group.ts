import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { INPUT_GROUP_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MValidationMessage } from '../validation-message/validation-message';
import { InputManagement } from './../../mixins/input-management/input-management';
import { InputState } from './../../mixins/input-state/input-state';
import { ModulVue } from './../../utils/vue/vue';
import WithRender from './input-group.html?style=./input-group.scss';

export enum MMInputGroupValidationMessagePosition {
    Top = 'top',
    Bottom = 'bottom'
}

export interface MInputGroupProps {
    readonly label: string;
    readonly requiredMarker?: boolean;
    readonly validationMessagePosition?: MMInputGroupValidationMessagePosition;
}

@WithRender
@Component({
    components: {
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    },
    mixins: [
        InputState,
        InputManagement
    ]
})
export class MInputGroup extends ModulVue implements MInputGroupProps {
    @Prop()
    public readonly label!: string;

    @Prop()
    public readonly requiredMarker!: boolean;

    @Prop({
        default: MMInputGroupValidationMessagePosition.Top,
        validator: value =>
            value === MMInputGroupValidationMessagePosition.Top ||
            value === MMInputGroupValidationMessagePosition.Bottom
    })
    public readonly validationMessagePosition: MMInputGroupValidationMessagePosition;

    @Prop({
        default: () => uuid.generate()
    })
    public readonly validationMessageId?: string;

    @Emit('focusin')
    public emitFocusin(_event: FocusEvent): void { }

    @Emit('focusout')
    public emitFocusout(_event: FocusEvent): void { }

    public get hasLabel(): boolean {
        return !!this.label;
    }

    public get isValidationMessagePositionBottom(): boolean {
        return this.validationMessagePosition === MMInputGroupValidationMessagePosition.Bottom;
    }

    public get labelId(): string | undefined {
        return this.hasLabel ? uuid.generate() : undefined;
    }
}


const InputGroupPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(INPUT_GROUP_NAME, MInputGroup);
    }
};

export default InputGroupPlugin;
