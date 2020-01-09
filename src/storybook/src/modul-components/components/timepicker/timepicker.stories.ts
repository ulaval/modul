import { storiesOf } from '@storybook/vue';
import { TIMEPICKER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${TIMEPICKER_NAME}`, module)

    .add('default', () => ({
        data(): any {
            return {
                model: undefined
            };
        },
        template: `<m-timepicker v-model="model"></m-timepicker>`
    }))
    .add('label', () => ({
        data(): any {
            return {
                model: undefined
            };
        },
        template: `<m-timepicker v-model="model" label="Activity start time" max-width="regular"></m-timepicker>`
    }))
    .add('min 8:45 / max 15:15', () => ({
        template: '<m-timepicker v-model="model" :min="min" :max="max"></m-timepicker>',
        props: {
            max: {
                default: '15:15'
            },
            min: {
                default: '8:45'
            }
        },
        data(): any {
            return {
                model: '12:05'
            };
        }
    }))
    .add('step 15m', () => ({
        template: '<m-timepicker :step="step"></m-timepicker>',
        props: {
            step: {
                default: '15'
            }
        }
    }))
    .add('max widht', () => ({
        template: '<m-timepicker :max-width="maxWidth"></m-timepicker>',
        props: {
            maxWidth: {
                default: 'large'
            }
        }
    }))
    .add('reactivity', () => ({
        data(): any {
            return {
                model: undefined
            };
        },
        template: `<div>
            <m-timepicker v-model="model"></m-timepicker>
            <m-timepicker v-model="model"></m-timepicker>
        </div>`
    }))
    .add('label-up', () => ({
        data(): any {
            return {
                model: undefined
            };
        },
        props: {
            maxWidth: {
                default: 'medium'
            }
        },
        template: `<m-timepicker v-model="model" label="Activity start time" :label-up="true" :max-width="maxWidth"></m-timepicker>`
    }))
    .add('Skip internal validations', () => ({
        template: `<div>
        Min time {{ min }}, Max Time {{ max }} <br>
        <m-timepicker v-model="model"
                                label="Enter time"
                                :min="min"
                                :max="max"
                                :skip-input-validation="true"></m-timepicker>
                                model value = {{ model }}</div>`,
        props: {
            max: {
                default: '15:15'
            },
            min: {
                default: '8:45'
            }
        },
        data(): any {
            return {
                model: '12:05'
            };
        }
    }))
    .add('Hide internal error messages', () => ({
        template: `<div>
        Min time {{ min }}, Max Time {{ max }} <br>
        <m-timepicker v-model="model"
                                label="Enter time"
                                :min="min"
                                :max="max"
                                :hide-internal-error-message="true"></m-timepicker> model value = {{ model }}</div>`,
        props: {
            max: {
                default: '15:15'
            },
            min: {
                default: '8:45'
            }
        },
        data(): any {
            return {
                model: '12:05'
            };
        }
    })).add('required', () => ({
        data(): any {
            return {
                model: undefined
            };
        },
        props: {
            maxWidth: {
                default: 'medium'
            }
        },
        template: `<m-timepicker v-model="model" label="Time" :required-marker="true"></m-timepicker>`
    }));
