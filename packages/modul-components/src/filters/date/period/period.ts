import Vue from 'vue';
import { FormatMode } from '../../../utils/i18n/i18n';
import ModulDate, { DatePrecision } from '../../../utils/modul-date/modul-date';
import { DateTimeFilter } from '../date-time/date-time';
import { dateFilter, DateFilterParams } from '../date/date';
import { timePeriodFilter } from '../time/time';

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

    private static onlyStartDate(start: Date, filterParams?: DateFilterParams): string {
        const startFormatted: string = dateFilter(start, filterParams);
        return this.translateDate('f-m-period:start', { start: startFormatted });
    }

    private static onlyEndDate(end: Date, filterParams?: DateFilterParams): string {
        const endFormatted: string = dateFilter(end, filterParams);

        return this.translateDate('f-m-period:end', { end: endFormatted });
    }

    private static compactStartAndEndDate(start: Date, end: Date, filterParams?: DateFilterParams): string {
        let startDate: ModulDate = new ModulDate(start);
        let endDate: ModulDate = new ModulDate(end);
        let formattedPeriod: string;
        if (startDate.isSame(endDate, DatePrecision.DAY)) {
            formattedPeriod = this.sameDay(start, end, filterParams);
        } else if (startDate.isSame(endDate, DatePrecision.MONTH) && (!filterParams || !filterParams.withTime)) {
            formattedPeriod = this.startAndEndDateSameMonth(start, end, filterParams);
        } else if (startDate.isSame(endDate, DatePrecision.YEAR)) {
            formattedPeriod = this.startAndEndDateSameYear(start, end, filterParams);
        } else {
            formattedPeriod = this.fullStartAndEndDate(start, end, filterParams);
        }
        return formattedPeriod;
    }

    private static sameDay(start: Date, end: Date, filterParams?: DateFilterParams): string {
        const time: string = timePeriodFilter({ from: start, to: end }, { preposition: true });
        const params: any = {
            date: dateFilter(start, filterParams),
            time: (time.length > 0) ? time.charAt(0).toLowerCase() + time.slice(1) : ''
        };

        if (filterParams && filterParams.withTime) {
            return this.translateDate('f-m-period:sameDayShowTime', params);
        }
        return this.translateDate('f-m-period:sameDay', params);
    }

    private static startAndEndDateSameMonth(startDate: Date, endDate: Date, filterParams?: DateFilterParams): string {
        const start: string = this.getTranslateDateParams(startDate, { ...filterParams, showMonth: false, showYear: false });
        const end: string = this.getTranslateDateParams(endDate, filterParams);
        return this.translateDate('f-m-period:dates', { start, end });
    }

    private static startAndEndDateSameYear(startDate: Date, endDate: Date, filterParams?: DateFilterParams): string {
        const start: string = this.getTranslateDateParams(startDate, { ...filterParams, showYear: false });
        const end: string = this.getTranslateDateParams(endDate, filterParams);
        return this.translateDate('f-m-period:dates', { start, end });
    }

    private static fullStartAndEndDate(startDate: Date, endDate: Date, filterParams?: DateFilterParams): string {
        const start: string = this.getTranslateDateParams(startDate, filterParams);
        const end: string = this.getTranslateDateParams(endDate, filterParams);
        return this.translateDate('f-m-period:dates', { start, end });
    }

    private static getTranslateDateParams(date: Date, filterParams?: DateFilterParams): string {
        if (filterParams && filterParams.withTime) {
            return DateTimeFilter.formatDateTime(date, filterParams);
        }
        return dateFilter(date, filterParams);
    }

    private static translateDate(key: string, params: any): string {
        return (Vue.prototype).$i18n.translate(key, params, 0, '', undefined, FormatMode.Vsprintf);
    }
}
