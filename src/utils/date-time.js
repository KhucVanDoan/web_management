import { format, isAfter } from 'date-fns'

import { DEFAULT_DATE_TIME_FORMAT } from '~/common/constants'

/**
 * Convert date (string or Date) into string with input format
 * @param {Date|String} dateTime
 * @param {String} formatPattern default yyyy-MM-dd hh:mm
 * @return {String}
 */
export const formatDateTimeUtc = (
  dateTime,
  formatPattern = DEFAULT_DATE_TIME_FORMAT,
) => {
  return dateTime ? format(new Date(dateTime), formatPattern) : ''
}

/**
 * Check if date range is valid
 * @param {*} from
 * @param {*} to
 * @returns {boolean}
 */
export const isValidDateRange = (from, to) => {
  return from && to && !isAfter(to, from)
}
