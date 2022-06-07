import * as Yup from 'yup'

import {
  TEXTFIELD_REQUIRED_LENGTH,
  NUMBER_FIELD_REQUIRED_SIZE,
} from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    routingId: Yup.object().nullable().required(t('general:form.required')),
    itemId: Yup.object().nullable().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    items: Yup.array().of(
      Yup.object().shape({
        itemType: Yup.number().nullable().required(t('general:form.required')),
        itemId: Yup.number().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MAX,
            }),
          ),
      }),
    ),
  })
