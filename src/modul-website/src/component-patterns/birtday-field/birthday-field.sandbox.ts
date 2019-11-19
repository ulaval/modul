
import { MinimumAgeValidator } from '@/component-patterns/birtday-field/age/minimum-age-validator';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { Component } from 'vue-property-decorator';
import BirthdayField from './birthday-field';
import BirthdayFieldFormGroup from './birthday-field-form-group';
import WithRender from './birthday-field.sandbox.html';

@WithRender
@Component({
    components: { 'm-birthday-field': BirthdayField }
})
export class BirthdayFieldSandbox extends ModulVue {
    formGroup: FormGroup = this.buildFormGroup();

    get birthdayFieldFormGroup(): BirthdayFieldFormGroup {
        return this.formGroup.getControl('birthdayGroup') as BirthdayFieldFormGroup;
    }

    buildFormGroup(): FormGroup {
        return new FormGroup({
            'birthdayGroup': new BirthdayFieldFormGroup([
                MinimumAgeValidator(18)
            ]) as unknown as FormGroup
        });
    }

    submitForm(): void {
        alert('Submit successful with good date.');
    }
}
