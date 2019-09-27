import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import TimeFilterPlugin, { TimeFilterPrepositions } from '@ulaval/modul-components/dist/filters/date/time/time';
import { TIME_NAME } from '@ulaval/modul-components/dist/filters/filter-names';
import EnglishPlugin from '@ulaval/modul-components/dist/lang/en';
import FrenchPlugin from '@ulaval/modul-components/dist/lang/fr';
import { ENGLISH, FRENCH } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';


Vue.use(TimeFilterPlugin);


function getBaseVueWithLocale(template: string, preposition: {}): any {
    return {
        template,
        props: {
            lang: {
                default: select('language', {
                    [FRENCH]: FRENCH,
                    [ENGLISH]: ENGLISH
                }, ModulVue.prototype.$i18n.currentLang())
            },
            preposition: preposition
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
            originalLang: (Vue.prototype as ModulVue).$i18n.currentLang(),
            i18n: Vue.prototype.$i18n
        }),
        destroyed(): void {
            ModulVue.prototype.$i18n.currentLang(this.originalLang);
        }
    };
}

function getBaseSimpleVue(template: string): any {
    return getBaseVueWithLocale(template, {
        default: select('preposition', {
            [TimeFilterPrepositions.From]: TimeFilterPrepositions.From,
            [TimeFilterPrepositions.Until]: TimeFilterPrepositions.Until,
            [TimeFilterPrepositions.At]: TimeFilterPrepositions.At,
            [TimeFilterPrepositions.None]: TimeFilterPrepositions.None
        }, TimeFilterPrepositions.None)
    });
}

function getBasePeriodVue(template: string): any {
    return getBaseVueWithLocale(template, {
        default: boolean('withPreposition', false)
    });
}

storiesOf(`${modulComponentsHierarchyRootSeparator}${TIME_NAME}`, module)
    .add('Simple (from strings)', () => getBaseSimpleVue(`
        <div>
            <div>at the top of the hour a.m. (11:00): {{ '11:00' | f-m-time({ preposition }) }}</div>
            <div>hour with minutes a.m. (11:59): {{ '11:59' | f-m-time({ preposition }) }}</div>
            <div>at the top of the hour p.m. (14:00): {{ '14:00' | f-m-time({ preposition }) }}</div>
            <div>hour with minutes p.m. (14:59): {{ '14:59' | f-m-time({ preposition }) }}</div>
            <div>hours and minutes single digit (04:04): {{ '04:04' | f-m-time({ preposition }) }}</div>
            <div>Midnight (00:00): {{ '00:00' | f-m-time({ preposition }) }}</div>
            <div>Midnight with minutes (00:59): {{ '00:59' | f-m-time({ preposition }) }}</div>
            <div>Noon (12:00): {{ '12:00' | f-m-time({ preposition }) }}</div>
        </div>`)
    )
    .add('Simple (from Dates)', () => getBaseSimpleVue(`
        <div>
            <div>at the top of the hour a.m. (11:00): {{ new Date('2019-06-23T15:00:00Z') | f-m-time({ preposition }) }}</div>
            <div>hour with minutes a.m. (11:59): {{ new Date('2019-06-23T15:59:00Z') | f-m-time({ preposition }) }}</div>
            <div>at the top of the hour p.m. (14:00): {{ new Date('2019-06-23T18:00:00Z') | f-m-time({ preposition }) }}</div>
            <div>hour with minutes p.m. (14:59): {{ new Date('2019-06-23T18:59:00Z') | f-m-time({ preposition }) }}</div>
            <div>hours and minutes single digit (04:04): {{ new Date('2019-06-23T08:04:00Z') | f-m-time({ preposition }) }}</div>
            <div>Midnight (00:00): {{ new Date('2019-06-23T04:00:00Z') | f-m-time({ preposition }) }}</div>
            <div>Midnight with minutes (00:59): {{ new Date('2019-06-23T04:59:00Z') | f-m-time({ preposition }) }}</div>
            <div>Noon (12:00): {{ new Date('2019-06-23T16:00:00Z') | f-m-time({ preposition }) }}</div>
        </div>`)
    )
    .add('Complex (from Dates)', () => getBaseSimpleVue(`
        <div>
            <div>iso string with offset (10:58): {{ new Date('2019-07-19T10:58:38.107-04:00') | f-m-time({ preposition }) }}</div>
        </div>`)
    )
    .add('Period (from strings)', () => getBasePeriodVue(`
        <div>
            <div>undefined period: {{ undefined | f-m-time-period({ preposition }) }}</div>
            <div>empty period: {{ {} | f-m-time-period({ preposition }) }}</div>
            <div>from only: {{ { from: '11:00' } | f-m-time-period({ preposition }) }}</div>
            <div>to only: {{ { to: '11:59' } | f-m-time-period({ preposition }) }}</div>
            <div>full period: {{ { from: '11:59', to: '14:15' } | f-m-time-period({ preposition }) }}</div>
            <div>full period, same time: {{ { from: '11:59', to: '11:59' } | f-m-time-period({ preposition }) }}</div>
        </div>`)
    )
    .add('Period (from dates)', () => getBasePeriodVue(`
        <div>
            <div>undefined period: {{ undefined | f-m-time-period({ preposition }) }}</div>
            <div>empty period: {{ {} | f-m-time-period({ preposition }) }}</div>
            <div>from only: {{ { from: new Date('2019-06-23T11:00:00Z') } | f-m-time-period({ preposition }) }}</div>
            <div>to only: {{ { to: new Date('2019-06-23T11:59:00Z') } | f-m-time-period({ preposition }) }}</div>
            <div>full period: {{ { from: new Date('2019-06-23T11:59:00Z'), to: new Date('2019-06-23T14:15:00Z') } | f-m-time-period({ preposition }) }}</div>
            <div>full period, same time: {{ { from: new Date('2019-06-23T11:59:00Z'), to: new Date('2019-06-23T11:59:00Z') } | f-m-time-period({ preposition }) }}</div>
        </div>`)
    );
