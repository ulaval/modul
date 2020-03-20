import { SELECT_VIRTUAL_SCROLL_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MSelectVirtualScroll } from '@ulaval/modul-components/dist/components/select-virtual-scroll/select-virtual-scroll';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const OPTIONS: string[] = ['apple', 'banana', 'patate', 'tomato', 'avocados', 'etc'];

const buildLongList = (): string[] => {

    let items: string[] = [];

    for (let index = 0; index < 1000; index++) {
        items.push(`items ${index}`);
    }

    return items;
};

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SELECT_VIRTUAL_SCROLL_NAME}`,
    parameters: { fileName: __filename }
};

// export const defaultStory = () => ({
//     props: {
//         textLabel: {
//             default: text('Label', 'Fruits')
//         },
//         textPlaceholder: {
//             default: text('Placeholder', 'Choose a fruit')
//         },
//         isLabelUp: {
//             default: boolean('Label up', false)
//         },
//         isDisabled: {
//             default: boolean('Disabled', false)
//         },
//         isReadonly: {
//             default: boolean('Readonly', false)
//         },
//         isClearable: {
//             default: boolean('Clearable', false)
//         }
//     },
//     methods: actions(
//         'open',
//         'close',
//         'focus',
//         'blur',
//         'select'
//     ),
//     data: () => ({
//         options: OPTIONS
//     }),
//     template: `<m-select :options="options" :clearable="isClearable" :label="textLabel" :label-up="isLabelUp" :placeholder="textPlaceholder" :disabled="isDisabled" :readonly="isReadonly" ></m-select>`
// });

// defaultStory.story = {
//     name: 'Default'
// };

export const virtualScroll = () => ({
    components: {
        'm-select-virtual-scroll': MSelectVirtualScroll
    },
    data: () => ({
        options: buildLongList()
    }),
    template: `<m-select-virtual-scroll :options="options" label="Longlist"></m-select-virtual-scroll>`
});

// export const withOuterItemsSlot = () => ({
//     data: () => ({
//         model: 'banane',
//         options: OPTIONS
//     }),
//     components: {
//         MSelectItem: MSelectItem
//     },
//     template: `<m-select :options="options" v-model="model">
//                 <template #outer-items="{item, index, props, handlers}">
//                     <m-select-item v-if="item !== 'patate'" v-bind="props" v-on="handlers">
//                         {{ item  }}
//                     </m-select-item>
//                     <m-select-item v-else
//                                     :disabled="true">
//                         {{ item  }}
//                     </m-select-item>
//                 </template>
//             </m-select>`
// });
