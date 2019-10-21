import { ACCORDION_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from './../../../utils';
export default {
    title: `${modulComponentsHierarchyRootSeparator}${ACCORDION_GROUP_NAME}/enabled`,
    parameters: { fileName: __filename }
};

export const allChildrenDisabled = () => ({
    template: `
    <m-accordion-group :disabled="false">
        <m-accordion :disabled="false"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="false"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="false"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const allChildrenEnabled = () => ({
    template: `
    <m-accordion-group :disabled="false">
        <m-accordion :disabled="true"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="true"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="true"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const allChildrenMixed = () => ({
    template: `
    <m-accordion-group :disabled="false">
        <m-accordion :disabled="true"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="false"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :disabled="true"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
