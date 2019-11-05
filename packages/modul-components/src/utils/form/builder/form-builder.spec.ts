import { FormArray } from '../form-array';
import { FormControl } from '../form-control';
import { FormGroup } from '../form-group';
import FormBuilder from './form-builder';
import { TestFormBuilderUser } from './form-builder-test-classes';

describe('form-builder', () => {
    it('should create a form group with an object', () => {
        const formGroup: FormGroup = FormBuilder.Group({ id: 1, name: 'John' });

        expect(formGroup.getControl('id')).toBeDefined();
        expect(formGroup.getControl('name')).toBeDefined();
    });

    it('should create a form group with an object with initial values', () => {
        const formGroup: FormGroup = FormBuilder.Group({ id: 1, name: 'John' });

        expect(formGroup.getControl('id').value).toBe(1);
        expect(formGroup.getControl('name').value).toBe('John');
    });

    it('should create a form group with a class instance', () => {
        const formGroup: FormGroup = FormBuilder.Group(new TestFormBuilderUser());

        expect(formGroup.getControl('id') instanceof FormControl).toBe(true);
        expect(formGroup.getControl('name') instanceof FormControl).toBe(true);
        expect(formGroup.getControl('lastName') instanceof FormControl).toBe(true);
        expect(formGroup.getControl('favoritesColors') instanceof FormArray).toBe(true);
        expect(formGroup.getControl('address') instanceof FormGroup).toBe(true);
    });

    it('should create a form group with a decorated class instance', () => {
        const formGroup: FormGroup = FormBuilder.Group(new TestFormBuilderUser());

        expect(formGroup.validators.length).toBe(1);
        expect(formGroup.getControl('id').validators.length).toBe(2);
        expect(formGroup.getControl('name').validators.length).toBe(1);
        expect(formGroup.getControl('lastName').validators.length).toBe(1);
        expect(formGroup.getControl('favoritesColors').validators.length).toBe(1);
        expect(formGroup.getControl('address').validators.length).toBe(0);
        expect(formGroup.getControl('address').getControl('street').validators.length).toBe(0);
        expect(formGroup.getControl('address').getControl('civicNumber').validators.length).toBe(1);
    });
});
