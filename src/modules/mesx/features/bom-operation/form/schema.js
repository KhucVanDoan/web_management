import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    product: Yup.object()
      .shape({
        itemCode: Yup.string().required(t('general:form.required')),
      })
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    items: Yup.array().of(
      Yup.object().shape({
        producingStepData: Yup.array().of(
          Yup.object().shape({
            quantity: Yup.number()
              .required(t('general:form.required'))
              .min(
                NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                t('general:form.minNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
                }),
              ),
          }),
        ),
      }),
    ),
  })
