import Vue from 'vue';
import { FormatMode } from '../../../utils/i18n/i18n';
import { dateFilter, DateFilterParams } from '../date/date';

const oneMinuteInMillisecond: number = 60 * 1000;
const oneHourInMillisecond: number = 60 * oneMinuteInMillisecond;
const oneDayInMillisecond: number = 24 * oneHourInMillisecond;
const thirtyOneDaysInMillisecond: number = 31 * oneDayInMillisecond;
const averageExecutionMillisecondTime: number = 900;

export class TimeElapsedFilter {

    static format(date: Date, firstLetterUppercase: boolean = false): string {
        let timeElapsed: string;
        const shortModeParams: DateFilterParams = { shortMode: true };
        const i18nStartKey: string = firstLetterUppercase ? 'f-m-time-elapsed-start-sentence:' : 'f-m-time-elapsed:';

        const calculateTimeElapsed: number = (new Date().getTime() + averageExecutionMillisecondTime) - date.getTime();

        if (Math.sign(calculateTimeElapsed) !== 1) {
            throw new Error('Date is in the future');
        }

        if (calculateTimeElapsed < oneMinuteInMillisecond) {
            timeElapsed = TimeElapsedFilter.translateDate(i18nStartKey + 'now', {});
        } else if (calculateTimeElapsed < oneHourInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanOneHourMessage(calculateTimeElapsed, i18nStartKey);
        } else if (calculateTimeElapsed < oneDayInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanOneDayMessage(calculateTimeElapsed, i18nStartKey);
        } else if (calculateTimeElapsed < thirtyOneDaysInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanThirtyOneDaysMessage(calculateTimeElapsed, i18nStartKey);
        } else {
            timeElapsed = dateFilter(date, shortModeParams);
        }

        return timeElapsed;
    }

    private static defineLessThanOneHourMessage(calculateTimeElapsed: number, i18nStartKey: string): string {
        const minute: number = Math.floor(calculateTimeElapsed / oneMinuteInMillisecond);
        return TimeElapsedFilter.translateDate(i18nStartKey + 'minute', { minute: minute }, minute);
    }

    private static defineLessThanOneDayMessage(calculateTimeElapsed: number, i18nStartKey: string): string {
        const hour: number = Math.floor(calculateTimeElapsed / oneHourInMillisecond);
        return TimeElapsedFilter.translateDate(i18nStartKey + 'hour', { hour: hour }, hour);
    }

    private static defineLessThanThirtyOneDaysMessage(calculateTimeElapsed: number, i18nStartKey: string): string {
        const day: number = Math.floor(calculateTimeElapsed / oneDayInMillisecond);
        return TimeElapsedFilter.translateDate(i18nStartKey + 'day', { day: day }, day);
    }

    private static translateDate(key: string, params: any, timeNumber?: number): string {
        return (Vue.prototype).$i18n.translate(key, params, timeNumber, '', undefined, FormatMode.Vsprintf);
    }
}
