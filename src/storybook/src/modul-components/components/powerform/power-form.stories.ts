import { storiesOf } from '@storybook/vue';
import { POWER_FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import FormBuilder from '@ulaval/modul-components/dist/utils/form/builder/form-builder';
import { A, TestFormBuilderUser } from '@ulaval/modul-components/dist/utils/form/builder/form-builder-test-classes';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${POWER_FORM_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            formGroup: FormBuilder.Group(new TestFormBuilderUser())
        }),
        mounted(): void {
            const a = new A();

            console.log(a);
        },
        template: `
            <div>
            </div>
        `
    }));
