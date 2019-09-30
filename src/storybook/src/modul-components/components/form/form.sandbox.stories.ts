import { FORM_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { sandboxDecorator } from '../../../sandbox-decorator';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${FORM_NAME}/sandboxes`,
    decorators: [sandboxDecorator],
    parameters: { fileName: __filename, options: { showPanel: false, isToolshown: true } }
};

export const complex: any = () => `<${FORM_NAME}-complex-sandbox></${FORM_NAME}-complex-sandbox>`;

export const externalValidation: any = () => `<${FORM_NAME}-external-validation-sandbox></${FORM_NAME}-external-validation-sandbox>`;

export const reactivity: any = () => `<${FORM_NAME}-reactivity-sandbox></${FORM_NAME}-reactivity-sandbox>`;

export const birthday: any = () => `<m-birthday-field-sandbox></m-birthday-field-sandbox>`;
