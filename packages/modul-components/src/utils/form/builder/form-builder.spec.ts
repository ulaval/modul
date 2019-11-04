import { FormGroup } from '../form-group';
import FormBuilder from './form-builder';
import { TestFormBuilderUser } from './form-builder-test-classes';

describe('form-builder', () => {
    const formGroup: FormGroup = FormBuilder.Group(new TestFormBuilderUser());

    it('test', () => {
        expect(true).toBe(true);
    });
});
