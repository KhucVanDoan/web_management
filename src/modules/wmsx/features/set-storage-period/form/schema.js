import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    material: Yup.object().nullable().required(t('general:form.required')),
    expiryWarehouse: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.EXPIRY_WAREHOUSE.MIN,
        t('general:form.minNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.EXPIRY_WAREHOUSE.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.EXPIRY_WAREHOUSE.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.EXPIRY_WAREHOUSE.MAX,
        }),
      ),
    expiryWarningWarehouse: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .test('number', '', (value, context) => {
        if (
          context?.parent?.expiryWarningWarehouse >=
          context?.parent?.expiryWarehouse
        ) {
          return context.createError({
            message: t('setStoragePeriod.messageWarning'),
            path: `${context.path}`,
          })
        }
        return true
      }),
  })
