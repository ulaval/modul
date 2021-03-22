import { text } from '@storybook/addon-knobs';
import { ACCORDION_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${ACCORDION_GROUP_NAME}`,
    parameters: { fileName: __filename }
};

export const withContent = () => ({
    props: {
        text: {
            default: text('Text', 'An Accordion Group')
        }
    },
    template: `
    <m-accordion-group>
        <m-accordion>Some Accordion Content</m-accordion>
        <m-accordion>Some Accordion Content</m-accordion>
        <m-accordion>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const noContent = () => ({
    props: {
        text: {
            default: text('Text', 'An Accordion Group')
        }
    },
    template: `
    <div>
        Accordions with no content don't count toward computing open all / close all button.
        Open all will hide when every accordion with content is expended.
        Same logic for close all.
        <m-accordion-group>
            <m-accordion></m-accordion>
            <m-accordion></m-accordion>
            <m-accordion></m-accordion>
        </m-accordion-group>
    </div>`
});

export const mixedContentWithNoContent = () => ({
    props: {
        text: {
            default: text('Text', 'An Accordion Group')
        }
    },
    template: `
    <div>
        Accordions with no content don't count toward computing open all / close all button.
        Open all will hide when every accordion with content is expended.
        Same logic for close all.
        <m-accordion-group>
            <m-accordion></m-accordion>
            <m-accordion>Some Accordion Content</m-accordion>
            <m-accordion>Some Accordion Content</m-accordion>
            <m-accordion>Some Accordion Content</m-accordion>
            <m-accordion></m-accordion>
            <m-accordion></m-accordion>
            <m-accordion></m-accordion>
            <m-accordion>Some Accordion Content</m-accordion>
            <m-accordion></m-accordion>
            <m-accordion>Some Accordion Content</m-accordion>
        </m-accordion-group>
    </div>`
});

export const header = () => ({
    template: `
    <m-accordion-group>
        <m-accordion><h3 slot="header">Value specified in header slot for this example and all others to follow</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">Value specified in header slot for this example and all others to follow</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">Value specified in header slot for this example and all others to follow</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const title = () => ({
    template: `
    <m-accordion-group><h2 slot="title">An Accordion Group Title</h2>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const secondaryContent = () => ({
    template: `
    <m-accordion-group>
        <h2 slot="title">An Accordion Group Title</h2>
        <h3 slot="secondary-content">An Accordion Group Title</h3>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const toggleLinkLeft = () => ({
    template: `
    <div>
        <m-accordion-group :toggle-link-left="true">
            <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        </m-accordion-group>
        <m-accordion-group :toggle-link-left="true">
            <h2 slot="title">An Accordion Group Title</h2>
            <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        </m-accordion-group>
        <m-accordion-group>
            <h2 slot="title">An Accordion Group Title</h2>
            <h3 slot="secondary-content">An Accordion Group secondary-content</h3>
            <m-accordion><h3 slot="header">An Accordion Header</h3>Some Accordion Content</m-accordion>
        </m-accordion-group>
    </div>`
});

export const concurrent = () => ({
    template: `
    <m-accordion-group :concurrent="true">
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
        <m-accordion><h3 slot="header">An Accordion Title</h3>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const concurrentWithNoDirectParentRelation = () => ({
    template: `
    <m-accordion-group :concurrent="true">
        <template v-slot:default="{ groupRef }">
            <m-panel>
                <m-accordion :group-ref="groupRef">Some Accordion Content</m-accordion>
                <m-accordion :group-ref="groupRef">Some Accordion Content</m-accordion>
                <m-accordion :group-ref="groupRef">Some Accordion Content</m-accordion>
            </m-panel>
        </template>
    </m-accordion-group>`
});
