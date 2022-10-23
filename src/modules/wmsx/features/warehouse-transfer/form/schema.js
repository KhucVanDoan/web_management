import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

const warehouseTranferSchema = (t) =>
  Yup.object().shape({
    name: Yup.string().nullable().required(t('general:form.required')),
    createdAt: Yup.date().nullable().required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    sourceId: Yup.object().nullable().required(t('general:form.required')),
    destinationWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required'))
      .test(
        'isNotSameAsSourceWarehouseId',
        t('warehouseTransfer.destinationWarehouseMustBeDiferenceWithSourceWarehouse'),
        (value, context) => {
          const { sourceWarehouseId } = context.parent
          return (sourceWarehouseId && value && sourceWarehouseId?.id !== value?.id) ||
            !sourceWarehouseId || !value
        }
      ),
    sourceWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required'))
      .test(
        'isNotSameAsDestinationWarehouseId',
        t('warehouseTransfer.sourceWarehouseMustBeDiferenceWithDestinationWarehouse'),
        (value, context) => {
          const { destinationWarehouseId } = context.parent
          return (destinationWarehouseId && value && destinationWarehouseId?.id !== value?.id) ||
            !destinationWarehouseId || !value
        }
      ),
    // deliver: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
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

export default warehouseTranferSchema
