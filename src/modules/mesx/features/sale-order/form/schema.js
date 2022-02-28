import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const saleOrderSchema = (t) => {
  return Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_10.MAX,
        }),
      )
      .matches(/^[0-9A-Za-z]+$/, t('general:form.special')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    boqId: Yup.string().required(t('general:form.required')),
    orderedAt: Yup.date().nullable().required(t('general:form.required')),
    companyId: Yup.string().required(t('general:form.required')),
    customerId: Yup.string().required(t('general:form.required')),
    deadline: Yup.date()
      .nullable()
      .required(t('general:form.required'))
      .min(new Date(), t('general:date.minToday')),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().nullable().required(t('general:form.required')),
      }),
    ),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
}
