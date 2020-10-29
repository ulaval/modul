import Vue from 'vue';
import { FormatMode } from '../../../utils/i18n/i18n';
import { dateFilter, DateFilterParams } from '../date/date';
import { timeFilter } from '../time/time';

export const dateTimeFilter: (date: Date, short?: boolean) => string = (date, short) => {
    const params: any = {
        date: dateFilter(date, { shortMode: short }),
        time: timeFilter(date)
    };
    return Vue.prototype.$i18n.translate(short ? 'f-m-date-time:short' : 'f-m-date-time:long', params, 0, '', true, FormatMode.Vsprintf);
};

export class DateTimeFilter {
    static formatDateTime(date: Date, filterParams?: DateFilterParams): string {
        const params: any = {
            date: dateFilter(date, filterParams),
            time: timeFilter(date)
        };
        const shortMode: boolean = !!(filterParams && filterParams.shortMode);
        return Vue.prototype.$i18n.translate(shortMode ? 'f-m-date-time:short' : 'f-m-date-time:long', params, 0, '', true, FormatMode.Vsprintf);
    }
}
