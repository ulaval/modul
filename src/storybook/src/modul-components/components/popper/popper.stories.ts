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
    template: `<div><m-popper @close="onClose">
        <m-button slot="trigger">Open popper</m-button>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore neque aut enim adipisci laudantium atque, perferendis quisquam possimus suscipit, nulla debitis temporibus. Sit nulla corrupti facere amet, reiciendis minus natus.</p>
    </m-popper>
    <m-popup> <m-button slot="trigger">Open popper</m-button>dddd</m-popup>
    </div>`
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
    template: `<div>
                    <m-popper :open.sync="isOpen">
                        <m-button slot="trigger">Open popper</m-button>
                        <p>
                            A link opening in a new tab should not interrupt current transition
                        </p>
                        <p>
                            <a href="http://google.com" @click="onClose" target="_blank">Open in new tab</a>
                        </p>
                    </m-popper>
                    <p>
                        <a href="http://twitter.com" target="_blank">Go to twitter</a>
                    </p>
                </div>`
});
