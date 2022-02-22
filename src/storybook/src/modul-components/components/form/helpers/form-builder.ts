import { FormGroup } from '@ulaval/modul-components/dist/utils/form/form-group';
import Vue, { Component } from 'vue';

export const FormBuilder: Component = Vue.extend({
    props: {
        formGroup: FormGroup
    },
    template: `
    <m-form class="mu-mt"
    :form-group="formGroup">
        <template v-for="control in formGroup.controls">
            <p>validationType =  {{ control.validators[0].validationType }}</p>
            <p>edition context: {{control['_editionContext']}}</p>
            <span style="width: 300px; margin-bottom: 5px; border-bottom: 1px solid black; display: flex; padding-bottom: 10px"></span>
            <slot :control="control">
                <m-textfield v-model="control.value"
                            :error="control.hasError()"
                            :error-message="control.errorMessage"
                            :label="control.name"
                            :valid="control.valid"
                            v-m-control="control">
                </m-textfield>
            </slot>
        </template>
        <p class="mu-mb-lg">
            <m-button type="submit">Submit</m-button>
            <m-button type="reset"
                        skin="secondary">Reset</m-button>
        </p>

    </m-form>
    `
});
