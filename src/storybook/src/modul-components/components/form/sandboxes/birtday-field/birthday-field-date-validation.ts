import { ControlValidatorValidationType } from '../../../utils/form/control-validator-validation-type';
import { ControlValidator } from '../../../utils/form/validators/control-validator';
import BirthdayFieldFormGroup from './birthday-field-form-group';

function validationFunction(formControl: BirthdayFieldFormGroup): boolean {
    const day: number = formControl.dayField.value;
    const month: number = formControl.monthField.value;
    const year: number = formControl.yearField.value;

    if (!day || !month || !year) {
        return true; // Do not validate partial dates.
    }

    // Must parse to number since m-input can give string instead of number.
    const dayParsed: number = Number.parseInt(day.toString(), 10);
    const yearParsed: number = Number.parseInt(year.toString(), 10);

    const generatedDate: Date = new Date(yearParsed, month - 1, dayParsed);
    generatedDate.setFullYear(yearParsed); // To support date from biblical times (1 to 100).

    if (generatedDate.getDate() !== dayParsed) { return false; }
    if (generatedDate.getMonth() !== month - 1) { return false; }
    if (generatedDate.getFullYear() !== yearParsed) { return false; }

    return true;
}

function getValidation(): ControlValidator {
    return {
        validationFunction: validationFunction,
        error: {
            message: 'Invalid date of birth.',
            groupMessage: 'Invalid date of birth.'
        },
        validationType: ControlValidatorValidationType.Correction
    };
}

export default {
    getValidation
};
