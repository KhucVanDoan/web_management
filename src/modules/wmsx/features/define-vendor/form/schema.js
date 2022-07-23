import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { phoneSchema } from '~/common/schemas'

const defineVendorSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    email: Yup.string().email(t('general:form.validEmail')),
    phone: phoneSchema(t),
    vendorAbilities: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.object().nullable(),
        quantity: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_FLOAT.MAX,
            }),
          )
          .when('itemId', {
            is: (itemId) => !isEmpty(itemId),
            then: Yup.number().nullable().required(t('general:form.required')),
          }),
        deliveryTime: Yup.number()
          .min(
            NUMBER_FIELD_REQUIRED_SIZE.INTEGER_1000.MIN,
            t('general:form.minNumber', {
              min: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_1000.MIN,
            }),
          )
          .max(
            NUMBER_FIELD_REQUIRED_SIZE.INTEGER_1000.MAX,
            t('general:form.maxNumber', {
              max: NUMBER_FIELD_REQUIRED_SIZE.INTEGER_1000.MAX,
            }),
          )
          .when('itemId', {
            is: (itemId) => !isEmpty(itemId),
            then: Yup.number().nullable().required(t('general:form.required')),
          }),
      }),
    ),
  })

export default defineVendorSchema
