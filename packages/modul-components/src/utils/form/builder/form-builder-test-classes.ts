import { CompareValidator } from '../validators/compare/compare';
import { MinLengthValidator } from '../validators/min-length/min-length';
import { RequiredValidator } from '../validators/required/required';
import { FormControlValidators } from './form-builder';

@FormControlValidators([CompareValidator(['name', 'lastname'])])
export class TestFormBuilderUser {
    @FormControlValidators([RequiredValidator(), MinLengthValidator(3)])
    public id: number = 1;
    @FormControlValidators([RequiredValidator()])
    public name: string = '';
    @FormControlValidators([RequiredValidator()])
    public lastName: string = '';
    @FormControlValidators([MinLengthValidator(2)])
    public favoritesColors: string[] = ['blue'];
    public address: TestFormBuilderAddress = new TestFormBuilderAddress();
}

export class TestFormBuilderAddress {
    public street: string = '';
    @FormControlValidators([RequiredValidator()])
    public civicNumber: number = 1;
}
