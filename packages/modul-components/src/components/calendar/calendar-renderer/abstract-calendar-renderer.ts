import { Emit, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../../utils/vue/vue';
import { Calendar, CalendarEvent, DayState, MonthState, YearState } from '../calendar-state/state/calendar-state';

export abstract class MAbstractCalendarRenderer extends ModulVue {
    @Prop({ required: true })
    public calendar: Calendar;

    @Emit(CalendarEvent.DAY_SELECT)
    public onDaySelect(day: DayState): void {
    }

    @Emit(CalendarEvent.DAY_MOUSE_ENTER)
    public onDayMouseEnter(day: DayState): void {
    }

    @Emit(CalendarEvent.DAY_MOUSE_LEAVE)
    public onDayMouseLeave(day: DayState): void {
    }

    @Emit(CalendarEvent.DAY_KEYBOARD_TAB)
    public onDayKeyboardTab(day: DayState): void {
    }

    @Emit(CalendarEvent.MONTH_SELECT)
    public onMonthSelect(month: MonthState): void {
    }

    @Emit(CalendarEvent.MONTH_NEXT)
    public onMonthNext(event: Event): void {
    }

    @Emit(CalendarEvent.MONTH_PREVIOUS)
    public onMonthPrevious(event: Event): void {
    }

    @Emit(CalendarEvent.YEAR_SELECT)
    public onYearSelect(year: YearState): void {
    }

    @Emit(CalendarEvent.YEAR_MONTH_SELECT)
    public onYearMonthSelect(year: YearState, month: MonthState): void {
    }

    @Emit(CalendarEvent.YEAR_NEXT)
    public onYearNext(event: Event): void {
    }

    @Emit(CalendarEvent.YEAR_PREVIOUS)
    onYearPrevious(event: Event): void {
    }
}
