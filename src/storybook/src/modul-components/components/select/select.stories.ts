import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { SELECT_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MSelectItem } from '@ulaval/modul-components/dist/components/select/select-item/select-item';
import { InputMaxWidth } from '@ulaval/modul-components/dist/mixins/input-width/input-width';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const OPTIONS: string[] = ['apple', 'banana', 'patate', 'tomato', 'avocados', 'etc'];
const LONG_OPTIONS: string[] = ['apple juice', 'banana', 'patate', 'tomato', 'avocados', 'A fruit with a very long word for testing'];


const buildLongList = (): string[] => {

    let items: string[] = [];

    for (let index = 0; index < 1000; index++) {
        items.push(`items ${index}`);
    }

    return items;
};

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SELECT_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
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
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :clearable="isClearable" :label="textLabel" :label-up="isLabelUp" :placeholder="textPlaceholder" :disabled="isDisabled" :readonly="isReadonly"  @open="open" @close="close" @focus="focus" @select-item="select" @blur="blur"></m-select>`
});

defaultStory.story = {
    name: 'Default'
};

export const focus = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :focus="true" ></m-select>`
});

export const selectedItem = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" v-model="model" ></m-select>`
});

export const label = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" ></m-select>`
});

export const placeholder = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" placeholder="Choose a Fruit" ></m-select>`
});

export const labelUp = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" :label-up="true" ></m-select>`
});

export const clearable = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" :clearable="true" ></m-select>`
});

export const clearableAndRequiredMarker = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" :clearable="true" :required-marker="true" ></m-select>`
});

export const clearableFalseAndRequiredMarker = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" :clearable="false" :required-marker="true" ></m-select>`
});

export const requiredMarker = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" :required-marker="true" ></m-select>`
});

export const longOptionMenu = () => ({
    data: () => ({
        options: LONG_OPTIONS
    }),
    template: `<m-select v-model="model" :options="options" label="Fruits" ></m-select>`
});

export const readonlyNoSelectionNoLabel = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :readonly="true" ></m-select>`
});

export const readonlyNoSelectionWithLabel = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :readonly="true" label="Fruits" ></m-select>`
});

export const readonlyNoSelectionNoLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :readonly="true" placeholder="Choose a fruit"></m-select>`
});

export const readonlyNoSelectionWithLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :readonly="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
});

export const readonlyItemSelectedWithLabel = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" label="Fruits" v-model="model" ></m-select>`
});

export const readonlyItemSelectedWithLabelClearable = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" label="Fruits" :clearable="true" v-model="model" ></m-select>`
});

export const disabledNoSelectionNoLabel = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :disabled="true" ></m-select>`
});

export const disabledNoSelectionWithLabel = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :disabled="true" label="Fruits" ></m-select>`
});

export const disabledNoSelectionNoLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :disabled="true" placeholder="Choose a fruit"></m-select>`
});

export const disabledNoSelectionWithLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS,
        model: ''
    }),
    template: `<m-select v-model="model" :options="options" :disabled="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
});

export const disabledItemSelectedWithLabel = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" label="Fruits" v-model="model" ></m-select>`
});

export const disabledItemSelectedWithLabelClearable = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" label="Fruits" :clearable="true" v-model="model" ></m-select>`
});

export const withItemsSlot = () => ({
    data: () => ({
        model: 'banane',
        options: OPTIONS
    }),
    components: {
        MSelectItem: MSelectItem
    },
    template: `<m-select :options="options" v-model="model">
                <template #items="{item, index}">
                    {{ item  }} ABC
                </template>
            </m-select>`
});

export const withOuterItemsSlot = () => ({
    data: () => ({
        model: 'banane',
        options: OPTIONS
    }),
    components: {
        MSelectItem: MSelectItem
    },
    template: `<m-select :options="options" v-model="model">
                <template #outer-items="{items, getItemProps, getItemHandlers}">
                    <template v-for="(item, index) of items">
                        <m-select-item v-if="item !== 'patate'" v-bind="getItemProps(item, index)" v-on="getItemHandlers(item, index)">
                            {{ item  }} 123
                        </m-select-item>
                        <m-select-item v-else
                                        :disabled="true">
                            {{ item  }}123
                        </m-select-item>
                    </template>
                </template>
            </m-select>`
});

export const fullWidth = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" v-model="model" width="100%" max-width="none"></m-select>`
});

export const maxWidth500px = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" v-model="model" width="100%" max-width="500px"></m-select>`
});

export const maxWidthLarge = () => ({
    data: () => ({
        model: 'banana',
        options: OPTIONS,
        maxWidthLarge: InputMaxWidth.Large
    }),
    template: `<m-select :options="options" label="Fruits" v-model="model" width="100%" :max-width="maxWidthLarge"></m-select>`
});
