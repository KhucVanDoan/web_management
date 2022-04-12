import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { format } from 'date-fns'

import { DEFAULT_DATE_TIME_FORMAT } from '~/common/constants'

/**
 * Convert date (string or Date) into string with input format
 * @param {Date|String} dateTime
 * @param {String} formatPattern
 * @return {String}
 */
export const formatDateTimeUtc = (
  dateTime,
  formatPattern = DEFAULT_DATE_TIME_FORMAT,
) => {
  return dateTime ? format(new Date(dateTime), formatPattern) : ''
}

export class DateFns extends AdapterDateFns {
  getWeekdays = () =>
    ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => ({
      charAt: () => day,
    }))
}
