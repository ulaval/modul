
// tslint:disable-next-line:import-blacklist
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ControlValidator } from '@ulaval/modul-components/dist/utils/form/validators/control-validator';
import { ValidatorKeys } from '@ulaval/modul-components/dist/utils/form/validators/validator-error-keys';
import moment, { Moment } from 'moment';
import BirthdayFieldFormGroup from '../birthday-field-form-group';

function validationFunction(minimumAge: number): (formControl: FormGroup<any>) => boolean {
    return (formControl: FormGroup<any>): boolean => {
        const dateFormGroup: BirthdayFieldFormGroup = formControl as any;

        const day: number = dateFormGroup.dayField.value;
        const month: number = dateFormGroup.monthField.value;
        const year: number = dateFormGroup.yearField.value;

        if (!day || !month || !year) {
            return true; // Do not validate partial dates.
        }

        const nowMoment: Moment = moment();

        return nowMoment >= dateFormGroup.dateValue.add(minimumAge, 'y');
    };
}

export const MinimumAgeValidator: (minimumAge: number) => ControlValidator = (minimumAge: number): ControlValidator => {
    return {
        key: ValidatorKeys.MinAge,
        validationFunction: validationFunction(minimumAge),
        error: {
            message: `You must be ${minimumAge} or older`,
            groupMessage: `You must be ${minimumAge} or older`
        },
        validationType: ControlValidatorValidationType.Correction
    };
};
