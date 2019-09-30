import { AbstractControl } from '@ulaval/modul-components/dist/utils/form/abstract-control';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ControlValidator, ControlValidatorOptions } from '@ulaval/modul-components/dist/utils/form/validators/control-validator';
import { MaxValidator } from '@ulaval/modul-components/dist/utils/form/validators/max/max';
import { MinValidator } from '@ulaval/modul-components/dist/utils/form/validators/min/min';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import moment, { Moment } from 'moment';
import birthdayFieldDateValidation from './birthday-field-date-validation';

function getErrorMessageOption(message: string): ControlValidatorOptions {
    return {
        error: {
            message: message,
            groupMessage: message
        }
    };
}


export default class BirthdayFieldFormGroup extends FormGroup {
    public hasSubmittedForm: boolean;

    constructor(validators: ControlValidator[] = []) {
        super({
            yearField: new FormControl<number>([
                RequiredValidator(getErrorMessageOption('Incomplete date of birth.')),
                MinValidator(1860, getErrorMessageOption('Invalid date of birth.')),
                MaxValidator(9999, getErrorMessageOption('Invalid date of birth.'))
            ]),
            monthField: new FormControl<number>([
                RequiredValidator(getErrorMessageOption('Incomplete date of birth.')),
                MaxValidator(12, getErrorMessageOption('Invalid date of birth.'))
            ]),
            dayField: new FormControl<number>([
                RequiredValidator(getErrorMessageOption('Incomplete date of birth.')),
                MinValidator(1, getErrorMessageOption('Invalid date of birth.')),
                MaxValidator(31, getErrorMessageOption('Invalid date of birth.'))
            ])
        }, [birthdayFieldDateValidation.getValidation(), ...validators]);

        this.hasSubmittedForm = false;
    }

    public get yearField(): AbstractControl<number> {
        return this.getControl('yearField');
    }

    public get monthField(): AbstractControl<number> {
        return this.getControl('monthField');
    }

    public get dayField(): AbstractControl<number> {
        return this.getControl('dayField');
    }

    public get dateValue(): Moment {
        // Month 0 = January, 1 = Febuary for some great reason and days/years are 1 based index. Thx javascript :).
        const date: Date = new Date(this.yearField.value, this.monthField.value - 1, this.dayField.value);
        return moment(date);
    }

    public get dateValueFormatted(): string {
        return this.dateValue.format('YYYY-MM-DD');
    }

    public async submit(): Promise<void> {
        await super.submit();
        this.hasSubmittedForm = true;
    }
}
