import { POPPER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${POPPER_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    methods: {
        onClose(): void {
            this.$log.log('$emit(\'close\') popper');
        }
    },
    template: `<m-popper @close="onClose">
        <m-button slot="trigger">Open popper</m-button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
    </m-popper>`
});


defaultStory.story = {
    name: 'default'
};


export const clickOutsideDisabled = () => '<m-popper :close-on-click-outside="false"><m-button slot="trigger">Open popper</m-button><p>Cannot close popper by clicking outside</p></m-popper>';

export const onTabChangeRestoreTransition = () => ({
    data: () => ({
        open: false
    }),
    methods: {
        onClose(): void {
            this.open = false;
        }
    },
    computed: {
        isOpen: {
            get(): boolean {
                return this.open;
            },
            set(value: boolean): void {
                this.open = value;
            }
        }
    },
    template: `<m-popper :open.sync="isOpen">
                    <m-button slot="trigger">Open popper</m-button>
                    <a href="http://google.com" @click="onClose" target="_blank">Open in new tab</a>
                </m-popper>`
});
