import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

const warehouseTranferSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(t('general:form.required')),
    name: Yup.string().nullable().required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    sourceId: Yup.object().nullable().required(t('general:form.required')),
    destinationWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    sourceWarehouseId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    transferOn: Yup.date().nullable().required(t('general:form.required')),
    deliver: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        planExportedQuantity: Yup.number()
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
