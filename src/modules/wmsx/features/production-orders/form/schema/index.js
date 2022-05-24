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
    type: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
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
}
