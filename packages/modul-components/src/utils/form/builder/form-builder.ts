import { FormArray } from '../form-array';
import { FormControl } from '../form-control';
import { FormGroup } from '../form-group';
import { ControlValidator } from '../validators/control-validator';

export function ClassFormControlValidators(controlValidatators: ControlValidator[] = []): any {
    return function(constructor: Function): any {
        Object.defineProperty(
            constructor.prototype,
            `form-control-validators`,
            {
                get: () => controlValidatators
            }
        );
    };
}

export function PropertyFormControlValidators(controlValidatators: ControlValidator[] = []): any {
    return function(target: any, key: string): any {
        Object.defineProperty(
            target,
            `${key}-form-control-validators`,
            {
                get: () => controlValidatators
            }
        );
    };
}

export function PropertyFormControlSkip(target: any, key: string): any {
    Object.defineProperty(
        target,
        `${key}-form-control-skip`,
        {
            get: () => true
        }
    );
}

export default class FormBuilder {
    public static Group<T>(object: T): FormGroup<T> {
        const keys: string[] = Object.keys(object);
        const values: any[] = Object.values(object);

        return new FormGroup<T>(
            values.reduce((acc: T, cur, index) => {
                if (object[`${keys[index]}-form-control-skip`]) {
                    return acc;
                }

                if (Array.isArray(cur)) {
                    acc[keys[index]] = this.Array(cur, object[`${keys[index]}-form-control-validators`] || []);
                } else if (typeof cur === 'object') {
                    acc[keys[index]] = this.Group(cur);
                } else {
                    acc[keys[index]] = this.Control(cur, object[`${keys[index]}-form-control-validators`] || []);
                }
                return acc;
            }, {}),
            object['form-control-validators'] || []
        );
    }

    public static Array(array: any[], controlValidators: ControlValidator[] = []): FormArray {
        return new FormArray(
            array.map(e => {
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
