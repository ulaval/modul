export default class BirthdayFieldFirstEditContextDetector {
    public setFirstDayValue: boolean = false;
    public setFirstMonthValue: boolean = false;
    public setFirstYearValue: boolean = false;

    public exitedDayField: boolean = false;
    public exitedYearField: boolean = false;

    hasMetAllCondition(): boolean {
        return this.setFirstDayValue &&
            this.setFirstMonthValue &&
            this.setFirstYearValue &&
            this.exitedDayField &&
            this.exitedYearField;
    }
}
