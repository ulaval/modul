import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
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

export const defaultStory = () => ({
    components: {
        'm-select-virtual-scroll': MSelectVirtualScroll
    },
    props: {
        textLabel: {
            default: text('Label', 'Fruits')
        },
        textPlaceholder: {
            default: text('Placeholder', 'Choose a fruit')
        },
        isLabelUp: {
            default: boolean('Label up', false)
        },
        isDisabled: {
            default: boolean('Disabled', false)
        },
        isReadonly: {
            default: boolean('Readonly', false)
        },
        isClearable: {
            default: boolean('Clearable', false)
        }
    },
    methods: actions(
        'open',
        'close',
        'focus',
        'blur',
        'select'
    ),
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select-virtual-scroll @open="open" @close="close" @focus="focus" @select-item="select" @blur="blur" :options="options" :clearable="isClearable" :label="textLabel" :label-up="isLabelUp" :placeholder="textPlaceholder" :disabled="isDisabled" :readonly="isReadonly" ></m-select-virtual-scroll>`
});

defaultStory.story = {
    name: 'Default'
};

export const virtualScroll = () => ({
    components: {
        'm-select-virtual-scroll': MSelectVirtualScroll
    },
    data: () => ({
        options: buildLongList()
    }),
    template: `<m-select-virtual-scroll id="id" :options="options" label="Longlist"></m-select-virtual-scroll>`
});

