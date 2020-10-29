import Vue from 'vue';
import { addMessages } from '../../../../tests/helpers/lang';
import { PERIOD_NAME } from '../../filter-names';
import { MFormatMode, ModulPeriod, PeriodFilter } from './period';

describe(PERIOD_NAME, () => {
    beforeEach(() => {
        addMessages(Vue, [
            'filters/date/period/period.lang.en.json',
            'filters/date/date/date.lang.en.json',
            'filters/date/date-time/date-time.lang.fr.json',
            'filters/date/time/time.lang.fr.json'
        ]);
    });

    describe(`Given both dates are present`, () => {

        describe(`Given fullmode is off`, () => {
            describe(`When both start date and end date are the same day`, () => {
                it(`should return a formatted period with only one date without shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 3, 8);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');
                    endDate.toLocaleDateString = jest.fn(() => '8 avril 2019');

                    expect(PeriodFilter.formatPeriod(period)).toEqual('Le 8 avril 2019');
                });

                it(`should return a formatted period with only one date with shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 3, 8);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 sept. 2019');
                    endDate.toLocaleDateString = jest.fn(() => '8 sept. 2019');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth)).toEqual('Le 8 sept. 2019');
                });

                it(`should return a formatted period with only one date, but with 2 times with shortMonth and time params`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 0, 0, 0, 0);
                    const endDate: Date = new Date(2019, 3, 8, 23, 59, 0, 0);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 sept. 2019');
                    endDate.toLocaleDateString = jest.fn(() => '8 sept. 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth, true))
                        .toEqual(`Le 8 sept. 2019 de ${new Intl.DateTimeFormat('', {
                            hour: 'numeric'
                        }).format(startDate)} à ${new Intl.DateTimeFormat('', {
                            hour: 'numeric',
                            minute: 'numeric'
                        }).format(endDate)}`);
                });
            });

            describe(`When both start date and end date are the same month`, () => {
                it(`should return a formatted period with 2 dates, but only one year and only one month without shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 3, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8');
                    endDate.toLocaleDateString = jest.fn(() => '14 avril 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period)).toEqual('Du 8 au 14 avril 2019');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: undefined,
                        day: 'numeric'
                    });
                });

                it(`should return a formatted period with 2 dates, but only one year and only one month with shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 3, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8');
                    endDate.toLocaleDateString = jest.fn(() => '14 sept. 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth)).toEqual('Du 8 au 14 sept. 2019');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: undefined,
                        day: 'numeric'
                    });
                });

                it(`should return a formatted period with 2 dates, but only one year and only one month with time param`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 8, 0);
                    const endDate: Date = new Date(2019, 3, 14, 23, 59);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril');
                    endDate.toLocaleDateString = jest.fn(() => '14 avril 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, undefined, true)).toEqual('Du 8 avril à mock-intl-dateTimeFormat-{\"hour\":\"numeric\"}} au 14 avril 2019 à mock-intl-dateTimeFormat-{\"hour\":\"numeric\",\"minute\":\"numeric\"}}');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: 'long',
                        day: 'numeric'
                    });
                });

                it(`should return a formatted period with 2 dates, but only one year and only one month with shortMonth and time params`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 8, 0);
                    const endDate: Date = new Date(2019, 3, 14, 23, 59);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril');
                    endDate.toLocaleDateString = jest.fn(() => '14 avril 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth, true)).toEqual('Du 8 avril mock-intl-dateTimeFormat-{\"hour\":\"numeric\"}} au 14 avril 2019 mock-intl-dateTimeFormat-{\"hour\":\"numeric\",\"minute\":\"numeric\"}}');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: 'short',
                        day: 'numeric'
                    });
                });
            });

            describe(`When both start date and end date are the same year`, () => {
                it(`should return a formatted period with 2 dates, but only one year without shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 4, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril');
                    endDate.toLocaleDateString = jest.fn(() => '14 mai 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period)).toEqual('Du 8 avril au 14 mai 2019');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: 'long',
                        day: 'numeric'
                    });
                });

                it(`should return a formatted period with 2 dates, but only one year with shortMonth param`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2019, 4, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril');
                    endDate.toLocaleDateString = jest.fn(() => '14 sept. 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth)).toEqual('Du 8 avril au 14 sept. 2019');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: 'short',
                        day: 'numeric'
                    });
                });

                it(`should return a formatted period with 2 dates, but only one year with time param`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 8, 0);
                    const endDate: Date = new Date(2019, 4, 14, 23, 59);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril');
                    endDate.toLocaleDateString = jest.fn(() => '14 mai 2019');
                    jest.spyOn(Vue.prototype.$i18n, 'getCurrentLocale').mockReturnValue('fr-CA');

                    expect(PeriodFilter.formatPeriod(period, undefined, true)).toEqual('Du 8 avril à mock-intl-dateTimeFormat-{\"hour\":\"numeric\"}} au 14 mai 2019 à mock-intl-dateTimeFormat-{\"hour\":\"numeric\",\"minute\":\"numeric\"}}');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: undefined,
                        month: 'long',
                        day: 'numeric'
                    });
                });
            });

            describe(`When start date and end date have a different year without shortMonth or time param`, () => {
                it(`should return a formatted period with 2 dates`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2020, 4, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');
                    endDate.toLocaleDateString = jest.fn(() => '14 mai 2020');

                    expect(PeriodFilter.formatPeriod(period)).toEqual('Du 8 avril 2019 au 14 mai 2020');
                });
            });

            describe(`When start date and end date have a different year with time param`, () => {
                it(`should return a formatted period with 2 dates`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 8, 0);
                    const endDate: Date = new Date(2020, 4, 14, 23, 59);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');
                    endDate.toLocaleDateString = jest.fn(() => '14 mai 2020');

                    expect(PeriodFilter.formatPeriod(period, undefined, true)).toEqual('Du 8 avril 2019 à mock-intl-dateTimeFormat-{\"hour\":\"numeric\"}} au 14 mai 2020 à mock-intl-dateTimeFormat-{\"hour\":\"numeric\",\"minute\":\"numeric\"}}');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                });
            });

            describe(`When start date and end date have a different year with shortMonth but without time param`, () => {
                it(`should return a formatted period with 2 dates`, () => {
                    const startDate: Date = new Date(2019, 3, 8);
                    const endDate: Date = new Date(2020, 4, 14);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');
                    endDate.toLocaleDateString = jest.fn(() => '14 nov. 2020');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth)).toEqual('Du 8 avril 2019 au 14 nov. 2020');
                });
            });

            describe(`When start date and end date have a different year with shortMonth and time param`, () => {
                it(`should return a formatted period with 2 dates`, () => {
                    const startDate: Date = new Date(2019, 3, 8, 8, 0);
                    const endDate: Date = new Date(2020, 4, 14, 23, 59);
                    const period: ModulPeriod = {
                        start: startDate,
                        end: endDate
                    };
                    startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');
                    endDate.toLocaleDateString = jest.fn(() => '14 nov. 2020');

                    expect(PeriodFilter.formatPeriod(period, MFormatMode.ShortMonth, true)).toEqual('Du 8 avril 2019 mock-intl-dateTimeFormat-{\"hour\":\"numeric\"}} au 14 nov. 2020 mock-intl-dateTimeFormat-{\"hour\":\"numeric\",\"minute\":\"numeric\"}}');
                    expect(startDate.toLocaleDateString).toHaveBeenCalledWith(['fr-CA'], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                });
            });
        });
    });

    describe(`Given the end date is missing`, () => {
        it(`then we only show the start date`, () => {
            const startDate: Date = new Date(2019, 3, 8);
            const period: ModulPeriod = {
                start: startDate
            };
            startDate.toLocaleDateString = jest.fn(() => '8 avril 2019');

            expect(PeriodFilter.formatPeriod(period)).toEqual('Débute le 8 avril 2019');
        });
    });

    describe(`Given the start date is missing`, () => {
        it(`then we only show the end date`, () => {
            const endDate: Date = new Date(2019, 3, 8);
            const period: ModulPeriod = {
                end: endDate
            };
            endDate.toLocaleDateString = jest.fn(() => '8 avril 2019');

            expect(PeriodFilter.formatPeriod(period)).toEqual('Se termine le 8 avril 2019');
        });
    });

    describe(`Given both dates are missing`, () => {
        it(`then it throws an error`, () => {
            const period: ModulPeriod = {};

            expect(() => PeriodFilter.formatPeriod(period)).toThrow(Error);
        });
    });
});
