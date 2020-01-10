import { FormArray } from './form-array';
import { FormControl } from './form-control';
import { FormGroup } from './form-group';

describe('FormArray', () => {

    describe('given a FormArray with no controls', () => {
        let formArray: FormArray;

        beforeAll(() => {
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
    });


    describe('given an FormGroup with a control', () => {
        let formArray: FormArray;

        beforeAll(() => {
            formArray = new FormArray([new FormControl(), new FormControl(), new FormControl()]);
        });

        it('when removing a control it should remove the control', () => {
            formArray.removeControl(0);
            expect(formArray.controls.length).toBe(2);
        });
    });

    describe('given a formArray with controls', () => {
        let formArray: FormArray;

        beforeEach(() => {
            formArray = new FormArray([
                new FormControl<string>(),
                new FormArray([new FormControl<string>()]),
                new FormGroup({
                    'a': new FormControl<string>()
                })
            ]);
        });

        it('should set the values of controls with an array of values', () => {
            formArray.value = [
                'a',
                ['a'],
                {
                    'a': 'a'
                }
            ];

            expect(formArray.value[0]).toBe('a');
            expect(formArray.value[1][0]).toBe('a');
            expect(formArray.value[2]['a']).toBe('a');
        });
    });
});
