import { storiesOf } from '@storybook/vue';
import { TOGGLE_BUTTONS_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MToggleButton, MToggleButtonSkin } from '@ulaval/modul-components/dist/components/toggle-buttons/toggle-buttons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const JUNE: MToggleButton = { id: 'june', title: 'June' };
const JULY: MToggleButton = { id: 'july', title: 'July' };
const AUGUST: MToggleButton = { id: 'august', title: 'August' };
const SEPTEMBER: MToggleButton = { id: 'september', title: 'September' };
const OCTOBER: MToggleButton = { id: 'october', title: 'October', pressed: true };
const NOVEMBER: MToggleButton = { id: 'november', title: 'November' };
const DECEMBER: MToggleButton = { id: 'december', title: 'December', pressed: true };

const monthsDefault: MToggleButton[] = [JUNE, JULY, AUGUST, SEPTEMBER];
const monthsMultipleSelection: MToggleButton[] = [SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER];
const monthsSingleSelection: MToggleButton[] = [AUGUST, SEPTEMBER, OCTOBER, NOVEMBER];

storiesOf(`${modulComponentsHierarchyRootSeparator}${TOGGLE_BUTTONS_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            buttons: monthsDefault
        }),
        template: '<m-toggle-buttons v-model="buttons" aria-label="Months" />'
    }))
    .add('skin rounded', () => ({
        props: {
            skin: {
                default: MToggleButtonSkin.ROUNDED
            }
        },
        data: () => ({
            buttons: monthsDefault
        }),
        template: '<m-toggle-buttons v-model="buttons" aria-label="Months" :skin="skin" />'
    }))
    .add('multiple selection', () => ({
        data: () => ({
            buttons: monthsMultipleSelection
        }),
        template: '<m-toggle-buttons v-model="buttons" aria-label="Months" />'
    }))
    .add('single selection', () => ({
        data: () => ({
            buttons: monthsSingleSelection,
            multiple: false
        }),
        template: '<m-toggle-buttons v-model="buttons" :multiple="multiple" aria-label="Months" />'
    }))
    .add('with slots', () => ({
        data: () => ({
            buttons: monthsSingleSelection
        }),
        template: `<m-toggle-buttons v-model="buttons" aria-label="Months">
                        <template slot-scope="{button}">
                            <m-icon name="m-svg__close-clear"></m-icon> {{ button.title }} <m-icon name="m-svg__close-clear"></m-icon>
                        </template>
                    </m-toggle-buttons>`
    }))
    .add('disabled', () => ({
        data: () => ({
            buttons: monthsSingleSelection,
            disabled: true
        }),
        template: '<m-toggle-buttons v-model="buttons" aria-label="Months" :disabled="disabled" />'
    }));
