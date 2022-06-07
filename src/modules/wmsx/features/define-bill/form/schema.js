import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

const validateShema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    invoiceTypeId: Yup.object().nullable().required(t('general:form.required')),
    currencyUnitId: Yup.string().required(t('general:form.required')),
    vendor: Yup.object().nullable().required(t('general:form.required')),
    customerId: Yup.object().nullable().required(t('general:form.required')),
    paymentMethod: Yup.object().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        serviceId: Yup.number().nullable().required(t('general:form.required')),
        rentDuration: Yup.array()
          .nullable()
          .required(t('general:form.required')),
        price: Yup.array().nullable().required(t('general:form.required')),
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

export default validateShema
