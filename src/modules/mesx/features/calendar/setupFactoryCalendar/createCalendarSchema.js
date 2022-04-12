import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const createCalendarSchema = (t) =>
  Yup.object().shape({
    timePlan: Yup.array()
      .nullable(true)
      .test({
        message: t('general:form.required'),
        test: (arr) => Array.isArray(arr) && !isEmpty(arr),
      }),
    fatoryIds: Yup.array()
      .nullable(true)
      .test({
        message: t('general:form.required'),
        test: (arr) => Array.isArray(arr) && !isEmpty(arr),
      }),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    shifts: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().nullable().required(t('general:form.required')),
        from: Yup.string().nullable().required(t('general:form.required')),
        to: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
    breakTimes: Yup.array().of(
      Yup.object().shape({
        title: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
  })
