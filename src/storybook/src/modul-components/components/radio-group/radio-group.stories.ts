import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { RADIO_GROUP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}`, module)

    .add('default', () => ({
        props: {
            text: {
                default: text('Text', 'A Radio Group')
            }
        },
        template: `<m-radio-group v-model="model" label="What's the best time to call you?">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('inline', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" inline="true">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('radios-vertical-align="center"', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" radios-vertical-align="center">
                        <m-radio value="1" class="m-u--h2">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" class="m-u--h2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" class="m-u--h2">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('radios-margin-top="5px"', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" radios-margin-top="5px">
                        <m-radio value="1" class="m-u--h2">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" class="m-u--h2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" class="m-u--h2">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('label', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" label="What's the best time to call you?">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('icon slot', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" label="What's the best time to call you?">
                        <template #icon>
                            <m-icon name="m-svg__add-circle" />
                        </template>
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('focus', () => ({
        template: `<m-radio-group :focus="true" label="What's the best time to call you?">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('focus with model', () => ({
        data: () => ({
            model: '2'
        }),
        template: `<m-radio-group v-model="model" :focus="true" label="What's the best time to call you?">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('error', () => ({
        template: `<m-radio-group error="true">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('valid', () => ({
        data: () => ({
            model: '1'
        }),
        template: `<m-radio-group v-model="model" valid="true">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('error-message', () => ({
        template: `<m-radio-group error-message="We don't want to disturb you, please select an option">
                        <m-radio value="1">In the morning (from 9 a.m. to 12 noon)</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('error-message & label', () => ({
        template: `<m-radio-group error-message="We don't want to disturb you, please select an option" label="What's the best time to call you?">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('required-marker', () => ({
        template: `<m-radio-group :required-marker="true" label="This is a label">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}/radios-position="right"`, module)
    .add('inline', () => ({
        template: `<m-radio-group inline="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('radios-vertical-align="center"', () => ({
        template: `<m-radio-group radios-position="right" radios-vertical-align="center">
                        <m-radio value="1" class="m-u--h2">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" class="m-u--h2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" class="m-u--h2">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('radios-margin-top="5px"', () => ({
        template: `<m-radio-group radios-margin-top="5px" radios-position="right">
                        <m-radio value="1" class="m-u--h2">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" class="m-u--h2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" class="m-u--h2">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('disabled', () => ({
        template: `<m-radio-group :disabled="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('readonly', () => ({
        template: `<m-radio-group :readonly="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('label', () => ({
        template: `<m-radio-group label="This is a label" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('focus', () => ({
        template: `<m-radio-group :focus="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('error', () => ({
        template: `<m-radio-group :error="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('valid', () => ({
        template: `<m-radio-group :valid="true" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('error-message', () => ({
        template: `<m-radio-group error-message="This is an error message" radios-position="right">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}/readonly="false"`, module)
    .add('all childrens readonly="false"', () => ({
        template: `<m-radio-group :readonly="false">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('all childrens readonly="true"', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1" :readonly="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :readonly="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :readonly="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens readonly="mixed"', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1" :readonly="false">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :readonly="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :readonly="false">In the evening : 5 p.m. to 9 p.m.</m-radio>
    </m-radio-group>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}/readonly="true"`, module)

    .add('default', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                    </m-radio-group>`
    }))
    .add('all childrens readonly="false"', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1" :readonly="false">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :readonly="false">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :readonly="false">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens readonly="true"', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1" :readonly="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :readonly="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :readonly="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens readonly="mixed"', () => ({
        template: `<m-radio-group :readonly="true">
                        <m-radio value="1" :readonly="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :readonly="false">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :readonly="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
    </m-radio-group>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}/disabled="false"`, module)
    .add('all childrens disabled="false"', () => ({
        template: `<m-radio-group :disabled="false">
                        <m-radio value="1" :disabled="false">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="false">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="false">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens disabled="true"', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1" :disabled="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens disabled="mixed"', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1" :disabled="false">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="false">In the evening : 5 p.m. to 9 p.m.</m-radio>
    </m-radio-group>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${RADIO_GROUP_NAME}/disabled="true"`, module)
    .add('default', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens disabled="false"', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1" :disabled="false">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="false">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="false">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens disabled="true"', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1" :disabled="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="true">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
                   </m-radio-group>`
    }))
    .add('all childrens disabled="mixed"', () => ({
        template: `<m-radio-group :disabled="true">
                        <m-radio value="1" :disabled="true">In the morning : 9 a.m. to 12 noon</m-radio>
                        <m-radio value="2" :disabled="false">In the afternoon : 12 noon to 5 p.m.</m-radio>
                        <m-radio value="3" :disabled="true">In the evening : 5 p.m. to 9 p.m.</m-radio>
    </m-radio-group>`
    }));

