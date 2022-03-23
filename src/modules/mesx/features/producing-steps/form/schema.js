import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .matches(/^[0-9A-Za-z]+$/, t('general:form.special')),
    name: Yup.string().required(t('general:form.required')),
    qcQuantityRule: Yup.number()
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
      ),
    productionTimePerItem: Yup.number()

      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
        }),
      )
      .required(t('general:form.required')),
    timeQcInput: Yup.number()

      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .nullable(),
    timeQcOutput: Yup.number()

      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      )
      .nullable(),
    switchMode: Yup.bool().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
