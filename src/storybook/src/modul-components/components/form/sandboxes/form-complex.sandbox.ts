import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import FormPlugin from '@ulaval/modul-components/dist/components/form/form.plugin';
import { AbstractControl } from '@ulaval/modul-components/dist/utils/form/abstract-control';
import { ControlValidatorValidationType } from '@ulaval/modul-components/dist/utils/form/control-validator-validation-type';
import { FormArray } from '@ulaval/modul-components/dist/utils/form/form-array';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ControlValidator, ControlValidatorOptions } from '@ulaval/modul-components/dist/utils/form/validators/control-validator';
import { MaxLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/max-length/max-length';
import { MinLengthValidator } from '@ulaval/modul-components/dist/utils/form/validators/min-length/min-length';
import { RequiredValidator } from '@ulaval/modul-components/dist/utils/form/validators/required/required';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import WithRender from './form-complex.sandbox.html';

const ID_FORM_NAME: string = 'name';
const ID_FORM_DESCRIPTION: string = 'description';
const ID_FORM_BIRTHDATE: string = 'birthdate';
const ID_FORM_TYPE: string = 'type';
const ID_FORM_CHAMP_SUPPL_ACTIVE: string = 'champSupplActive';
const ID_FORM_CHAMP_SUPPL_GROUP: string = 'champSuppl';
const ID_FORM_CHAMP_SUPPL_1: string = 'champSuppl1';
const ID_FORM_CHAMP_SUPPL_2: string = 'champSuppl2';
const ID_FORM_CHAMP_SUPPL_3: string = 'champSuppl3';
const ID_FORM_ITEMS: string = 'items';
const ID_FORM_CLIENT: string = 'client';
const ID_FORM_APPLES: string = 'apples';
const ID_FORM_BANANAS: string = 'bananas';
const ID_FORM_FRUITS: string = 'fruits';

class Validations {
    static validatePickingLessThen24Bananas: (options?: ControlValidatorOptions) => ControlValidator = (options?: ControlValidatorOptions): ControlValidator => {
        return {
            validationFunction: (self: AbstractControl): boolean => {
                let valeur: number = 0;
                self.controls.forEach((control) => {
                    valeur = valeur + control.getControl(ID_FORM_FRUITS).getControl(ID_FORM_BANANAS).value;
                });
                return valeur <= 24;
            },
            error: {
                message: 'There are only 24 bananas available in the store'
            },
            validationType: ControlValidatorValidationType.OnGoing
        };
    }

    static validatePickingLessThen24FruitsInCart: (options?: ControlValidatorOptions) => ControlValidator = (options?: ControlValidatorOptions): ControlValidator => {
        return {
            validationFunction: (self: AbstractControl): boolean => {
                let valeur: number = 0;
                self.controls.forEach((obj) => {
                    valeur = valeur + obj.value;
                });
                return valeur <= 24;
            },
            error: {
                message: 'You can only put 24 fruits in this cart.'
            },
            validationType: ControlValidatorValidationType.OnGoing
        };
    }
}

@WithRender
@Component
export class MFormAllSandbox extends ModulVue {
    types: string[] = ['douce', 'blanche', 'sec'];

    pendingSubmit: boolean = false;

    loadedValues: any = {
        [ID_FORM_NAME]: 'Patate',
        [ID_FORM_DESCRIPTION]: 'La patate est\nun légume vraiment...',
        [ID_FORM_BIRTHDATE]: '1970-01-01',
        [ID_FORM_TYPE]: 'sec',
        [ID_FORM_CHAMP_SUPPL_ACTIVE]: true,
        [ID_FORM_CHAMP_SUPPL_GROUP]: {
            [ID_FORM_CHAMP_SUPPL_1]: 'suppl field 1',
            [ID_FORM_CHAMP_SUPPL_3]: 'suppl field 3'
        },
        [ID_FORM_ITEMS]: [
            { [ID_FORM_CLIENT]: 'Joe', [ID_FORM_APPLES]: 4, [ID_FORM_BANANAS]: 10 },
            { [ID_FORM_CLIENT]: 'John', [ID_FORM_APPLES]: 3, [ID_FORM_BANANAS]: 11 }
        ]
    };

    formGroup: FormGroup = this.buildFormGroup();

    get nameField(): FormControl<string> {
        return this.formGroup.getControl<FormControl<string>>(ID_FORM_NAME);
    }

    get descriptionField(): FormControl<string> {
        return this.formGroup.getControl<FormControl<string>>(ID_FORM_DESCRIPTION);
    }

    get birthdateField(): FormControl<string> {
        return this.formGroup.getControl<FormControl<string>>(ID_FORM_BIRTHDATE);
    }

    get typeField(): FormControl<string> {
        return this.formGroup.getControl<FormControl<string>>(ID_FORM_TYPE);
    }

    get champSupplActive(): FormControl<boolean> {
        return this.formGroup.getControl<FormControl<boolean>>(ID_FORM_CHAMP_SUPPL_ACTIVE);
    }

    get supplActiveValue(): boolean {
        return this.champSupplActive.value!;
    }

    set supplActiveValue(value: boolean) {
        this.champSupplActive.value = value;
    }

    get champSupplGroup(): AbstractControl {
        return this.formGroup.getControl(ID_FORM_CHAMP_SUPPL_GROUP);
    }

    get supplField1(): FormControl<number> {
        return this.champSupplGroup.getControl<FormControl<number>>(ID_FORM_CHAMP_SUPPL_1);
    }

    get supplField2(): FormControl<number> {
        return this.champSupplGroup.getControl<FormControl<number>>(ID_FORM_CHAMP_SUPPL_2);
    }

    get supplField3(): FormControl<number> {
        return this.champSupplGroup.getControl<FormControl<number>>(ID_FORM_CHAMP_SUPPL_3);
    }

    get itemsArray(): FormArray {
        return this.formGroup.getControl<FormArray>(ID_FORM_ITEMS);
    }

    submit(): void {
        this.pendingSubmit = true;
        setTimeout(() => {
            this.pendingSubmit = false;
            alert('MFormAllSandbox.submit!');
            this.$log.info();
        }, 2000);
    }

    reset(): void {
        alert('MFormAllSandbox.reset');
    }

    loadValue(): void {
        this.formGroup = this.buildFormGroup(this.loadedValues);
    }

    clearValue(): void {
        this.formGroup = this.buildFormGroup({});
    }

    toggleReadonly(): void {
        this.formGroup.readonly = !this.formGroup.readonly;

    }

    toggleDisabled(): void {
        this.formGroup.enabled = !this.formGroup.enabled;
    }

    toggleWaiting(): void {
        this.formGroup.waiting = !this.formGroup.waiting;
    }

    addItem(): void {
        this.itemsArray.addControl(this.buildItemsFormGroup());
    }

    deleteItem(index): void {
        this.itemsArray.removeControl(index);
        this.itemsArray.validate();
    }

    @Watch('supplActiveValue', { immediate: true })
    public onChampSuppl(newVal: any): void {

        if (newVal) {
            this.champSupplGroup.enabled = true;
        } else {
            this.champSupplGroup.enabled = false;
        }

    }

    private buildFormGroup(data: any = {}): FormGroup {
        const _formGroup: FormGroup = new FormGroup({
            [ID_FORM_NAME]: new FormControl<string>(
                [
                    RequiredValidator(),
                    MaxLengthValidator(20),
                    MinLengthValidator(2)
                ],
                {
                    initialValue: data[ID_FORM_NAME] ? data[ID_FORM_NAME] : ''
                }
            ),
            [ID_FORM_DESCRIPTION]: new FormControl<string>(
                [
                    RequiredValidator(),
                    MaxLengthValidator(255)
                ],
                {
                    initialValue: data[ID_FORM_DESCRIPTION] ? data[ID_FORM_DESCRIPTION] : ''
                }
            ),
            [ID_FORM_BIRTHDATE]: new FormControl<string>(
                [
                    RequiredValidator()
                ],
                {
                    initialValue: data[ID_FORM_BIRTHDATE] ? data[ID_FORM_BIRTHDATE] : ''
                }
            ),
            [ID_FORM_TYPE]: new FormControl<string>(
                [
                    RequiredValidator()
                ],
                {
                    initialValue: data[ID_FORM_TYPE] ? data[ID_FORM_TYPE] : ''
                }
            ),
            [ID_FORM_CHAMP_SUPPL_ACTIVE]: new FormControl<boolean>([],
                {
                    initialValue: data[ID_FORM_CHAMP_SUPPL_ACTIVE] ? data[ID_FORM_CHAMP_SUPPL_ACTIVE] : false
                }),
            [ID_FORM_CHAMP_SUPPL_GROUP]: this.buildChampSupplFormGroup(data[ID_FORM_CHAMP_SUPPL_GROUP] ? data[ID_FORM_CHAMP_SUPPL_GROUP] : {}),
            [ID_FORM_ITEMS]: new FormArray([],
                [Validations.validatePickingLessThen24Bananas()])
        });

        if (data[ID_FORM_ITEMS] && data[ID_FORM_ITEMS].length > 0) {
            data[ID_FORM_ITEMS].forEach(data => {
                (_formGroup.getControl(ID_FORM_ITEMS) as FormArray).addControl(this.buildItemsFormGroup(data));
            });
        }

        return _formGroup;
    }


    private buildChampSupplFormGroup(data: any = {}): FormGroup {
        return new FormGroup({
            [ID_FORM_CHAMP_SUPPL_1]: new FormControl<string>([
                RequiredValidator()],
                {
                    initialValue: data[ID_FORM_CHAMP_SUPPL_1] ? data[ID_FORM_CHAMP_SUPPL_1] : ''
                }),
            [ID_FORM_CHAMP_SUPPL_2]: new FormControl<string>([],
                {
                    initialValue: data[ID_FORM_CHAMP_SUPPL_2] ? data[ID_FORM_CHAMP_SUPPL_2] : ''
                }),
            [ID_FORM_CHAMP_SUPPL_3]: new FormControl<string>([],
                {
                    initialValue: data[ID_FORM_CHAMP_SUPPL_3] ? data[ID_FORM_CHAMP_SUPPL_3] : ''
                })
        });
    }

    private buildItemsFormGroup(data: any = {}): FormGroup {
        return new FormGroup({
            [ID_FORM_CLIENT]: new FormControl<string>(
                [
                    RequiredValidator(),
                    MaxLengthValidator(20),
                    MinLengthValidator(2)
                ],
                {
                    initialValue: data[ID_FORM_CLIENT] ? data[ID_FORM_CLIENT] : ''
                }
            ),
            [ID_FORM_FRUITS]: new FormGroup({
                [ID_FORM_APPLES]: new FormControl<number>(
                    [
                        RequiredValidator()
                    ],
                    {
                        initialValue: data[ID_FORM_APPLES] ? data[ID_FORM_APPLES] : ''
                    }
                ),
                [ID_FORM_BANANAS]: new FormControl<number>(
                    [
                        RequiredValidator()
                    ],
                    {
                        initialValue: data[ID_FORM_BANANAS] ? data[ID_FORM_BANANAS] : ''
                    }
                )
            }, [Validations.validatePickingLessThen24FruitsInCart()])
        });
    }
}

const FormAllSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FormPlugin);
        v.component(`${FORM_NAME}-complex-sandbox`, MFormAllSandbox);
    }
};

export default FormAllSandboxPlugin;
