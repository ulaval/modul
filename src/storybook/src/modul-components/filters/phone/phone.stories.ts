import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { PHONE_NAME } from '@ulaval/modul-components/dist/filters/filter-names';
import PhoneFilterPlugin, { PhoneFilter, PhoneNumberFormat } from '@ulaval/modul-components/dist/filters/phone/phone';
import { CountryCode } from 'libphonenumber-js';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PhoneFilterPlugin);

function getBaseVueWithLocale(template: string): any {
    return {
        template,
        props: {
            text: {
                default: text('Phone number', '+14185479029')
            },
            format: {
                default: select('Format', {
                    [PhoneNumberFormat.NATIONAL]: PhoneNumberFormat.NATIONAL,
                    [PhoneNumberFormat.INTERNATIONAL]: PhoneNumberFormat.INTERNATIONAL
                }, PhoneNumberFormat.NATIONAL)
            }
        },
        methods: {
            formatedPhoneNumber(text: string, defaultCountry: CountryCode, format: PhoneNumberFormat): string {
                return PhoneFilter.format(text, format);
            }
        }
    };
}

function getBaseSimpleVue(template: string): any {
    return getBaseVueWithLocale(template);
}

storiesOf(`${modulComponentsHierarchyRootSeparator}${PHONE_NAME}`, module)
    .add('Default', () => getBaseSimpleVue(`
        <div>
            <div>Phone number : <span v-html="text"></span></div>
            <div>Result : <span v-html="formatedPhoneNumber(text, format)"></span></div>
        </div>`)
    );
