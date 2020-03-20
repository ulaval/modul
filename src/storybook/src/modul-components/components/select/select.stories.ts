import { actions } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import { SELECT_NAME } from '@ulaval/modul-components/dist/components/component-names';
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
        options: OPTIONS
    }),
    template: `<m-select :options="options" :clearable="isClearable" :label="textLabel" :label-up="isLabelUp" :placeholder="textPlaceholder" :disabled="isDisabled" :readonly="isReadonly" ></m-select>`
});

defaultStory.story = {
    name: 'Default'
};

export const focus = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :focus="true" ></m-select>`
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
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" ></m-select>`
});

export const placeholder = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" placeholder="Choose a Fruit" ></m-select>`
});

export const labelUp = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" :label-up="true" ></m-select>`
});

export const clearable = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" :clearable="true" ></m-select>`
});

export const longOptionMenu = () => ({
    data: () => ({
        options: LONG_OPTIONS
    }),
    template: `<m-select :options="options" label="Fruits" ></m-select>`
});

export const readonlyNoSelectionNoLabel = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" ></m-select>`
});

export const readonlyNoSelectionWithLabel = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" label="Fruits" ></m-select>`
});

export const readonlyNoSelectionNoLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" placeholder="Choose a fruit"></m-select>`
});

export const readonlyNoSelectionWithLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :readonly="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
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
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" ></m-select>`
});

export const disabledNoSelectionWithLabel = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" label="Fruits" ></m-select>`
});

export const disabledNoSelectionNoLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" placeholder="Choose a fruit"></m-select>`
});

export const disabledNoSelectionWithLabelWithPlaceholder = () => ({
    data: () => ({
        options: OPTIONS
    }),
    template: `<m-select :options="options" :disabled="true" label="Fruits" placeholder="Choose a fruit"></m-select>`
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
