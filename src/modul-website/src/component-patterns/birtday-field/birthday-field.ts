import { AbstractControl } from '@ulaval/modul-components/dist/utils/form/abstract-control';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import BirthdayFieldFirstEditContextDetector from './birthday-field-first-edit-context-detector';
import BirthdayFieldFormGroup from './birthday-field-form-group';
import WithRender from './birthday-field.html?style=./birthday-field.scss';

@WithRender
@Component({})
export default class BirthdayField extends Vue {
    @Prop({ required: true })
    public fieldGroup: BirthdayFieldFormGroup;

    @Prop({ required: true })
    public label: string;

    @Watch('dayField.value')
    public watchDayValue(): void {
        this.firstEditContextDetector.setFirstDayValue = true;
    }

    @Watch('monthField.value')
    public watchMonthValue(): void {
        this.firstEditContextDetector.setFirstMonthValue = true;
    }

    @Watch('yearField.value')
    public watchYearValue(): void {
        this.firstEditContextDetector.setFirstYearValue = true;
    }

    // Keep month values 1 base index instead of zero as conversion is done in DateSelectorFieldGroup.
    public months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    public firstEditContextDetector = new BirthdayFieldFirstEditContextDetector();

    public get yearField(): AbstractControl<number> {
        return this.fieldGroup.yearField;
    }

    public get monthField(): AbstractControl<number> {
        return this.fieldGroup.monthField;
    }

    public get dayField(): AbstractControl<number> {
        return this.fieldGroup.dayField;
    }

    public get formGroup(): BirthdayFieldFormGroup {
        return this.fieldGroup;
    }

    public get monthSelectionName(): string | null {
        if (!this.monthField.value) {
            return null;
        }

        return this.months[this.monthField.value - 1];
    }

    public hasMetConditionsToShowError(): boolean {
        return this.firstEditContextDetector.hasMetAllCondition() || this.formGroup.hasSubmittedForm;
    }

    public hasDayError(): boolean {
        return this.dayField.hasError() && this.hasMetConditionsToShowError();
    }

    public hasYearError(): boolean {
        return this.yearField.hasError() && this.hasMetConditionsToShowError();
    }

    public onBlurDay(): void {
        this.firstEditContextDetector.exitedDayField = true;
    }

    public onBlurYear(): void {
        this.firstEditContextDetector.exitedYearField = true;
    }

    public onSelectItem(month: string): void {
        this.monthField.value = this.months.indexOf(month) + 1;
    }

}
