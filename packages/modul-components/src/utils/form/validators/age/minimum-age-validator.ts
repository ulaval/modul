import BirthdayFieldFormGroup from '@ulaval/modul-website/src/component-patterns/birtday-field/birthday-field-form-group';
// tslint:disable-next-line:import-blacklist
import moment, { Moment } from 'moment';
import { ControlValidatorValidationType } from '../../control-validator-validation-type';
import { FormGroup } from '../../form-group';
import { ControlValidator } from '../control-validator';
import { ValidatorKeys } from '../validator-error-keys';

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
