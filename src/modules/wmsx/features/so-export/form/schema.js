import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    soCode: Yup.object().nullable().required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    deliveredAt: Yup.date().nullable().required(t('general:form.required')),
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
        lotNumber: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
  })
}
