import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    timePlan: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    fatoryIds: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
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
