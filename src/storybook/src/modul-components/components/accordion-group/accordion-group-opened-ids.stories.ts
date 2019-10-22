import { ACCORDION_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from './../../../utils';
export default {
    title: `${modulComponentsHierarchyRootSeparator}${ACCORDION_GROUP_NAME}/openedIds=[x,y,z]`,
    parameters: { fileName: __filename }
};

export const allOpen = () => ({
    template: `
    <m-accordion-group :openedIds="[1,2,3]">
        <m-accordion :id="1"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="2"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="3"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
allOpen.story = { name: 'openedIds="[1,2,3]' };

export const someOpen = () => ({
    template: `
    <m-accordion-group :openedIds="[1,3]">
        <m-accordion :id="1"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="2"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="3"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
someOpen.story = { name: ':openedIds="[1,3]"' };

export const allClosed = () => ({
    template: `
    <m-accordion-group :openedIds="[]">
        <m-accordion :id="1"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="2"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="3"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
allClosed.story = { name: ':openedIds=[]"' };
