import { boolean, date, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import DateFilterPlugin from '@ulaval/modul-components/dist/filters/date/date';
import { dateTimeFilter } from '@ulaval/modul-components/dist/filters/date/date-time/date-time';
import { TIME_ELAPSED_NAME } from '@ulaval/modul-components/dist/filters/filter-names';
import EnglishPlugin from '@ulaval/modul-components/dist/lang/en';
import FrenchPlugin from '@ulaval/modul-components/dist/lang/fr';
import { ENGLISH, FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(DateFilterPlugin);


function getBaseVueWithLocale(template: string): any {
    return {
        template,
        props: {
            lang: {
                default: select('Language', {
                    [FRENCH]: FRENCH,
                    [ENGLISH]: ENGLISH
                }, FRENCH)
            },
            date: {
                default: date('Date', new Date())
            },
            firstLetterUppercase: {
                default: boolean('First letter uppercase?', false)
            }
        },
        watch: {
            lang: function(): void {
                if (this.lang === FRENCH) {
                    Vue.use(FrenchPlugin);
                }

                if (this.lang === ENGLISH) {
                    Vue.use(EnglishPlugin);
                }

                this.i18n.currentLang(this.lang);
            }
        },
        data: () => ({
            originalLang: FRENCH,
            i18n: Vue.prototype.$i18n
        }),
        methods: {
            formatedDateTimestampToString(stringTimestamp: string): string {
                const dateFormat: Date = new Date(stringTimestamp);
                return dateTimeFilter(dateFormat);
            },
            formatedDateTimestampToDate(stringTimestamp: number): Date {
                // Plus currentSec puisque le date picker mets toujours :00 secondes sur les minutes choisi
                const currentSec: number = new Date().getSeconds();
                return new Date(stringTimestamp + (currentSec * 1000));
            },
            firstLetterBoolean(firstLetterUppercase: any): boolean {
                return firstLetterUppercase;
            }
        },
        destroyed(): void {
            ModulVue.prototype.$i18n.currentLang(this.originalLang);
        }
    };
}

function getBaseSimpleVue(template: string): any {
    return getBaseVueWithLocale(template);
}

storiesOf(`${modulComponentsHierarchyRootSeparator}${TIME_ELAPSED_NAME}`, module)
    .add('Default', () => getBaseSimpleVue(`
        <div>
            <div>Date choisi : <span v-html="formatedDateTimestampToString(date)"></span></div>
            <div>Resultat : {{ formatedDateTimestampToDate(date) | f-m-time-elapsed( firstLetterBoolean(firstLetterUppercase) ) }}</div>
        </div>`)
    );
