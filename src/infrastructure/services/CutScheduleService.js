export const CUT_FREQUENCY = {
  QUINCENAL: 'QUINCENAL',
  MENSUAL: 'MENSUAL'
};

export const CUT_STATUS = {
  UP_TO_DATE: 'UP_TO_DATE',
  PENDING: 'PENDING'
};

export default class CutScheduleService {

  static parseLocalDate(dateInput) {
    if (typeof dateInput === 'string') {
      const datePart = dateInput.split('T')[0];
      const [year, month, day] = datePart.split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    if (dateInput instanceof Date) {
      return new Date(
        dateInput.getUTCFullYear(),
        dateInput.getUTCMonth(),
        dateInput.getUTCDate()
      );
    }
    return new Date(dateInput);
  }

  static isValidCutDate(date, frequency) {
    const day = date.getDate();

    if (frequency === CUT_FREQUENCY.MENSUAL) {
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return day === lastDayOfMonth;
    }

    if (frequency === CUT_FREQUENCY.QUINCENAL) {
      const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
      return day === 15 || day === lastDayOfMonth;
    }

    return false;
  }

  static getLastDayOfMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  static generateExpectedCutDates(startDate, frequency, referenceDate) {
    const expectedDates = [];
    const start = this.parseLocalDate(startDate);

    const ref = this.parseLocalDate(referenceDate);

    const startYear = start.getFullYear();
    const startMonth = start.getMonth();

    const refYear = ref.getFullYear();
    const refMonth = ref.getMonth();

    for (let year = startYear; year <= refYear; year++) {
      const monthStart = (year === startYear) ? startMonth : 0;
      const monthEnd = (year === refYear) ? refMonth : 11;

      for (let month = monthStart; month <= monthEnd; month++) {
        const daysInMonth = this.getLastDayOfMonth(year, month);

        if (frequency === CUT_FREQUENCY.QUINCENAL) {
          const fifteenth = new Date(year, month, 15);

          if (fifteenth >= start && fifteenth <= ref) {
            expectedDates.push(new Date(fifteenth));
          }
        }

        const lastDay = new Date(year, month, daysInMonth);

        if (lastDay >= start && lastDay <= ref) {
          expectedDates.push(new Date(lastDay));
        }
      }
    }

    return expectedDates;
  }

  static getPendingCuts(startDate, frequency, existingCutDates, referenceDate) {
    const expectedDates = this.generateExpectedCutDates(startDate, frequency, referenceDate);

    const existingTimestamps = existingCutDates
      .map(d => this.parseLocalDate(d).getTime())
      .sort((a, b) => a - b);

    return expectedDates.filter(expectedDate => {
      return !existingTimestamps.some(existingTs => existingTs >= expectedDate.getTime());
    });
  }

  static calculateCutInfo(startDate, frequency, existingCutDates, referenceDate) {
    if (!frequency) {
      return {
        cut_status: CUT_STATUS.UP_TO_DATE,
        pending_cuts: [],
        pending_cuts_count: 0
      };
    }

    const pendingCuts = this.getPendingCuts(startDate, frequency, existingCutDates, referenceDate);

    return {
      cut_status: pendingCuts.length > 0 ? CUT_STATUS.PENDING : CUT_STATUS.UP_TO_DATE,
      pending_cuts: pendingCuts.map(date => ({
        date: this.formatDate(date)
      })),
      pending_cuts_count: pendingCuts.length
    };
  }

  static formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
