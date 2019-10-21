import { ACCORDION_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${ACCORDION_GROUP_NAME}/openAll="true"`,
    parameters: { fileName: __filename }
};

export const withInitialContent = () => ({
    template: `
    <m-accordion-group :open-all="true">
        <m-accordion>Some Accordion Content</m-accordion>
        <m-accordion>Some Accordion Content</m-accordion>
        <m-accordion>Some Accordion Content</m-accordion>
    </m-accordion-group>`
});

export const withDynamicContent = () => ({
    data(): any {
        return {
            list: [{ text: 'Some Accordion Content' }]
        };
    },
    methods: {
        addAccordion(): void {
            this.list.push({ text: 'Some Accordion Content' });
        }
    },
    template: `
        <div>
            <button @click="addAccordion">Add accordion</button>
            <m-accordion-group :open-all="true">
                <m-accordion v-for="item in list">{{ item.text }}</m-accordion>
            </m-accordion-group>
        </div>
    `
});

export const withDelayedAccordions = () => ({
    template: `
    <m-accordion-group :open-all="true">
        <m-accordion v-for="item in list" :key="item.id">{{ item.text }}</m-accordion>
    </m-accordion-group>`,
    data(): any {
        return {
            list: []
        };
    },
    created(): void {
        setTimeout(() => {
            this.list.push({ id: 1, text: 'Some Accordion Content' });
            this.list.push({ id: 2, text: 'Some Accordion Content' });
            this.list.push({ id: 3, text: 'Some Accordion Content' });
        }, 3000);
    }
});

export const withDelayedAccordionContent = () => ({
    template: `
    <m-accordion-group :open-all="true">
        <m-accordion :key="1234">
            <div v-if="showContent">Some content</div>
        </m-accordion>
    </m-accordion-group>`,
    data(): any {
        return {
            list: [],
            showContent: false
        };
    },
    created(): void {
        setTimeout(() => {
            this.showContent = true;
        }, 3000);
    }
});
