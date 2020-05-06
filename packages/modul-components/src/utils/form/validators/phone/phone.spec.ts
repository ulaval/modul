import { FormControl } from '../../form-control';
import { ControlValidator } from '../control-validator';
import { PhoneValidator } from './phone';

describe('PhoneValidator', () => {

    let validator: ControlValidator;
    let formControl: FormControl<string>;

    beforeEach(() => {
        formControl = new FormControl<string>();

        validator = PhoneValidator();
    });


    it('should return true when undefined', () => {
        formControl.value = undefined;
        expect(validator.validationFunction(formControl)).toBe(true);
    });

    it('should return false when unfinished ', () => {
        formControl.value = '+1';
        expect(validator.validationFunction(formControl)).toBe(false);
    });

    it('should return false when invalid ', () => {
        formControl.value = '+2223523345';
        expect(validator.validationFunction(formControl)).toBe(false);
    });

    it('should return false when too long ', () => {
        formControl.value = '+2265621313221341234345634564356645';
        expect(validator.validationFunction(formControl)).toBe(false);
    });


    it('should return true when valid ', () => {
        formControl.value = '+14186562131';
        expect(validator.validationFunction(formControl)).toBe(true);
    });

});
