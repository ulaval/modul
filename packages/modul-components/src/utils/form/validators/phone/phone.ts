import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { FormatMode } from '../../../i18n/i18n';
import { ModulVue } from '../../../vue/vue';
import { ControlValidatorValidationType } from '../../control-validator-validation-type';
import { FormControl } from '../../form-control';
import { FormGroup } from '../../form-group';
import { ControlValidator, ControlValidatorOptions } from '../control-validator';
import { ValidatorKeys } from '../validator-error-keys';

/**
 *
 * @param options options required to personnalise the validator, like the timing of the validation or the error messages to display.
 */
export const PhoneValidator: (options?: ControlValidatorOptions) => ControlValidator = (options?: ControlValidatorOptions): ControlValidator => {
    return {
        key: ValidatorKeys.Phone,
        validationFunction: (control: FormControl<any>): boolean => {
            if (control instanceof FormGroup) {
                throw Error('the PhoneValidator should not be attached to a form group');
            }

            if (!control.value) {
                return true;
            } else {
                return parsePhoneNumberFromString(control.value) ? parsePhoneNumberFromString(control.value)!.isValid() : false;
            }

        },
        error: options && options.error ?
            options.error : {
                message: (ModulVue.prototype.$i18n).translate(
                    'm-form:phoneValidatorErrorMessage',
                    undefined,
                    undefined, undefined, undefined, FormatMode.Sprintf
                ),
                groupMessage: options && options.controlLabel ?
                    (ModulVue.prototype.$i18n).translate(
                        'm-form:phoneValidatorErrorSummaryMessage',
                        { controlLabel: options.controlLabel },
                        undefined,
                        undefined,
                        undefined,
                        FormatMode.Sprintf)
                    : undefined
            },
        validationType: options && options.validationType ?
            options.validationType : ControlValidatorValidationType.Correction
    };
};
