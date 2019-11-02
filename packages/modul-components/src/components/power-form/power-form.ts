import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import FormBuilder from '../../utils/form/form-builder';
import { FormGroup } from '../../utils/form/form-group';
import { ModulVue } from '../../utils/vue/vue';
import { POWER_FORM_GROUP_NAME, POWER_FORM_NAME } from '../component-names';
import MPowerFormGroup from './power-form-group';
import WithRender from './power-form.html?style=./power-form.scss';

@WithRender
@Component
export class MPowerForm extends ModulVue {

    @Prop({ required: true })
    public instance: any;

    @Watch('instance', { immediate: true })
    public onInstanceChange(instance: any): void {
        if (!instance) {
            return;
        }

        this.formGroup = FormBuilder.Group(instance);
    }

    public formGroup: FormGroup | null;
}

const MPowerFormPlugin: PluginObject<any> = {
    install(v): void {
        v.prototype.$log.debug(POWER_FORM_NAME, 'plugin.install');
        v.component(POWER_FORM_GROUP_NAME, MPowerFormGroup);
        v.component(POWER_FORM_NAME, MPowerForm);
    }
};

export default MPowerFormPlugin;
