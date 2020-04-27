import { FormControl } from './form-control';
import { FormGroup } from './form-group';

const TEST_CONTROL_NAME: string = 'test';

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

            it('containsControl should return true', () => {
                expect(formGroup.containsControl(TEST_CONTROL_NAME)).toBe(true);
            });
        });
    });

    describe('given an FormGroup with a control', () => {
        beforeEach(() => {
            formGroup = new FormGroup({
                [TEST_CONTROL_NAME]: new FormControl<string>([], { initialValue: 'Test value before' })
            });
        });

        it('should have the control and be valid', () => {
            expect(formGroup.controls.length).toBe(1);
            expect(formGroup.valid).toBe(true);
            expect(formGroup.hasError()).toBe(false);
            expect(formGroup.waiting).toBe(false);
            expect(formGroup.enabled).toBe(true);
        });

        it('when use setControl it should replace the control properly', () => {
            expect(formGroup.getControl(TEST_CONTROL_NAME).value).toBe('Test value before');

            formGroup.setControl(TEST_CONTROL_NAME, new FormControl<string>([], { initialValue: 'Test value after' }));

            expect(formGroup.getControl(TEST_CONTROL_NAME).value).toBe('Test value after');
        });

        it('when use setControl it should add the control properly', () => {
            const NEW_CONTROL_NAME: string = 'new-controle-name';

            formGroup.setControl(NEW_CONTROL_NAME, new FormControl<string>([], { initialValue: 'value' }));

            expect(formGroup.getControl(NEW_CONTROL_NAME).value).toBe('value');
        });

        it('when removing it should removing the control properly', () => {
            formGroup.removeControl(TEST_CONTROL_NAME);

            expect(() => formGroup.getControl(TEST_CONTROL_NAME)).toThrow(Error);
            expect(formGroup.controls.length).toBe(0);
        });

        it('when removing containsControl should return false', () => {
            formGroup.removeControl(TEST_CONTROL_NAME);

            expect(formGroup.containsControl(TEST_CONTROL_NAME)).toBe(false);
        });
    });
});
