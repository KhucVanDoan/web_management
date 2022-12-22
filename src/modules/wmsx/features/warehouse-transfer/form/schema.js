import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { WAREHOUSE_TRANSFER_TYPE } from '~/modules/wmsx/constants'
const warehouseTranferSchema = (t, type) => {
  return Yup.object().shape({
    name: Yup.string().nullable().required(t('general:form.required')),
    receiptDate: Yup.date().nullable().required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    destinationWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required'))
      .test(
        'isNotSameAsSourceWarehouseId',
        t(
          'warehouseTransfer.destinationWarehouseMustBeDiferenceWithSourceWarehouse',
        ),
        (value, context) => {
          const { sourceWarehouseId } = context.parent
          return (
            (sourceWarehouseId &&
              value &&
              sourceWarehouseId?.id !== value?.id) ||
            !sourceWarehouseId ||
            !value
          )
        },
      ),
    sourceWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required'))
      .test(
        'isNotSameAsDestinationWarehouseId',
        t(
          'warehouseTransfer.sourceWarehouseMustBeDiferenceWithDestinationWarehouse',
        ),
        (value, context) => {
          const { destinationWarehouseId } = context.parent
          return (
            (destinationWarehouseId &&
              value &&
              destinationWarehouseId?.id !== value?.id) ||
            !destinationWarehouseId ||
            !value
          )
        },
      ),
    // deliver: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        lotNumber: Yup.string()
          .nullable()
          .test('', (value, context) => {
            if (type === WAREHOUSE_TRANSFER_TYPE.WAREHOUSE_TRANSFER_SHORT) {
              const findItem = context?.from[1]?.value?.items?.find(
                (item) =>
                  item?.ids !== context?.parent?.ids &&
                  item?.itemCode?.id === context?.parent?.itemCode?.id &&
                  item?.lotNumber === value,
              )
              if (!isEmpty(findItem)) {
                return context.createError({
                  message: t('wmsx:warehouseTransfer.duplicateItem'),
                })
              }
            } else {
              const findItem = context?.from[1]?.value?.items?.find(
                (item) =>
                  item?.ids !== context?.parent?.ids &&
                  item?.itemCode?.id === context?.parent?.itemCode?.id &&
                  item?.lotNumber === value &&
                  item?.locator?.locatorId ===
                    context?.parent?.locator?.locatorId,
              )
              if (!isEmpty(findItem)) {
                return context.createError({
                  message: t('wmsx:warehouseTransfer.duplicateItem'),
                })
              }
            }
            return true
          }),
        locator: Yup.object()
          .nullable()
          .test('', (value, context) => {
            const findItem = context?.from[1]?.value?.items?.find(
              (item) =>
                item?.ids !== context?.parent?.ids &&
                item?.itemCode?.id === context?.parent?.itemCode?.id &&
                item?.lotNumber === context?.parent?.lotNumber &&
                item?.locator?.locatorId === value?.locator?.locatorId,
            )
            if (!isEmpty(findItem)) {
              return context.createError({
                message: t('wmsx:warehouseTransfer.duplicateItem'),
              })
            }

            return true
          }),
        transferQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (value <= 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
}

export default warehouseTranferSchema
