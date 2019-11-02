import { FormArray } from './form-array';
import { FormControl } from './form-control';
import { FormGroup } from './form-group';
import { ControlValidator } from './validators/control-validator';

export type PrimitiveTypes = 'string' | 'number' | 'boolean';
export type PrimitiveStruct = PrimitiveTypes | {
    validators: ControlValidator[];
    types: PrimitiveTypes
};
export type FormStructValue = FormStruct | FormStruct[] | PrimitiveStruct | ControlValidator[] | undefined;
export type FormStructParent = { 'parent'?: ControlValidator[] };
export type FormStructChildren = { [key: string]: FormStructValue };
export type FormStructFamily = FormStructParent & FormStructChildren;
export interface FormStruct extends FormStructFamily { }

export interface IFormStruct {
    FormStruct(): FormStruct;
}

export default class FormBuilder {
    public static Group<T>(object: T): FormGroup<T> {
        const keys: string[] = Object.keys(object);
        const values: any[] = Object.values(object);

        let FormStruct: FormStruct = {};

        if (typeof object['FormStruct'] === 'function') {
            FormStruct = object['FormStruct']();
        }

        return new FormGroup<T>(
            values.reduce((acc: T, cur, index) => {
                if (Array.isArray(cur)) {
                    acc[keys[index]] = this.Array(cur, FormStruct[keys[index]] as FormStruct);
                } else if (typeof cur === 'object') {
                    acc[keys[index]] = this.Group(cur);
                } else {
                    acc[keys[index]] = this.Control(cur, FormStruct[keys[index]] as ControlValidator[]);
                }
                return acc;
            }, {}),
            FormStruct.parent || []
        );
    }

    public static Array(array: any[], FormStruct: FormStruct = {}): FormArray {
        return new FormArray(
            array.map((e: any, index: number) => {
                if (Array.isArray(e)) {
                    return this.Array(e, FormStruct[index] as FormStruct);
                } else if (typeof e === 'object') {
                    return this.Group(e);
                } else {
                    return this.Control(e, FormStruct[index] as ControlValidator[]);
                }
            }),
            FormStruct.parent || []
        );
    }

    public static Control<T>(primitive: T, validators: ControlValidator[] = []): FormControl<T> {
        return new FormControl<typeof primitive>(validators, {
            initialValue: primitive
        });
    }
}
