import { FormArray } from './form-array';
import { FormControl } from './form-control';
import { FormGroup } from './form-group';

const TEST_CONTROL_NAME: string = 'test';
const ERROR_MESSAGE: string = 'error';
interface FormStructure {
    a: number;
    b: string;
    c: any[];
}

describe('FormGroup', () => {
    let formGroup: FormGroup;

    describe('given a FormGroup with no control', () => {
        beforeEach(() => {
            formGroup = new FormGroup({});
        });

        it('should be empty of control and valid', () => {
            expect(formGroup.controls.length).toBe(0);
            expect(formGroup.valid).toBe(true);
            expect(formGroup.hasError()).toBe(false);
            expect(formGroup.waiting).toBe(false);
            expect(formGroup.enabled).toBe(true);
        });

        describe('when adding a required control', () => {
            beforeEach(() => {
                formGroup.addControl(TEST_CONTROL_NAME, new FormControl());
            });

            it('should add the controls properly', () => {
                expect(formGroup.controls.length).toBe(1);
                expect(formGroup.getControl(TEST_CONTROL_NAME)).toBeDefined();
            });
        });
    });

    describe('given an FormGroup with a control', () => {
        beforeEach(() => {
            formGroup = new FormGroup({
                [TEST_CONTROL_NAME]: new FormControl()
            });
        });

        it('should have the control and be valid', () => {
            expect(formGroup.controls.length).toBe(1);
            expect(formGroup.valid).toBe(true);
            expect(formGroup.hasError()).toBe(false);
            expect(formGroup.waiting).toBe(false);
            expect(formGroup.enabled).toBe(true);
        });

        it('when removing it should removing the control properly', () => {
            formGroup.removeControl('test');

            expect(() => formGroup.getControl(TEST_CONTROL_NAME)).toThrow(Error);
            expect(formGroup.controls.length).toBe(0);
        });
    });

    describe('given a typed form group', () => {
        let formGroup: FormGroup<FormStructure>;

        beforeEach(() => {
            formGroup = new FormGroup<FormStructure>({
                'a': new FormControl<number>([], {
                    initialValue: 1
                }),
                'b': new FormControl<string>([], {
                    initialValue: 'a'
                }),
                'c': new FormArray(
                    [
                        new FormControl<number>([], { initialValue: 1 }),
                        new FormGroup<any>({
                            'c-2': new FormControl<string>([], { initialValue: 'deep' })
                        }),
                        new FormArray(
                            [
                                new FormControl<number>([], { initialValue: 1 }),
                                new FormGroup<any>({
                                    'c-3': new FormControl<string>([], { initialValue: 'deep' })
                                })
                            ]
                        )
                    ]
                )
            });
        });

        it('should set the value when an object is passed to the setter', () => {
            formGroup.value = {
                a: 2,
                b: 'b',
                c: [
                    2,
                    {
                        'c-2': 'deep2'
                    },
                    [
                        3,
                        {
                            'c-3': 'deep3'
                        }
                    ]
                ]
            };

            expect(formGroup.value.a).toBe(2);
            expect(formGroup.value.b).toBe('b');
            expect(formGroup.value.c[0]).toBe(2);
            expect(formGroup.value.c[1]['c-2']).toBe('deep2');
            expect(formGroup.value.c[2][0]).toBe(3);
            expect(formGroup.value.c[2][1]['c-3']).toBe('deep3');
        });
    });
});
