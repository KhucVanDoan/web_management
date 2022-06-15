import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        }),
      ),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    createdAt: Yup.array().nullable().required(t('general:form.required')),
    percentage: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.PERCENT.MAX,
        }),
      )
      .required(t('general:form.required')),
  })
}
