import { AbstractControl } from './abstract-control';
import { FormArray } from './form-array';
import { FormControl } from './form-control';

describe('FormArray', () => {

    describe('given a FormArray with no controls', () => {
        let formArray: FormArray;

        beforeEach(() => {
            formArray = new FormArray([]);
        });

        it('should be empty of control and valid', () => {
            expect(formArray.controls.length).toBe(0);
            expect(formArray.valid).toBe(true);
            expect(formArray.hasError()).toBe(false);
            expect(formArray.waiting).toBe(false);
            expect(formArray.enabled).toBe(true);
        });

        it('when adding a control it should add the control', () => {
            formArray.addControl(new FormControl());

            expect(formArray.controls.length).toBe(1);
            expect(formArray.controls[0]).toBeDefined();
        });

        it('when adding control at specified index it should add the control at the specified index', () => {
            const control: FormControl<any> = new FormControl();
            formArray.addControl(new FormControl());

            formArray.addControl(control, 0);

            expect(formArray.controls.length).toBe(2);
            expect(formArray.controls[0]).toBe(control);
        });
    });

    describe('given an FormGroup with a control', () => {
        let formArray: FormArray;
        const control: FormControl<any> = new FormControl();

        beforeEach(() => {
            formArray = new FormArray([control, new FormControl(), new FormControl()]);
        });

        it('when removing a control it should remove the control and return it', () => {
            const removedControl: AbstractControl = formArray.removeControl(0);

            expect(formArray.controls.length).toBe(2);
            expect(removedControl).toBe(control);
        });
    });
});
