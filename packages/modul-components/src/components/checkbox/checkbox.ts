import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { CHECKBOX_NAME, VALIDATION_MESSAGE_NAME } from '../component-names';
import { MValidationMessage } from '../validation-message/validation-message';
import WithRender from './checkbox.html?style=./checkbox.scss';

export enum MCheckboxPosition {
    Left = 'left',
    Right = 'right'
}

export enum MCheckboxVerticalAlignement {
    Center = 'center',
    Top = 'top'
}
@WithRender
@Component({
    components: {
        [VALIDATION_MESSAGE_NAME]: MValidationMessage
    },
    mixins: [InputState]
})
export class MCheckbox extends ModulVue {
    @Model('change')
    @Prop()
    public value: boolean;

    @Prop({
        default: () => `mCheckbox-${uuid.generate()}`
    })
    public id: string;

    @Prop({ default: false })
    public indeterminate: boolean;

    @Prop({
        default: MCheckboxPosition.Left,
        validator: value =>
            value === MCheckboxPosition.Left ||
            value === MCheckboxPosition.Right
    })
    public position: MCheckboxPosition;

    @Prop({
        default: MCheckboxVerticalAlignement.Center,
        validator: value =>
            value === MCheckboxVerticalAlignement.Center ||
            value === MCheckboxVerticalAlignement.Top
    })
    public verticalAlign: MCheckboxVerticalAlignement;

    @Prop()
    public ariaLabel: string;

    @Prop()
    public focused: boolean;

    public readonly messageValidationId: string = uuid.generate();

    public isFocus = false;
    public internalValue: boolean = false;

    @Emit('change')
    public onChange(value: boolean): void { }

    @Emit('click')
    public onClick(event: MouseEvent): void {
        // NOTE: Edge does not change the checkbox value when indeterminate="true"
        if (this.propIndeterminate) {
            this.propValue = true;
            event.preventDefault();
        }
    }

    @Watch('value')
    public onValueChange(value: boolean): void {
        this.internalValue = value;
    }

    public get propValue(): boolean {
        return this.value !== undefined ? this.value : this.internalValue;
    }

    public set propValue(value: boolean) {
        this.onChange(value);
        this.internalValue = value;
    }

    public setFocus(value: boolean): void {
        this.isFocus = value;
    }

    public get propIndeterminate(): boolean {
        return this.indeterminate && !this.propValue;
    }

    public set propIndeterminate(newValue: boolean) {
        this.indeterminate = newValue;
    }

    public get hasCheckboxLeft(): boolean {
        return this.position === MCheckboxPosition.Left;
    }

    public get isAlignTop(): boolean {
        return this.verticalAlign === MCheckboxVerticalAlignement.Top;
    }

    public get forId(): string | undefined {
        if (this.as<InputStateMixin>().readonly) {
            return undefined;
        } else {
            return this.id;
        }
    }
}

const CheckboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(CHECKBOX_NAME, 'plugin.install');
        v.component(CHECKBOX_NAME, MCheckbox);
    }
};

export default CheckboxPlugin;
