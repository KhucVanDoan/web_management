import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { numberSchema } from '~/common/schemas'

export const itemSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
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
    itemType: Yup.object().required(t('general:form.required')),
    itemGroup: Yup.object().required(t('general:form.required')),
    itemUnit: Yup.object().required(t('general:form.required')),
    price: numberSchema(t),
    dayExpire: numberSchema(t),
    decription: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    long: Yup.object().shape({
      value: numberSchema(t),
    }),
    width: Yup.object().shape({
      value: numberSchema(t),
    }),
    height: Yup.object().shape({
      value: numberSchema(t),
    }),
    weight: Yup.object().shape({
      value: numberSchema(t),
    }),
    items: Yup.array().of(
      Yup.object().shape({
        quantity: numberSchema(t),
      }),
    ),
  })
