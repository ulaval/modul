import { CompareValidator } from '../validators/compare/compare';
import { MinLengthValidator } from '../validators/min-length/min-length';
import { RequiredValidator } from '../validators/required/required';
import { ClassControlValidators, PropertyControlValidators } from './form-builder';

@ClassControlValidators([CompareValidator(['name', 'lastname'])])
export class TestFormBuilderUser {
    @PropertyControlValidators([RequiredValidator(), MinLengthValidator(3)])
    public id: number = 1;
    @PropertyControlValidators([RequiredValidator()])
    public name: string = '';
    @PropertyControlValidators([RequiredValidator()])
    public lastName: string = '';
    @PropertyControlValidators([MinLengthValidator(2)])
    public favoritesColors: string[] = ['blue'];
    public address: TestFormBuilderAddress = new TestFormBuilderAddress();
}

export class TestFormBuilderAddress {
    public street: string = '';
    @PropertyControlValidators([RequiredValidator()])
    public civicNumber: number = 1;
}
