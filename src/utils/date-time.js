import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { format } from 'date-fns'
import { enUS, ja, vi } from 'date-fns/locale'

import {
  DATE_TIME_FORMAT_BY_LANG,
  DEFAULT_LANG,
  DATE_FORMAT_BY_LANG,
  LANG_OPTIONS,
} from '~/common/constants'

import i18n from './i18n'

export const getDateLocal = (locale) => {
  switch (locale) {
    case LANG_OPTIONS.JP:
      return ja
    case LANG_OPTIONS.VI:
      return vi
    case LANG_OPTIONS.EN:
    default:
      return enUS
  }
}
/**
 * Convert date (string or Date) into string with input format
 * @param {Date|String} dateTime
 * @param {String} formatPattern
 * @return {String}
 */

export const convertUtcDateTimeToLocalTz = (dateTime, formatPattern) => {
  const currLang = i18n.language || DEFAULT_LANG
  const currFormat = formatPattern || DATE_TIME_FORMAT_BY_LANG[currLang]
  return dateTime
    ? format(new Date(dateTime), currFormat, { locale: getDateLocal(currLang) })
    : ''
}

export const convertUtcDateToLocalTz = (date, formatPattern) => {
  const currLang = i18n.language || DEFAULT_LANG
  const currFormat = formatPattern || DATE_FORMAT_BY_LANG[currLang]
  return date
    ? format(new Date(date), currFormat, { locale: getDateLocal(currLang) })
    : ''
}

export class DateFns extends AdapterDateFns {
  getWeekdays = () =>
    ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => ({
      charAt: () => day,
    }))
}
