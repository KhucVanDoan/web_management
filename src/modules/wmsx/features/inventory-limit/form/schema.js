import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const validationSchema = (t, minInventory, maxInventory) => {
  return Yup.object().shape({
    itemCode: Yup.object().nullable().required(t('general:form.required')),
    minInventoryLimit: Yup.number().nullable(),
    maxInventoryLimit: Yup.number().nullable(),
    inventoryLimit: Yup.number()
      .nullable()
      .required(t('general:form.required'))
      .when('minInventoryLimit', {
        is: (minInventoryLimit) => minInventoryLimit > maxInventory,
        then: Yup.number()
          .nullable()
          .min(
            minInventory,
            t('inventoryLimit.minThanLimit', {
              min: minInventory,
            }),
          ),
      })
      .when('maxInventoryLimit', {
        is: (maxInventoryLimit) => maxInventoryLimit < minInventory,
        then: Yup.number()
          .nullable()
          .max(
            maxInventory,
            t('inventoryLimit.limitThanMax', {
              max: maxInventory,
            }),
          ),
      }),
    expiryWarehouse: Yup.number()
      .nullable()
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
      ),
    expiryWarningWarehouse: Yup.number()
      .nullable()
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
      ),
    shelfLifeWarning: Yup.number()
      .nullable()
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
      ),
  })
}
