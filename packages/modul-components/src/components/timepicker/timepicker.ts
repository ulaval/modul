import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Model, Prop, Watch } from 'vue-property-decorator';
import { MPopupDirective } from '../../directives/popup/popup';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputState } from '../../mixins/input-state/input-state';
import { InputMaxWidth, InputWidth } from '../../mixins/input-width/input-width';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { FormatMode } from '../../utils/i18n/i18n';
import { KeyCode } from '../../utils/keycode/keycode';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { MCalendarButton } from '../calendar/calendar-button/calendar-button';
import { TIMEPICKER_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { InternalCleaveOptions, MInputMask } from '../input-mask/input-mask';
import { MInputStyle } from '../input-style/input-style';
import { MLink } from '../link/link';
import { MPopup } from '../popup/popup';
import { MValidationMessage } from '../validation-message/validation-message';
import { POPUP_NAME as DIRECTIVE_POPUP_NAME } from './../../directives/directive-names';
import { InputManagement } from './../../mixins/input-management/input-management';
import WithRender from './timepicker.html?style=./timepicker.scss';

const MAXIMUM_HOURS: number = 23;
const MAXIMUM_MINUTES: number = 59;
const MINUTE_SECONDS: number = 60;

export interface TimeObject {
    hour: number;
    minute: number;
    seconde?: number;
}

const validateTimeString = (value: string): boolean => {
    const regex: RegExp = /(\d\d):(\d\d)/g;
    return !(value || '').length || value.match(regex) ? true : false;
}

@WithRender
@Component({
    components: {
        MPopup,
        MIconButton,
        MValidationMessage,
        MLink,
        MInputStyle,
        MInputMask,
        MCalendarButton
    },
    directives: {
        [DIRECTIVE_POPUP_NAME]: MPopupDirective
    },
    mixins: [
        InputState,
        InputManagement,
        InputWidth,
        InputLabel,
        MediaQueries
    ]
})
export class MTimepicker extends ModulVue {
    @Model('change')
    @Prop({ default: '' })
    public readonly value: string;

    @Prop({ default: '00:00' })
    public readonly min: string;

    @Prop({ default: '23:59' })
    public readonly max: string;

    @Prop({ default: 5 })
    public readonly step: number;

    @Prop({ default: InputMaxWidth.Small })
    public readonly maxWidth: string;

    @Prop({ default: false })
    public readonly hideInternalErrorMessage: boolean;

    @Prop({ default: false })
    public readonly skipInputValidation: boolean;

    @Prop({ default: () => `mTimepicker-${uuid.generate()}` })
    public readonly id: string;

    public readonly validationMessageId: string = uuid.generate();
    public open: boolean = false;

    public $refs: {
        input: MInputMask;
        hours: HTMLElement
        minutes: HTMLElement;
    };

    public i18nButton: string = this.$i18n.translate('m-timepicker:button-ok');
    public i18nPlaceHolder: string = this.$i18n.translate('m-timepicker:placeholder');
    public i18nOutOfBoundsError: string = this.$i18n.translate('m-timepicker:out-of-bounds-error', { min: this.min, max: this.max }, undefined, undefined, undefined, FormatMode.Sprintf);

    private hours: number[] = [];
    private minutes: number[] = [];
    private internalTime: string = '';
    private internalHour: number = NaN;
    private internalMinute: number = NaN;
    private internalFilteredMinutes: number[] = [];
    private internalFilteredHours: number[] = [];
    private isMousedown: boolean = false;
    private scrollTimeout;

    private internalTimeErrorMessage: string = '';

    public get currentTime(): string {
        return this.internalTime;
    }

    public set currentTime(value: string) {
        const hourParts: string[] = (value || '').split(':');
        const newValue: string = hourParts.length > 1 ? `${hourParts[0]}:${hourParts[1]}` : '';

        const oldTime: string = this.internalTime;

        // When the user type in something we close de popup.
        this.open = false;

        if (this.value && this.skipInputValidation) {
            this.internalTime = this.getFormatTime(newValue);
        } else if (this.value && this.validateTime(value) && validateTimeString(value)) {
            this.updatePopupTime(newValue);
            if (newValue !== oldTime) {
                this.internalTime = this.getFormatTime(newValue);
            }
        } else {
            this.resetPopupTime();
            this.internalTime = newValue;
        }
    }

    public get currentHour(): number {
        return this.internalHour;
    }

    public get currentMinute(): number {
        return this.internalMinute;
    }

    public get currentfilteredHours(): number[] {
        return this.internalFilteredHours = this.hours.filter(x => (x >= this.timeStringToNumber(this.min).hour) && (x <= this.timeStringToNumber(this.max).hour));
    }

    public get currentFilteredMinutes(): number[] {
        return this.internalFilteredMinutes.filter(x => (x % this.step === 0));
    }

    public get currentStep(): number {
        return this.step * MINUTE_SECONDS;
    }

    public get timeError(): boolean {
        return this.internalTimeErrorMessage !== '' || this.as<InputState>().hasError;
    }

    private get timeErrorMessage(): string {
        if (this.hideInternalErrorMessage) {
            return '';
        }

        return this.internalTimeErrorMessage || this.as<InputState>().errorMessage;
    }

    public get inputMaskOptions(): InternalCleaveOptions {
        return {
            time: true,
            timePattern: ['h', 'm']
        };
    }

    @Emit('change')
    public emitChange(_time: string): void { }

    @Emit('click')
    public emitClick(_event: Event): void { }

    @Emit('open')
    public emitOpen(): void { }

    @Emit('close')
    public emitClose(): void { }

    @Watch('value')
    public updateInternalTime(value: string): void {
        this.internalTime = this.getFormatTime(value);
    }

    public togglePopup(event: Event): void {
        if (this.as<InputState>().active) {
            this.open = !this.open;

        }
        // stop event propagation to parent.
        event.stopPropagation();
    }

    // override from InputManagement
    public onClick(event: MouseEvent): void {
        this.as<InputManagement>().internalIsFocus = this.as<InputState>().active;
        if (this.as<InputManagement>().internalIsFocus) {
            this.as<InputManagement>().focusInput();
        }
        this.emitClick(event);
    }

    public onScroll(event: Event): void {
        if (this.isMousedown) { return; }

        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {

            // tslint:disable-next-line: deprecation
            if (event.srcElement) {
                // tslint:disable-next-line: deprecation
                this.setPositionScroll((event as any).srcElement);
            }
        }, 300);

    }

    public onSelectHour(hour: number): void {
        this.internalHour = hour;

        // change available minutes in function of min/max value
        if (hour === this.timeStringToNumber(this.min).hour) {
            this.internalFilteredMinutes = this.minutes.filter(x => (x >= this.timeStringToNumber(this.min).minute));
        } else if (hour === this.timeStringToNumber(this.max).hour) {
            this.internalFilteredMinutes = this.minutes.filter(x => (x <= this.timeStringToNumber(this.max).minute));
        } else {
            this.internalFilteredMinutes = this.minutes;
        }
    }

    public onSelectHourKeyup($event: KeyboardEvent, hour: number): void {
        // tslint:disable-next-line: deprecation
        if ($event.keyCode === KeyCode.M_ENTER || $event.keyCode === KeyCode.M_RETURN) {
            this.onSelectHour(hour);
        }
    }

    public onSelectMinute(minute: number): void {
        this.internalMinute = minute;

        if (isNaN(this.internalHour)) { return; }

        this.emitChange(this.formatTimeString());
        this.open = false;
        this.as<InputManagement>().focusInput();
    }

    public onSelectMinuteKeyup(event: KeyboardEvent, minute: number): void {
        // tslint:disable-next-line: deprecation
        if (event.keyCode === KeyCode.M_ENTER || event.keyCode === KeyCode.M_RETURN) {
            this.onSelectMinute(minute);
        }
    }

    public onMousedown(event: Event): void {
        this.isMousedown = true;
    }

    public onMouseup(event: Event): void {
        this.isMousedown = false;
        // tslint:disable-next-line: deprecation
        if (event.srcElement) {
            // tslint:disable-next-line: deprecation
            this.setPositionScroll((event as any).srcElement);
        }
    }

    public onOk(): void {
        if (!isNaN(this.internalHour) && !isNaN(this.internalMinute)) {
            this.emitChange(this.formatTimeString())
        }
        this.open = false;
        this.as<InputManagement>().focusInput();
    }

    public onOpen(): void {
        this.as<InputManagement>().focusInput();
        requestAnimationFrame(() => {
            this.scrollToSelection(this.$refs.hours);
            this.scrollToSelection(this.$refs.minutes);
        })
        this.emitOpen();
    }

    public onClose(): void {
        if (isNaN(this.internalHour) || isNaN(this.internalMinute)) {
            this.resetPopupTime();
        } else {
            this.updatePopupTime(this.internalTime);
        }

        this.emitClose();
    }

    protected created(): void {
        this.internalTime = this.getFormatTime(this.value);
        this.updatePopupTime(this.internalTime);
    }

    protected mounted(): void {
        // create hours
        for (let i: number = -1; i < MAXIMUM_HOURS; i++) {
            this.hours.push(i + 1);
        }

        // create minutes
        for (let i: number = -1; i < MAXIMUM_MINUTES; i++) {
            this.minutes.push(i + 1);
        }

        this.internalFilteredMinutes = this.minutes;
    }

    private updatePopupTime(value: string): void {
        if (value) {
            this.internalHour = this.timeStringToNumber(value).hour;
            this.internalMinute = this.timeStringToNumber(value).minute;
        } else {
            this.resetPopupTime();
        }
    }

    private resetPopupTime(): void {
        this.internalHour = NaN;
        this.internalMinute = NaN;
    }

    private getFormatTime(time: string): string {
        if (!time) { return ''; }

        const hourParts: string[] = time.split(':');
        return hourParts.length > 1 ? `${hourParts[0]}:${hourParts[1]}` : '';
    }

    private timeStringToNumber(value: string): TimeObject {
        const timeString: string[] = value.split(':');
        const timeObject: TimeObject = {
            hour: parseInt(timeString[0], 10),
            minute: parseInt(timeString[1], 10)
        };

        return timeObject;
    }

    private validateTime(value: string): boolean {
        this.internalTimeErrorMessage = '';
        if (!this.skipInputValidation && validateTimeString(value)) {
            if (this.validateTimeRange(value)) {
                this.internalTimeErrorMessage = '';
                return true;
            } else {
                this.internalTimeErrorMessage = this.i18nOutOfBoundsError;
                return false;
            }
        }

        return true;
    }

    private validateTimeRange(value: string): boolean {
        return !value.length || (this.validateHour(value) && this.validateMinute(value));
    }

    private validateHour(value: string): boolean {
        return this.timeStringToNumber(value).hour >= this.timeStringToNumber(this.min).hour &&
            this.timeStringToNumber(value).hour <= this.timeStringToNumber(this.max).hour;
    }

    private validateMinute(value: string): boolean {
        const time = this.timeStringToNumber(value);
        const timeMin = this.timeStringToNumber(this.min);
        const timeMax = this.timeStringToNumber(this.max);
        if (time.hour === timeMin.hour) {
            return time.minute >= timeMin.minute;
        } else if (time.hour === timeMax.hour) {
            return time.minute <= timeMax.minute;
        }
        return true;
    }

    private formatTimeString(): string {
        return this.formatNumber(this.internalHour) + ':' + this.formatNumber(this.internalMinute);
    }

    private formatNumber(value: number): string {
        return value < 10 ? '0' + value : value.toString();
    }

    private scrollToSelection(container: HTMLElement): void {
        const selectedElement: Element | null = container.querySelector('.m--is-selected');
        setTimeout(function(): void {
            if (selectedElement) {
                container.scrollTop = selectedElement['offsetTop'] - container.clientHeight / 2 + selectedElement.clientHeight / 2;
            }
        }, 10);
    }

    private setPositionScroll(el: HTMLElement): void {
        el.scrollTop = Math.round(el.scrollTop / 44) * 44;
    }
}

const TimepickerPlugin: PluginObject<any> = {
    install(v): void {
        v.use(MediaQueriesPlugin);
        v.component(TIMEPICKER_NAME, MTimepicker);
    }
};

export default TimepickerPlugin;
