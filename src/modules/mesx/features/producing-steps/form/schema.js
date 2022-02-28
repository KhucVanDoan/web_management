import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      )
      .matches(/^[0-9A-Za-z]+$/, t('general:form.validCode')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    qcQuantityRule: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      ),
    productionTimePerItem: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      ),
    timeQcInput: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      ),
    timeQcOutput: Yup.number()
      .nullable()
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        }),
      ),
    workCenterId: Yup.string().nullable().required(t('general:form.required')),
    switchMode: Yup.bool().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
