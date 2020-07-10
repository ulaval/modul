import CalendarPlugin from '@ulaval/modul-components/dist/components/calendar/calendar';
import { RangeDate } from '@ulaval/modul-components/dist/components/calendar/calendar-state/state/abstract-calendar-state';
import { CALENDAR_NAME } from '@ulaval/modul-components/dist/components/component-names';
import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './calendar.sandbox.html';

@WithRender
@Component
export class MCalendarSandbox extends Vue {
    date: string = '';
    dateRange: RangeDate = {};
}

const CalendarSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(CalendarPlugin);
        v.component(`${CALENDAR_NAME}-sandbox`, MCalendarSandbox);
    }
};

export default CalendarSandboxPlugin;
