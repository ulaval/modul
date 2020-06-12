import Vue from 'vue';
import { FormatMode } from '../../../utils/i18n/i18n';
import ModulDate, { DatePrecision } from '../../../utils/modul-date/modul-date';
import { dateFilter, DateFilterParams } from '../date/date';
import { MTimeRange, timePeriodFilter } from '../time/time';

export type ModulPeriod = {
    start?: Date,
    end?: Date
};

export enum MFormatMode {
    LongMonth = 'long-month',
    ShortMonth = 'short-month'
}

export class PeriodFilter {

    static formatPeriod(period: ModulPeriod, formatMode?: MFormatMode, withTime: boolean = false): string {
        let formattedPeriod: string;
        let filterParams: DateFilterParams = {
            shortMode: formatMode === MFormatMode.ShortMonth,
            withTime: withTime
        };

        if (period.start && period.end) {
            formattedPeriod = PeriodFilter.compactStartAndEndDate(period.start, period.end, filterParams);
        } else if (period.start && !period.end) {
            formattedPeriod = PeriodFilter.onlyStartDate(period.start, filterParams);
        } else if (period.end && !period.start) {
            formattedPeriod = PeriodFilter.onlyEndDate(period.end, filterParams);
        } else {
            throw new Error('Period must have at least one Date');
        }

        return formattedPeriod;
    }

    private static compactStartAndEndDate(start: Date, end: Date, filterParams?: DateFilterParams): string {
        let startDate: ModulDate = new ModulDate(start);
        let endDate: ModulDate = new ModulDate(end);
        let formattedPeriod: string;

        if (startDate.isSame(endDate, DatePrecision.DAY)) {
            formattedPeriod = this.sameDay(start, end, filterParams);
        } else if (startDate.isSame(endDate, DatePrecision.MONTH)) {
            formattedPeriod = this.startAndEndDateSameMonth(start, end, filterParams);
        } else if (startDate.isSame(endDate, DatePrecision.YEAR)) {
            formattedPeriod = this.startAndEndDateSameYear(start, end, filterParams);
        } else {
            formattedPeriod = this.fullStartAndEndDate(start, end, filterParams);
        }
        return formattedPeriod;
    }

    private static onlyStartDate(start: Date, filterParams?: DateFilterParams): string {
        const startFormatted: string = dateFilter(start, filterParams);
        return this.translateDate('f-m-period:start', { start: startFormatted });
    }

    private static onlyEndDate(end: Date, filterParams?: DateFilterParams): string {
        const endFormatted: string = dateFilter(end, filterParams);

        return this.translateDate('f-m-period:end', { end: endFormatted });
    }

    private static startAndEndDateSameMonth(start: Date, end: Date, filterParams?: DateFilterParams): string {
        const endFormatted: string = dateFilter(end, filterParams);
        const monthParams: DateFilterParams = { showMonth: false, showYear: false };
        const dateFilterParams: DateFilterParams = Object.assign(filterParams, monthParams);
        const startFormatted: string = dateFilter(start, dateFilterParams);

        const params: any = {
            start: startFormatted,
            end: endFormatted
        };

        return this.translateDate('f-m-period:dates', params);
    }

    private static startAndEndDateSameYear(start: Date, end: Date, filterParams?: DateFilterParams): string {
        const endFormatted: string = dateFilter(end, filterParams);
        const monthParams: DateFilterParams = { showYear: false };
        const dateFilterParams: DateFilterParams = Object.assign(filterParams, monthParams);
        const startFormatted: string = dateFilter(start, dateFilterParams);

        const params: any = {
            start: startFormatted,
            end: endFormatted
        };

        return this.translateDate('f-m-period:dates', params);
    }

    private static fullStartAndEndDate(start: Date, end: Date, filterParams?: DateFilterParams): string {
        const startFormatted: string = dateFilter(start, filterParams);
        const endFormatted: string = dateFilter(end, filterParams);
        const params: any = {
            start: startFormatted,
            end: endFormatted
        };

        return this.translateDate('f-m-period:dates', params);
    }

    private static sameDay(start: Date, end: Date, filterParams?: DateFilterParams): string {
        const timeRange: MTimeRange<Date> = {
            from: start,
            to: end
        };
        const time: string = timePeriodFilter(timeRange, { preposition: true });
        const params: any = {
            date: dateFilter(start, filterParams),
            time: (time.length > 1) ? time.charAt(0).toLowerCase() + time.slice(1) : ''
        };

        if (filterParams && filterParams.withTime) {
            return this.translateDate('f-m-period:sameDayShowTime', params);
        } else {
            return this.translateDate('f-m-period:sameDay', params);
        }
    }

    private static translateDate(key: string, params: any): string {
        return (Vue.prototype).$i18n.translate(key, params, 0, '', undefined, FormatMode.Vsprintf);
    }
}
