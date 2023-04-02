import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

export const formSchema = (t, isEdit) =>
  Yup.object().shape({
    receiptDate: Yup.date().nullable().required(t('general:form.required')),
    deliver: Yup.string().nullable().required(t('general:form.required')),
    departmentReceiptId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    businessTypeId: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    warehouseId: Yup.object().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    sourceId: Yup.object().nullable().required(t('general:form.required')),
    // explaination: Yup.object().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        quantityExport: !isEdit
          ? Yup.string()
              .nullable()
              .required(t('general:form.required'))
              .test('', '', (value, context) => {
                if (value <= 0) {
                  return context.createError({
                    message: t('general:form.moreThanNumber', {
                      min: NUMBER_FIELD_REQUIRED_SIZE.WATTAGE.MIN,
                    }),
                  })
                } else if (value > context?.parent?.planExportedQuantity) {
                  return context.createError({
                    message: t('general:form.maxNumber', {
                      max: context?.parent?.planExportedQuantity,
                    }),
                  })
                } else if (
                  context?.parent?.quantityRequest ||
                  context?.parent?.quantityRequest === 0
                ) {
                  if (value > context?.parent?.quantityRequest) {
                    return context.createError({
                      message: t('general:form.maxNumber', {
                        max: context?.parent?.quantityRequest,
                      }),
                    })
                  }
                }
                return true
              })
          : '',
        // money: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
  })
