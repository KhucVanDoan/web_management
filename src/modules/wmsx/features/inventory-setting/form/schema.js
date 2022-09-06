import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape(
    {
      warehouse: Yup.object().nullable().required(t('general:form.required')),
      item: Yup.object().nullable().required(t('general:form.required')),
      inventoryLimit: Yup.string().required(t('general:form.required')),
      minInventoryLimit: Yup.number()
        .nullable()
        .min(
          NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MIN,
          t('general:form.minNumber', {
            min: NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MIN,
          }),
        )
        .max(
          NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MAX,
          t('general:form.maxNumber', {
            max: NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MAX,
          }),
        )
        .when(['maxInventoryLimit'], (_, schema, context) => {
          return schema.test({
            message: t('inventorySetting.messageWarningMin'),
            test: () => {
              const inventoryLimit = Number(context?.parent?.inventoryLimit)
              const minInventoryLimit = Number(
                context?.parent?.minInventoryLimit,
              )
              const maxInventoryLimit = Number(
                context?.parent?.maxInventoryLimit,
              )

              if (
                minInventoryLimit > inventoryLimit ||
                minInventoryLimit > maxInventoryLimit
              ) {
                return false
              }
              return true
            },
          })
        }),
      maxInventoryLimit: Yup.number()
        .nullable()
        .min(
          NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MIN,
          t('general:form.minNumber', {
            min: NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MIN,
          }),
        )
        .max(
          NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MAX,
          t('general:form.maxNumber', {
            max: NUMBER_FIELD_REQUIRED_SIZE.INVENTORY_LIMIT.MAX,
          }),
        )
        .when(['minInventoryLimit'], (_, schema, context) => {
          return schema.test({
            message: t('inventorySetting.messageWarningMax'),
            test: () => {
              const inventoryLimit = Number(context?.parent?.inventoryLimit)
              const minInventoryLimit = Number(
                context?.parent?.minInventoryLimit,
              )
              const maxInventoryLimit = Number(
                context?.parent?.maxInventoryLimit,
              )

              if (
                maxInventoryLimit < inventoryLimit ||
                maxInventoryLimit < minInventoryLimit
              ) {
                return false
              }
              return true
            },
          })
        }),
    },
    ['minInventoryLimit', 'maxInventoryLimit'],
  )
