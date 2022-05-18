import * as Yup from 'yup'

import {
  NUMBER_FIELD_REQUIRED_SIZE,
  TEXTFIELD_REQUIRED_LENGTH,
} from '~/common/constants'

export const validationSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    requestBuyMaterialCode: Yup.string().required(t('general:form.required')),
    purchasedAt: Yup.date().nullable().required(t('general:form.required')),
    vendorId: Yup.object().nullable().required(t('general:form.required')),
    companyId: Yup.object().nullable().required(t('general:form.required')),
    deadline: Yup.date()
      .nullable()
      .required(t('general:form.required'))
      .min(new Date(), t('general:date.minToday')),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().nullable().required(t('general:form.required')),
        quantity: Yup.number()
          .required(t('general:form.required'))
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.PO_QUANTITY.MAX,
            }),
          ),
      }),
    ),
  })
}