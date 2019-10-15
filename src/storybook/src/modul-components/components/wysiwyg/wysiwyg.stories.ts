import { storiesOf } from '@storybook/vue';
import { WYSIWYG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { FormControl } from '@ulaval/modul-components/dist/utils/form/form-control';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { FormGroup } from './../../../../../../packages/modul-components/src/utils/form/form-group';
import { RequiredValidator } from './../../../../../../packages/modul-components/src/utils/form/validators/required/required';

storiesOf(`${modulComponentsHierarchyRootSeparator}${WYSIWYG_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            formGroup: new FormGroup({
                value: new FormControl<string>([RequiredValidator()], { initialValue: 'initial value' })
            })
        }),
        computed: {
            valueControl(): FormControl<string> {
                return this.formGroup.getControl('value') as FormControl<string>;
            }
        },
        template: `
        <div>
            <m-wysiwyg v-model="valueControl.value" v-m-control="valueControl" :error-message="valueControl.errorMessage"></m-wysiwyg>
            <p>raw: {{valueControl.value}}</p>
            <div class="m-u--margin-top">vhtml: <div v-html="valueControl.value"></div></div>
        </div>
        `
    }));
