import { ACCORDION_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from './../../../utils';
export default {
    title: `${modulComponentsHierarchyRootSeparator}${ACCORDION_GROUP_NAME}/secondary-content`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    template: `
    <m-accordion-group :openedIds="[1,2,3]">
        <m-accordion :id="1"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="2"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion :id="3"><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
defaultStory.story = { name: 'default' };

export const toggleLinkLeft = () => ({
    template: `
    <m-accordion-group>
        <h2 slot="title">An Accordion Group Title</h2>
        <h3 slot="secondary-content">An Accordion Group Title</h3>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
toggleLinkLeft.story = { name: 'toggle-link-left' };

export const link = () => ({
    template: `
    <m-accordion-group :toggle-link-left="true">
        <h2 slot="title">An Accordion Group Title</h2>
        <m-link icon-name="m-svg__add-circle-filled" icon-size="22px" mode="button" slot="secondary-content">Add content</m-link>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
link.story = { name: 'm-link' };

export const noTitle = () => ({
    template: `<m-accordion-group>
                    <h3 slot="secondary-content">An Accordion Group Title</h3>
                    <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
                    <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
                    <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
</m-accordion-group>`
});
noTitle.story = { name: 'no-title' };

export const noToggleLinkLeft = () => ({
    template: `
    <m-accordion-group :toggle-link-left="true">
        <h3 slot="secondary-content">An Accordion Group Title</h3>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});
noToggleLinkLeft.story = { name: 'no-title-toggle-link-left' };


