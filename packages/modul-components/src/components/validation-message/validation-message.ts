import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Mixins, Prop } from 'vue-property-decorator';
import { InputState } from '../../mixins/input-state/input-state';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { VALIDATION_MESSAGE_NAME } from '../component-names';
import MSvgPlugin, { MSvg } from '../svg/svg';
import AccordionTransitionPlugin, { MAccordionTransition } from '../transitions/accordion-transition/accordion-transition';
import WithRender from './validation-message.html?style=./validation-message.scss';
@WithRender
@Component({
    components: {
        MSvg,
        MAccordionTransition
    }
})
export class MValidationMessage extends Mixins(InputState) {
    @Prop({ default: true })
    public transition: boolean;

    public svgTitle: string = '';
    public iconName: string = '';
    public classMessage: string = '';

    @Emit('click')
    public onClick(event: Event): void { }

    public get message(): string | undefined {
        if (this.hasErrorMessage && this.hasError) {
            this.classMessage = 'error';
            this.svgTitle = this.$i18n.translate('m-validation-message:title-error-icon');
            this.iconName = ModulIconName.Error;
            return this.errorMessage;
        }

        if (this.hasValidMessage && this.isValid) {
            this.classMessage = 'valid';
            this.svgTitle = this.$i18n.translate('m-validation-message:title-valid-icon');
            this.iconName = ModulIconName.Confirmation;
            return this.validMessage;
        }
    }

    protected created(): void {
        this.$svgSprite.addSvg(ModulIconName.Error, require('./../../assets/icons/svg/error.svg'));
        this.$svgSprite.addSvg(ModulIconName.Confirmation, require('./../../assets/icons/svg/confirmation.svg'));
    }
}

const ValidationMessagePlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MSvgPlugin);
        v.use(AccordionTransitionPlugin);
        v.component(VALIDATION_MESSAGE_NAME, MValidationMessage);
    }
};

export default ValidationMessagePlugin;
