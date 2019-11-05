import { CompareValidator } from '../validators/compare/compare';
import { MinLengthValidator } from '../validators/min-length/min-length';
import { RequiredValidator } from '../validators/required/required';
import { ClassFormControlValidators, PropertyControlSkip, PropertyFormControlValidators } from './form-builder';

@ClassFormControlValidators([CompareValidator(['name', 'lastname'])])
export class TestFormBuilderUser {
    @PropertyControlSkip
    public id: number = 1;
    @PropertyFormControlValidators([RequiredValidator()])
    public name: string = '';
    @PropertyFormControlValidators([RequiredValidator()])
    public lastName: string = '';
    @PropertyFormControlValidators([MinLengthValidator(2)])
    public favoritesColors: string[] = ['blue'];
    public address: TestFormBuilderAddress = new TestFormBuilderAddress();
}

export class TestFormBuilderAddress {
    @PropertyControlSkip
    public id: number = 1;
    @PropertyFormControlValidators([RequiredValidator(), MinLengthValidator(3)])
    public street: string = '';
    @PropertyFormControlValidators([RequiredValidator()])
    public civicNumber: number = 1;
}
