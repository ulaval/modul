import { actions } from '@storybook/addon-actions';
import { RADIO_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const RADIOS: string = `<m-radio value="1">Radio 1</m-radio>
                        <m-radio value="2">Radio 2</m-radio>
                        <m-radio value="3">Radio 3</m-radio>
                    </m-radio-group>`;

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}`,
    parameters: { fileName: __filename }
};

export const defaultStory = () => ({
    data: () => ({
        model: ''
    }),
    methods: actions(
        'change',
        'focus',
        'blur'
    ),
    template: `<m-radio-group @change="change" @focus="focus" @blur="blur" v-model="model">` + RADIOS
});

defaultStory.story = {
    name: 'default'
};

export const inline = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :inline="true">` + RADIOS
});

export const radiosVerticalAlignCenter = () => ({
    data: () => ({
        model: '1'
    }),
    template: `<m-radio-group v-model="model" radios-vertical-align="center">` + RADIOS
});

export const radiosMarginTop10px = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" radios-margin-top="10px">` + RADIOS
});

export const label = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" label="This is a label">` + RADIOS
});

export const iconSlot = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" label="This is a label">
                    <template #icon>
                        <m-icon name="m-svg__add-circle" />
                    </template>` + RADIOS
});

export const focus = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :focus="true">` + RADIOS
});

export const focusWithModel = () => ({
    data: () => ({
        model: '2'
    }),
    template: `<m-radio-group v-model="model" :focus="true">` + RADIOS
});

export const error = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :error="true">` + RADIOS
});

export const valid = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :valid="true">` + RADIOS
});

export const errorMessage = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" error-message="This is an error message">` + RADIOS
});

export const errorMessageAndLabel = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" error-message="This is an error message" label="This is a label">` + RADIOS
});

export const requiredMarker = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :required-marker="true" label="This is a label">` + RADIOS
});

export const inlineRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :inline="true" radios-position="right">` + RADIOS
});

export const radiosVerticalAlignCenterRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" radios-vertical-align="center" radios-position="right">` + RADIOS
});

export const radiosMarginTop10pxRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" radios-margin-top="10px" radios-position="right">` + RADIOS
});

export const labelRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" label="This is a label" radios-position="right">` + RADIOS
});

export const iconSlotRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" label="This is a label" radios-position="right">
                    <template #icon>
                        <m-icon name="m-svg__add-circle" />
                    </template>` + RADIOS
});

export const focusRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :focus="true" radios-position="right">` + RADIOS
});

export const focusWithModelRadioPositionRight = () => ({
    data: () => ({
        model: '2'
    }),
    template: `<m-radio-group v-model="model" :focus="true" radios-position="right">` + RADIOS
});

export const errorRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :error="true" radios-position="right">` + RADIOS
});

export const validRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :valid="true" radios-position="right">` + RADIOS
});

export const errorMessageRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" error-message="This is an error message" radios-position="right">` + RADIOS
});

export const errorMessageAndLabelRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" error-message="This is an error message" label="This is a label" radios-position="right">` + RADIOS
});

export const requiredMarkerRadioPositionRight = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :required-marker="true" label="This is a label" radios-position="right">` + RADIOS
});

export const readonlyFalseAllChildrensReadonlyFalse = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="false">
                    <m-radio value="1" :readonly="false">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="false">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyFalseAllChildrensReadonlyTrue = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="false">
                    <m-radio value="1" :readonly="true">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="true">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="true">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyFalseAllChildrensReadonlyMixed = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="false">
                    <m-radio value="1" :readonly="false">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="true">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyTrueAllChildrensReadonlyFalse = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="true">
                    <m-radio value="1" :readonly="false">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="false">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyTrueAllChildrensReadonlyTrue = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="true">
                    <m-radio value="1" :readonly="true">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="true">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="true">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyTrueAllChildrensReadonlyMixed = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :readonly="true">
                    <m-radio value="1" :readonly="false">Radio Option 1</m-radio>
                    <m-radio value="2" :readonly="true">Radio Option 2</m-radio>
                    <m-radio value="3" :readonly="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledFalseAllChildrensDisabledFalse = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="false">
                    <m-radio value="1" :disabled="false">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="false">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledFalseAllChildrensDisabledTrue = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="false">
                    <m-radio value="1" :disabled="true">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="true">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="true">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledFalseAllChildrensDisabledMixed = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="false">
                    <m-radio value="1" :disabled="false">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="true">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledTrueAllChildrensDisabledFalse = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="true">
                    <m-radio value="1" :disabled="false">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="false">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledTrueAllChildrensDisabledTrue = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="true">
                    <m-radio value="1" :disabled="true">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="true">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="true">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const disabledTrueAllChildrensDisabledMixed = () => ({
    data: () => ({
        model: ''
    }),
    template: `<m-radio-group v-model="model" :disabled="true">
                    <m-radio value="1" :disabled="false">Radio Option 1</m-radio>
                    <m-radio value="2" :disabled="true">Radio Option 2</m-radio>
                    <m-radio value="3" :disabled="false">Radio Option 3</m-radio>
                </m-radio-group>`
});

export const readonlyAndFocus = () => ({
    data: () => ({
        model: '2'
    }),
    template: `<m-radio-group v-model="model" :focus="true" :error="true" :readonly="true">
                    <m-radio value="1">Radio Option 1</m-radio>
                    <m-radio value="2">Radio Option 2</m-radio>
                    <m-radio value="3">Radio Option 3</m-radio>
                </m-radio-group>`
});
