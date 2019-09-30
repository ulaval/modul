
import FormPlugin from '@ulaval/modul-components/dist/components/form/form.plugin';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import ageValidator from './age-validator';
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
                ageValidator.getValidation(18)
            ])
        });
    }

    submitForm(): void {
        alert('Submit successful with good date.');
    }
}

const FormAllSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FormPlugin);
        v.component(`m-birthday-field-sandbox`, BirthdayFieldSandbox);
    }
};

export default FormAllSandboxPlugin;
