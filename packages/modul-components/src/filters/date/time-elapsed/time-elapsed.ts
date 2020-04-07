import Vue from 'vue';
import { FormatMode } from '../../../utils/i18n/i18n';
import { dateFilter, DateFilterParams } from '../date/date';

const oneMinuteInMillisecond: number = 60000;
const sixtyMinutesInMillisecond: number = 3600000;
const oneDayInMillisecond: number = 86400000;
const thirtyDaysInMillisecond: number = 2592000000;

export class TimeElapsedFilter {

    static format(date: Date, firstLetterUppercase: boolean = false): string {
        let timeElapsed: string;
        let shortModeParams: DateFilterParams = { shortMode: true };

        const calculateTimeElapsed: number = new Date().getTime() - date.getTime();

        if (Math.sign(calculateTimeElapsed) !== 1) {
            throw new Error('Date is in the future');
        }

        if (calculateTimeElapsed < oneMinuteInMillisecond) {
            timeElapsed = TimeElapsedFilter.translateDate('f-m-time-elapsed:now', {});
        } else if (calculateTimeElapsed < sixtyMinutesInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanSixtyMinutesMessage(calculateTimeElapsed);
        } else if (calculateTimeElapsed < oneDayInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanOneDayMessage(calculateTimeElapsed);
        } else if (calculateTimeElapsed < thirtyDaysInMillisecond) {
            timeElapsed = TimeElapsedFilter.defineLessThanThirtyDaysMessage(calculateTimeElapsed);
        } else {
            timeElapsed = dateFilter(date, shortModeParams);
        }

        if (firstLetterUppercase) {
            timeElapsed = TimeElapsedFilter.uppercaseFirstLetter(timeElapsed);
        }

        return timeElapsed;
    }

    private static defineLessThanSixtyMinutesMessage(calculateTimeElapsed: number): string {
        const minute: number = Math.floor(calculateTimeElapsed / oneMinuteInMillisecond);
        return TimeElapsedFilter.translateDate('f-m-time-elapsed:minute', { minute: minute }, minute);
    }

    private static defineLessThanOneDayMessage(calculateTimeElapsed: number): string {
        const hour: number = Math.floor(calculateTimeElapsed / sixtyMinutesInMillisecond);
        return TimeElapsedFilter.translateDate('f-m-time-elapsed:hour', { hour: hour }, hour);
    }

    private static defineLessThanThirtyDaysMessage(calculateTimeElapsed: number): string {
        const day: number = Math.floor(calculateTimeElapsed / oneDayInMillisecond);
        return TimeElapsedFilter.translateDate('f-m-time-elapsed:day', { day: day }, day);
    }

    private static uppercaseFirstLetter(timeElapsed: string): string {
        return timeElapsed.charAt(0).toUpperCase() + timeElapsed.slice(1);
    }

    private static translateDate(key: string, params: any, timeNumber?: number): string {
        return (Vue.prototype).$i18n.translate(key, params, timeNumber, '', undefined, FormatMode.Vsprintf);
    }
}
