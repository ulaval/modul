import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { MPostalCodeCountry } from '@ulaval/modul-components/dist/components/postalcodefield/postalcodefield';
import { POSTAL_CODE_NAME } from '@ulaval/modul-components/dist/filters/filter-names';
import PostalCodeFilterPlugin, { PostalCodeFilter } from '@ulaval/modul-components/dist/filters/postal-code/postal-code';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(PostalCodeFilterPlugin);

function getBaseVueWithLocale(template: string): any {
    return {
        template,
        props: {
            text: {
                default: text('G2B0B9', MPostalCodeCountry.CA)
            },
            isoCountry: {
                default: select('ISO Country', {
                    [MPostalCodeCountry.CA]: MPostalCodeCountry.CA,
                    ['Other country']: ''
                }, MPostalCodeCountry.CA)
            }
        },
        methods: {
            formatedPostalCode(text: string, isoCountry: string): string {
                return PostalCodeFilter.format(text, isoCountry);
            }
        }
    };
}

function getBaseSimpleVue(template: string): any {
    return getBaseVueWithLocale(template);
}

storiesOf(`${modulComponentsHierarchyRootSeparator}${POSTAL_CODE_NAME}`, module)
    .add('Default', () => getBaseSimpleVue(`
        <div>
            <div>Postal Code : <span v-html="text"></span></div>
            <div>Result : <span v-html="formatedPostalCode(text, isoCountry)"></span></div>
        </div>`)
    );
