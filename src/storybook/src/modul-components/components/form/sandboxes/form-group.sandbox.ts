import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import FormPlugin from '@ulaval/modul-components/dist/components/form/form.plugin';
import FormBuilder from '@ulaval/modul-components/dist/utils/form/form-builder';
import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './form-group.sandbox.html';


}

@WithRender
@Component
export class FormGroupSandbox extends ModulVue {
    public formGroup: FormGroup<ComplexStructure> =
        FormBuilder.Group(
            new ComplexStructure(123, '123', '1', new ComplexStructureB(123, true, ['test', 'test2']))
        );

    protected mounted(): void {
        console.log(this.formGroup.value);
    }

    public submit(): void {

    }

    public reset(): void {

    }
}

const FormGroupSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(FormPlugin);
        v.component(`${FORM_NAME}-complex-sandbox`, FormGroupSandbox);
    }
};

export default FormGroupSandboxPlugin;
