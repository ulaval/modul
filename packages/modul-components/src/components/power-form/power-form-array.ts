import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { AbstractControl } from '../../utils/form/abstract-control';
import { FormArray } from '../../utils/form/form-array';
import { FormControl } from '../../utils/form/form-control';
import { FormGroup } from '../../utils/form/form-group';
import { ModulVue } from '../../utils/vue/vue';
import WithRender from './power-form-group.html?style=./power-form-group.scss';

@WithRender
@Component
export default class MPowerFormGroup extends ModulVue {

    @Prop({ required: true })
    public control: FormGroup;

    public isControlInstanceOfFormGroup(control: AbstractControl): boolean {
        return control instanceof FormGroup;
    }

    public isControlInstanceOfFormArray(control: AbstractControl): boolean {
        return control instanceof FormArray;
    }

    public isControlInstanceOfFormControl(control: AbstractControl): boolean {
        return control instanceof FormControl;
    }

}
