import { FormArray } from '../form-array';
import { FormControl } from '../form-control';
import { FormGroup } from '../form-group';
import { ControlValidator } from '../validators/control-validator';

export function ClassControlValidators(controlValidatators: ControlValidator[] = []): any {
    return function(constructor: Function): any {
        Object.defineProperty(
            constructor.prototype,
            `FormControlValidators`,
            {
                get: () => controlValidatators
            }
        );
    };
}

export function PropertyControlValidators(controlValidatators: ControlValidator[] = []): any {
    return function(target: any, key: string): any {
        Object.defineProperty(
            target,
            `${key}FormControlValidators`,
            {
                get: () => controlValidatators
            }
        );
    };
}

export default class FormBuilder {
    public static Group<T>(object: T): FormGroup<T> {
        const keys: string[] = Object.keys(object);
        const values: any[] = Object.values(object);

        return new FormGroup<T>(
            values.reduce((acc: T, cur, index) => {
                if (Array.isArray(cur)) {
                    acc[keys[index]] = this.Array(cur, object[`${keys[index]}FormControlValidators`] || []);
                } else if (typeof cur === 'object') {
                    acc[keys[index]] = this.Group(cur);
                } else {
                    acc[keys[index]] = this.Control(cur, object[`${keys[index]}FormControlValidators`] || []);
                }
                return acc;
            }, {}),
            object['FormControlValidators'] || []
        );
    }

    public static Array(array: any[], controlValidators: ControlValidator[] = []): FormArray {
        return new FormArray(
            array.map((e: any, index: number) => {
                if (Array.isArray(e)) {
                    return this.Array(e);
                } else if (typeof e === 'object') {
                    return this.Group(e);
                } else {
                    return this.Control(e);
                }
            }),
            controlValidators
        );
    }

    public static Control<T>(primitive: T, controlValidators: ControlValidator[] = []): FormControl<T> {
        return new FormControl<typeof primitive>(controlValidators, {
            initialValue: primitive
        });
    }
}
