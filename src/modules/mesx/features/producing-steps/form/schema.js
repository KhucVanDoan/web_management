import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'
import { codeSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: codeSchema(t).required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
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
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MIN,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_100K.MAX,
        }),
      ),
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
