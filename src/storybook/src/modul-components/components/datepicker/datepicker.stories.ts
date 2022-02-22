import { storiesOf } from '@storybook/vue';
import { DATEPICKER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${DATEPICKER_NAME}`, module)

    .add('default', () => ({
        template: `<m-datepicker></m-datepicker>`
    }))
    .add('events', () => ({
        data: () => ({
            model: '2011-01-01',
            skipInputValidation: true
        }),
        methods: {
            onInputChange(value: string): string {
                // tslint:disable-next-line: no-console
                console.log('MDatePicker.onInputChange=' + value);
                return value;
            },
            onResetModel(): void {
                (this as any).$data.model = '';
            },
            onFocus(value: Event): void {
                // tslint:disable-next-line: no-console
                console.log('MDatePicker.onFocus!');

            },
            onBlur(event: Event): void {
                // tslint:disable-next-line: no-console
                console.log('MDatePicker.onBlur!');

            }
        },
        template: `<div><p class="mu-no-m">Model value = "{{model}}"<br>skipInputValidation = "{{skipInputValidation}}"</p><m-datepicker class="mu-mt" :value="model" @change="model = onInputChange($event)" @focus="onFocus" @blur="onBlur" min="2019-05-10" max="2019-05-24" :skip-input-validation="skipInputValidation"></m-datepicker><p><m-button @click="onResetModel">Reset model</m-button></p><p><m-checkbox v-model="skipInputValidation">skipInputValidation</m-checkbox></p></div>`
    }))
    .add('label', () => ({
        template: `<m-datepicker label="Date label"></m-datepicker>`
    }))

    .add('placeholder', () => ({
        template: `<m-datepicker placeholder="Lorem Ipsum"></m-datepicker>`
    }))

    .add('waiting', () => ({
        template: `<m-datepicker :waiting="true"></m-datepicker>`
    }))

    .add('min and max', () => ({
        data: () => ({
            value: '2008-02-02',
            dateMin: '2000-01-10',
            dateMax: '2008-03-20'
        }),
        methods: {
            resetValue(): void {
                (this as any).$data.value = '';
            },
            setValueInRange(): void {
                (this as any).$data.value = '2008-02-07';
            },
            setValueOutOfRange(): void {
                (this as any).$data.value = '2010-02-07';
            }
        },
        template: `
        <div>
            <p><strong>Model value:</strong> {{value}}</p>
            <p><strong>Date min:</strong> {{dateMin}}</p>
            <p><strong>Date max:</strong> {{dateMax}}</p>
            <m-datepicker v-model="value" class="mu-mt" :min="dateMin" :max="dateMax"></m-datepicker>
            <div class="mu-mt">
                <m-button class="mu-mr" @click="resetValue()">Reset value</m-button>
                <m-button class="mu-mr" skin="secondary" @click="setValueInRange()">Date in the range</m-button>
                <m-button class="mu-mr" skin="secondary" @click="setValueOutOfRange()">Date out de range</m-button>
            </div>
        </div>`
    }))

    .add('date format invalid', () => ({
        data: () => ({
            model1: '2000-19-12'
        }),
        template: `<div><m-datepicker min="2008-01-01" max="2014-12-31" v-model="model1"></m-datepicker>model value = {{model1}}</div>`
    }))

    .add('date off limit min', () => ({
        data: () => ({
            model1: '2000-01-01'
        }),
        template: `<div><m-datepicker min="2008-01-01" max="2014-12-31" v-model="model1"></m-datepicker>model value = {{model1}}</div>`
    }))

    .add('date off limit  max', () => ({
        data: () => ({
            model1: '2015-01-01'
        }),
        template: `<div><m-datepicker min="2008-01-01" max="2014-12-31" v-model="model1"></m-datepicker>model value = {{model1}}</div>`
    }))

    .add('date big min and max limit', () => ({
        data: () => ({
            model1: '2000-01-01'
        }),
        template: `<div><m-datepicker min="1901-01-01" max="2250-12-31" v-model="model1"></m-datepicker>model value = {{model1}}</div>`
    }))

    .add('disabled', () => ({
        template: `<m-datepicker :disabled="true"></m-datepicker>`
    }))
    .add('readonly', () => ({
        template: `<m-datepicker :readonly="true"></m-datepicker>`
    }))
    .add('valid', () => ({
        template: `<m-datepicker :valid="true"></m-datepicker>`
    }))
    .add('error-message', () => ({
        template: `<m-datepicker :error="true" error-message="this is an error"></m-datepicker>`
    }))
    .add('helper-message', () => ({
        template: `<m-datepicker helper-message="AAAA-MM-JJ"></m-datepicker>`
    }))
    .add('hide-internal-error-message', () => ({
        data: () => ({
            model1: '9999-99-99'
        }),
        template: `<m-datepicker v-model="model1" :hide-internal-error-message="true"></m-datepicker>`
    }))
    .add('label-up', () => ({
        template: `<m-datepicker label="Date label" :label-up="true"></m-datepicker>`
    }))
    .add('required-marker', () => ({
        template: `<m-datepicker label="Date label" :required-marker="true"></m-datepicker>`
    }))
    .add('skip-input-validation=true', () => ({
        data: () => ({
            model1: '9999-99-99'
        }),
        template: `<div><m-datepicker :skip-input-validation="true" min="2008-01-01" max="2014-12-31" v-model="model1"></m-datepicker>model value = {{model1}}</div>`
    }));


storiesOf(`${modulComponentsHierarchyRootSeparator}${DATEPICKER_NAME}/type`, module)
    .add('full-date', () => ({
        template: `<m-datepicker type="full-date"></m-datepicker>`
    }))
    .add('years-months', () => ({
        template: `<m-datepicker type="years-months"></m-datepicker>`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DATEPICKER_NAME}/initial-view`, module)
    .add('days', () => ({
        template: `<m-datepicker initial-view="days"></m-datepicker>`
    }))
    .add('years-months', () => ({
        template: `<m-datepicker helperMessage="Range between 2000 and 2030" initial-view="years-months" min="2000-01-31" max="2030-12-31"></m-datepicker>`
    }))
    .add('years-months-birthdate', () => ({
        template: `<m-datepicker label="Birthdate" helperMessage="Range between 1900 and 2000" initial-view="years-months" min="1900-01-31" max="2000-12-31"></m-datepicker>`
    }));
