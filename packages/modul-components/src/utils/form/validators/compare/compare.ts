import { FormatMode } from '../../../i18n/i18n';
import { ModulVue } from '../../../vue/vue';
import { ControlValidatorValidationType } from '../../control-validator-validation-type';
import { FormControl } from '../../form-control';
import { FormGroup } from '../../form-group';
import { ControlValidator, ControlValidatorOptions } from '../control-validator';
import { ValidatorKeys } from '../validator-error-keys';

/**
 *
 * @param controlNames
 * @param controlLabels
 * @param options options required to personnalise the validator, like the timing of the validation or the error messages to display.
 */
export const CompareValidator: (controlNames: string[], controlLabels?: string[], options?: ControlValidatorOptions) => ControlValidator = (controlNames: string[], controlLabels?: string[], options?: ControlValidatorOptions): ControlValidator => {
    return {
        key: ValidatorKeys.Compare,
        validationFunction: (control: FormGroup): boolean => {
            if (control instanceof FormControl) {
                throw Error('the compare controls validator should not be attached to a form control');
            }

            return controlNames
                .map(cn => (control.getControl(cn) as FormControl<any>))
                .every(fc => {
                    let source: any = (fc.value !== undefined ? fc.value : '');
                    let target: any = (control.controls[0].value !== undefined ? control.controls[0].value : '');

                    return source === target;
                });
        },
        error: options && options.error ?
            options.error : {
                message: options && controlLabels ?
                    (ModulVue.prototype.$i18n).translate(
                        'm-form:compareValidatorErrorMessage',
                        { controlNames: controlLabels.join(', ') },
                        undefined,
                        undefined,
                        undefined,
                        FormatMode.Sprintf) :
                    (ModulVue.prototype.$i18n).translate(
                        'm-form:compareValidatorErrorMessageNoName',
                        undefined,
                        undefined,
                        undefined,
                        undefined,
                        FormatMode.Sprintf),
                groupMessage: options && controlLabels ?
                    (ModulVue.prototype.$i18n).translate(
                        'm-form:compareValidatorErrorMessage',
                        { controlNames: controlLabels.join(', ') },
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
