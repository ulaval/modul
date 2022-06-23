import { PluginObject } from 'vue';
import { Component, Emit, Prop, Watch } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { CALENDAR_NAME } from '../component-names';
import MBaseCalendar, { MBaseCalendarType, MBaseCalendarView } from './calendar-renderer/base-calendar/base-calendar';
import MCalendarStateMachine from './calendar-state/calendar-state-machine';
import { RangeDate, SingleDate } from './calendar-state/state/abstract-calendar-state';
import WithRender from './calendar.html?style=./calendar.scss';

export enum CalendarMode {
    SINGLE_DATE = 'single-date',
    DATE_RANGE = 'date-range'
}

export enum MCalendarType {
    FullDate = 'full-date',
    YearsMonths = 'years-months'
}

@WithRender
@Component({
    components: {
        MCalendarStateMachine,
        MBaseCalendar
    }
})
export class MCalendar extends ModulVue {

    @Prop({ default: '' })
    public readonly value: SingleDate | RangeDate;

    @Prop({ default: CalendarMode.SINGLE_DATE })
    public readonly mode: CalendarMode;

    @Prop({
        default: MBaseCalendarType.FULL_DATE,
        validator: value => Enums.toValueArray(MBaseCalendarType).includes(value)
    })
    public readonly type: MBaseCalendarType;

    @Prop()
    public readonly minDate: string;

    @Prop()
    public readonly maxDate: string;

    @Prop({ default: true })
    public readonly showMonthBeforeAfter: string;

    @Prop({ default: true })
    public readonly visible: boolean;

    @Prop({
        default: MBaseCalendarView.DAYS,
        validator: value => Enums.toValueArray(MBaseCalendarView).includes(value)
    })
    public readonly initialView: MBaseCalendarView;

    public innerValue: SingleDate | RangeDate = this.value;
    public id: string = `m-calendar-${uuid.generate()}`;

    @Watch('value')
    public refreshValue(): void {
        this.validateInputModel();
        this.innerValue = this.value;
    }

    protected created(): void {
        this.validateInputModel();
    }

    @Emit('input')
    public onInput(): SingleDate | RangeDate {
        return this.innerValue;
    }

    public get isSingleDate(): boolean {
        return this.mode === CalendarMode.SINGLE_DATE;
    }

    public get isDateRange(): boolean {
        return this.mode === CalendarMode.DATE_RANGE;
    }

    public validateInputModel(): void {
        switch (this.mode) {
            case CalendarMode.SINGLE_DATE:
                if (typeof this.value !== 'string') {
                    throw new Error(`In '${CalendarMode.SINGLE_DATE}' mode, the model type should be a 'string'`);
                }
                break;
            case CalendarMode.DATE_RANGE:
                if (typeof this.value !== 'object') {
                    throw new Error(`In '${CalendarMode.DATE_RANGE}' mode, the model type should be an 'object'`);
                }
                break;
        }
    }
}

const CalendarPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(CALENDAR_NAME, MCalendar);
    }
};

export default CalendarPlugin;
