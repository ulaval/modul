import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Enums } from '../../../../utils/enums/enums';
import { KeyCode } from '../../../../utils/keycode/keycode';
import uuid from '../../../../utils/uuid/uuid';
import { MIconButton } from '../../../icon-button/icon-button';
import { MLink, MLinkMode } from '../../../link/link';
import { MCalendarButton } from '../../calendar-button/calendar-button';
import { RangeDate } from '../../calendar-state/state/abstract-calendar-state';
import { CalendarType, DayState, MonthState, YearState } from '../../calendar-state/state/calendar-state';
import ModulDate, { DatePrecision } from './../../../../utils/modul-date/modul-date';
import { MAbstractCalendarRenderer } from './../abstract-calendar-renderer';
import WithRender from './base-calendar.html';
import './base-calendar.scss';

const TRANSLATION_ROOT: string = 'm-calendar' + ':';
const TRANSLATION_MONTHS: string = TRANSLATION_ROOT + 'month';
const TRANSLATION_WEEKDAYS: string = TRANSLATION_ROOT + 'weekday';
const TRANSLATION_SUFFIXE: string = '.short';

enum MonthsNames {
    JANUARY = 'january',
    FEBRUARY = 'february',
    MARCH = 'march',
    APRIL = 'april',
    MAY = 'may',
    JUNE = 'june',
    JULY = 'july',
    AUGUST = 'august',
    SEPTEMBER = 'september',
    OCTOBER = 'october',
    NOVEMBER = 'november',
    DECEMBER = 'december'
}

enum WeekdayNames {
    SUNDAY = 'sunday',
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday'
}

export enum MBaseCalendarView {
    DAYS = 'days',
    YEARS_MONTHS = 'years-months'
}

export enum MBaseCalendarType {
    FULL_DATE = 'full-date',
    YEARS_MONTHS = 'years-months'
}

@WithRender
@Component({
    components: {
        MLink,
        MIconButton,
        MCalendarButton
    }
})
export default class MBaseCalendar extends MAbstractCalendarRenderer {
    @Prop({
        default: MBaseCalendarView.DAYS,
        validator: value => Enums.toValueArray(MBaseCalendarView).includes(value)
    })
    public readonly initialView: MBaseCalendarView;

    @Prop({ default: true })
    public readonly showMonthBeforeAfter: boolean;

    @Prop({
        default: () => {
            return Object.keys(MonthsNames).map((key: string) => {
                return Vue.prototype.$i18n.translate(
                    `${TRANSLATION_MONTHS}.${MonthsNames[key]}${TRANSLATION_SUFFIXE}`
                );
            });
        }
    })
    public readonly monthsNames: string[];

    @Prop({
        default: () => {
            return Object.keys(MonthsNames).map((key: string) => {
                return Vue.prototype.$i18n.translate(
                    `${TRANSLATION_MONTHS}.${MonthsNames[key]}`
                );
            });
        }
    })
    public readonly monthsNamesLong: string[];

    @Prop({
        default: () => {
            return Object.keys(WeekdayNames).map((key: string) => {
                return Vue.prototype.$i18n.translate(
                    `${TRANSLATION_WEEKDAYS}.${WeekdayNames[key]}${TRANSLATION_SUFFIXE}`
                );
            });
        }
    })
    public readonly daysNames: string[];

    @Prop({
        default: MBaseCalendarType.FULL_DATE,
        validator: value => Enums.toValueArray(MBaseCalendarType).includes(value)
    })
    public readonly type: MBaseCalendarType;

    @Prop({ default: true })
    public readonly visible: boolean;

    public mBaseCalendarView = MBaseCalendarView;
    public previousMonthLabel: string = this.$i18n.translate('m-calendar:previous.month');
    public nextMonthLabel: string = this.$i18n.translate('m-calendar:next.month');
    public previousYearLabel: string = this.$i18n.translate('m-calendar:previous.year');
    public nextYearLabel: string = this.$i18n.translate('m-calendar:next.year');
    public id: string = `m-simple-calendar-${uuid.generate()}`;

    public $refs: {
        body: HTMLElement;
        yearsMonthsView: HTMLElement;
    };

    public modeLinkCurrentMonthAndYear: MLinkMode = MLinkMode.Button;
    public animReady: boolean = false;
    private internalCurrentView: MBaseCalendarView = MBaseCalendarView.DAYS;

    @Watch('visible', { immediate: true })
    public visibleChanged(visible: boolean): void {
        const isInYearView: boolean = this.isTypeYearsMonths || this.initialView === MBaseCalendarView.YEARS_MONTHS;

        if (visible && isInYearView) {
            this.scrollToCurrentYear();
        }
    }

    protected created(): void {
        this.currentView = this.initialView; // Set currentView value in created() to hide animation when the component is diplayed for the firt time
    }

    public onToogleView(): void {
        this.currentView === MBaseCalendarView.DAYS ? this.currentView = MBaseCalendarView.YEARS_MONTHS : this.currentView = MBaseCalendarView.DAYS;
    }

    public onYearMonthSelect(year: YearState, month: MonthState): void {
        if (!month.isDisabled) {
            month.isCurrent = true;

            if (this.isTypeYearsMonths) {
                super.onYearMonthSelect(year, month);
            } else {
                super.onYearSelect(year);
                super.onMonthSelect(month);

                // Delay to show the user selection
                setTimeout(() => {
                    this.currentView = MBaseCalendarView.DAYS;
                }, 300);
            }
        }
    }

    public onYearMonthSelectKeyup($event: KeyboardEvent, year: YearState, month: MonthState): void {
        // tslint:disable-next-line: deprecation
        if ($event.keyCode === KeyCode.M_ENTER || $event.keyCode === KeyCode.M_RETURN) {
            this.onYearMonthSelect(year, month);
        }
    }

    public onYearNext(event: Event): void {
        super.onYearNext(event);
    }

    public onYearPrevious(event: Event): void {
        super.onYearPrevious(event);
    }

    public onMonthNext(event: Event): void {
        super.onMonthNext(event);
    }

    public onMonthPrevious(event: Event): void {
        super.onMonthPrevious(event);
    }

    public onDaySelect(day: DayState): void {
        super.onDaySelect(day);
    }

    public onDayMouseEnter(day: DayState): void {
        super.onDayMouseEnter(day);
    }

    public onKeyUp($event: KeyboardEvent, day: DayState): void {
        // tslint:disable-next-line: deprecation
        if ($event.keyCode === KeyCode.M_ENTER || $event.keyCode === KeyCode.M_RETURN) {
            super.onDaySelect(day);
        }
        // tslint:disable-next-line: deprecation
        if ($event.keyCode === KeyCode.M_TAB) {
            super.onDayKeyboardTab(day);
        }
    }

    public onDayMouseLeave(day: DayState): void {
        super.onDayMouseLeave(day);
    }

    public isDateInFuture(day: DayState): boolean {
        return !!this.calendar.type && this.calendar.type === CalendarType.DATE_RANGE
            && !!this.calendar.value && !!(this.calendar.value as RangeDate).begin
            && day.date.isAfter(new ModulDate((this.calendar.value as RangeDate).begin));
    }

    public isInsideRange(day: DayState): boolean {
        return !!this.calendar.type && this.calendar.type === CalendarType.DATE_RANGE
            && !!this.calendar.value && !!(this.calendar.value as RangeDate).begin
            && !!this.calendar.value && !!(this.calendar.value as RangeDate).end
            && day.isHighlighted;
    }

    public isSelectionStart(day: DayState): boolean {
        return day.isSelectionStart && !this.hideDay(day);
    }

    public isSelectionEnd(day: DayState): boolean {
        return day.isSelectionEnd && !this.hideDay(day);
    }

    public hideDay(day: DayState): boolean {
        return (day.isInNextMonth || day.isInPreviousMonth) && !this.showMonthBeforeAfter;
    }

    public buildRef(refPrefix: MBaseCalendarView, year: number, month: number, day?: number): string {
        let refName: string = `${refPrefix}-${this.padString(year, 4)}-${this.padString(month, 2)}`;
        if (refPrefix === MBaseCalendarView.DAYS) {
            return `${refName}-${this.padString(day, 2)}`;
        }
        return refName;
    }

    public monthIndexToShortName(index: number): string {
        return this.monthsNames[index];
    }

    public scrollToCurrentYear(): void {
        this.$nextTick(() => {
            let yearsMonthsViewEl: HTMLElement = this.$refs.yearsMonthsView;
            const spacingBeforeCurrentYear: number = 16;
            if (yearsMonthsViewEl) {
                yearsMonthsViewEl.scrollTop = (yearsMonthsViewEl.querySelector('[data-current-year="true"]') as HTMLElement).offsetTop - spacingBeforeCurrentYear || 0;
            }
        });
    }

    public set currentView(view: MBaseCalendarView) {
        if (this.isTypeYearsMonths) {
            this.internalCurrentView = MBaseCalendarView.YEARS_MONTHS;
        } else {
            this.internalCurrentView = view;
        }
    }

    public get currentView(): MBaseCalendarView {
        return this.internalCurrentView;
    }

    public get isTypeYearsMonths(): boolean {
        return this.type === MBaseCalendarType.YEARS_MONTHS;
    }

    public get currentYear(): number {
        return this.calendar.dates.current.fullYear();
    }

    public get currentMonth(): number {
        return this.calendar.dates.current.month();
    }

    public get currentMonthName(): string {
        return this.monthsNamesLong[this.currentMonth];
    }

    public get weekdaysLabels(): string[] {
        return this.daysNames;
    }

    public get years(): {} {
        return this.calendar.years;
    }

    public get yearsMonths(): {} {
        return this.calendar.yearsMonths;
    }

    public get months(): {} {
        return this.calendar.months;
    }

    public get days(): {} {
        return this.calendar.days;
    }

    public get isYearsMonthsView(): boolean {
        return this.currentView === MBaseCalendarView.YEARS_MONTHS;
    }

    public get isDaysView(): boolean {
        return this.currentView === MBaseCalendarView.DAYS;
    }

    public get isMinYear(): boolean {
        return this.currentYear === Math.min(...this.calendar.years.map((year: YearState) => year.year));
    }

    public get isMaxYear(): boolean {
        return this.currentYear === Math.max(...this.calendar.years.map((year: YearState) => year.year));
    }

    public get isMinMonth(): boolean {
        return this.calendar.dates.current.isSameOrBefore(this.calendar.dates.min, DatePrecision.MONTH);
    }

    public get isMaxMonth(): boolean {
        return this.calendar.dates.current.isSameOrAfter(this.calendar.dates.max, DatePrecision.MONTH);
    }

    public get isMaxRow(): boolean {
        if (this.isTypeYearsMonths) {
            return false;
        }
        let numberOfDays: number = this.calendar.days.length;
        return numberOfDays / 7 > 5 ? true : false;
    }

    public get isButtonToogleViewDisabled(): boolean {
        return this.isMinMonth && this.isMaxYear || this.isTypeYearsMonths;
    }

    private padString(value: any, length: number = 2): string {
        return ('000' + value).slice(-1 * length);
    }
}
