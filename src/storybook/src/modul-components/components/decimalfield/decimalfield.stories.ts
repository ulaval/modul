import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { DECIMALFIELD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MDecimalfield } from '@ulaval/modul-components/dist/components/decimalfield/decimalfield';
import { ENGLISH, FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';


storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('Basic', () => ({
        components: { MDecimalfield },
        template: `
            <div>
                <${DECIMALFIELD_NAME} v-model="value"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Label"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Required label"
                                      :required-marker="true"></${DECIMALFIELD_NAME}><br>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Valid message"
                                      valid-message="Valid message"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Helper message"
                                      helper-message="Helper message"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      error-message="Error message"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Placeholder"
                                      placeholder="Enter a decimal number"
                                      :label-up="true"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Disabled"
                                      :disabled="true"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Readonly"
                                      :readonly="true"></${DECIMALFIELD_NAME}>
                <${DECIMALFIELD_NAME} v-model="value"
                                      label="Waiting"
                                      :waiting="true"></${DECIMALFIELD_NAME}>
            </div>
        `,
        data: () => ({
            value: undefined
        })
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('States', () => ({
        components: { MDecimalfield },
        template: `
            <div>
                <div><${DECIMALFIELD_NAME} v-model="value" :disabled="true" :placeholder="'Disabled'"></${DECIMALFIELD_NAME}></div>
                <div><${DECIMALFIELD_NAME} v-model="value" :placeholder="'Read-only'" :readonly="true"></${DECIMALFIELD_NAME}></div>
                <div><${DECIMALFIELD_NAME} v-model="value" :placeholder="'Waiting'" :waiting="true"></${DECIMALFIELD_NAME}></div>
            </div>
        `,
        data: () => ({
            value: undefined
        })
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('With initial value (0)', () => ({
        components: { MDecimalfield },
        template: `<${DECIMALFIELD_NAME} v-model="value"></${DECIMALFIELD_NAME}>`,
        data: () => ({
            value: 0
        })
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('With initial value', () => ({
        components: { MDecimalfield },
        template: `<${DECIMALFIELD_NAME} v-model="value"></${DECIMALFIELD_NAME}>`,
        data: () => ({
            value: 123456.1
        })
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('Localization', () => ({
        components: { MDecimalfield },
        template: `
            <${DECIMALFIELD_NAME} v-model="value"></${DECIMALFIELD_NAME}>
        `,
        props: {
            lang: {
                default: select('Language', {
                    [FRENCH]: FRENCH,
                    [ENGLISH]: ENGLISH
                }, (Vue.prototype as ModulVue).$i18n.currentLang())
            }
        },
        watch: {
            lang: function(): void {
                this.i18n.currentLang(this.lang);
            }
        },
        data: () => ({
            value: 123456.1,
            originalLang: (Vue.prototype as ModulVue).$i18n.currentLang(),
            i18n: Vue.prototype.$i18n
        }),
        destroyed(): void {
            (Vue.prototype as ModulVue).$i18n.currentLang(this.originalLang);
        }
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${DECIMALFIELD_NAME}`, module)


    .add('Default precision', () => ({
        components: { MDecimalfield },
        template: `
            <${DECIMALFIELD_NAME} v-model="value"></${DECIMALFIELD_NAME}>
        `,
        data: () => ({
            value: 9999999999999.99
        })
    }))
    .add('Custom precision', () => ({
        components: { MDecimalfield },
        template: `
            <${DECIMALFIELD_NAME} v-model="value" :precision="9" :rounding="4"></${DECIMALFIELD_NAME}>
        `,
        data: () => ({
            value: 99999.9999
        })
    }));
