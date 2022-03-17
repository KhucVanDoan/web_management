import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const phoneSchema = (t) =>
  Yup.string()
    .matches(/^[0-9]+$/, {
      message: t('general:form.validPhone'),
      excludeEmptyString: true,
    })
    .min(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      t('general:form.minLength', {
        min: TEXTFIELD_REQUIRED_LENGTH.PHONE.MIN,
      }),
    )
    .max(
      TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.PHONE.MAX,
      }),
    )

export const codeSchema = (t) =>
  Yup.string()
    .required(t('general:form.required'))
    .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, {
      message: t('general:form.validCode'),
    })

export const numberSchema = (t) =>
  Yup.number()
    .min(
      NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MIN,
      t('general:form.minNumber', {
        min: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MIN,
      }),
    )
    .max(
      NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
      t('general:form.maxNumber', {
        max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
      }),
    )
