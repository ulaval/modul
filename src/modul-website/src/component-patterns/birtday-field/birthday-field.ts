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

    // Keep month values 1 base index instead of zero as conversion is done in DateSelectorFieldGroup.
    public monthValuesAndNames = [
        { 'value': 1, 'name': 'January' },
        { 'value': 2, 'name': 'February' },
        { 'value': 3, 'name': 'March' },
        { 'value': 4, 'name': 'April' },
        { 'value': 5, 'name': 'May' },
        { 'value': 6, 'name': 'June' },
        { 'value': 7, 'name': 'July' },
        { 'value': 8, 'name': 'August' },
        { 'value': 9, 'name': 'September' },
        { 'value': 10, 'name': 'October' },
        { 'value': 11, 'name': 'November' },
        { 'value': 12, 'name': 'December' }
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

    public hasMetConditionsToShowError(): boolean {
        return this.firstEditContextDetector.hasMetAllCondition() || this.formGroup.hasSubmittedForm;
    }

    public hasDayError(): boolean {
        return this.dayField.hasError() && this.hasMetConditionsToShowError();
    }

    public hasYearError(): boolean {
        return this.yearField.hasError() && this.hasMetConditionsToShowError();
    }

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

    public onBlurDay(): void {
        this.firstEditContextDetector.exitedDayField = true;
    }

    public onBlurYear(): void {
        this.firstEditContextDetector.exitedYearField = true;
    }
}
