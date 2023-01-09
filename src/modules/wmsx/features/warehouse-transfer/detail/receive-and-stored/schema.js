import { isEmpty } from 'lodash'
import * as Yup from 'yup'

export const formSchema = (t, manageByLot) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        locator: Yup.object()
          .nullable()
          .required(t('general:form.required'))
          .test('', (value, context) => {
            if (manageByLot) {
              const findItem = context?.from[2]?.value?.items?.find(
                (item) =>
                  item?.id !== context?.parent?.id &&
                  (item?.itemCode?.id || item?.itemCode?.itemId) ===
                    (context?.parent?.itemCode?.id ||
                      context?.parent?.itemCode?.itemId) &&
                  item?.lotNumber === context?.parent?.lotNumber &&
                  item?.locator?.locatorId === value?.locatorId,
              )
              if (!isEmpty(findItem)) {
                return context.createError({
                  message: t('wmsx:warehouseTransfer.duplicateItem'),
                })
              }
            } else {
              const findItem = context?.from[2]?.value?.items?.find(
                (item) =>
                  item?.id !== context?.parent?.id &&
                  (item?.itemCode?.id || item?.itemCode?.itemId) ===
                    (context?.parent?.itemCode?.id ||
                      context?.parent?.itemCode?.itemId) &&
                  item?.locator?.locatorId === value?.locatorId,
              )
              if (!isEmpty(findItem)) {
                return context.createError({
                  message: t('wmsx:warehouseTransfer.duplicateItem'),
                })
              }
            }
            return true
          }),
        lotNumber: Yup.string()
          .nullable()
          .test('', (value, context) => {
            const findItem = context?.from[1]?.value?.items?.find(
              (item) =>
                item?.id !== context?.parent?.id &&
                (item?.itemCode?.id || item?.itemCode?.itemId) ===
                  (context?.parent?.itemCode?.id ||
                    context?.parent?.itemCode?.itemId) &&
                item?.lotNumber === value &&
                item?.locator?.locatorId ===
                  context?.parent?.locator?.locatorId,
            )
            if (!isEmpty(findItem)) {
              return context.createError({
                message: t('wmsx:warehouseTransfer.duplicateItem'),
              })
            }
            return true
          }),
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        inputedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (val, context) => {
            if (val === 0) {
              return context.createError({
                message: t('general:form.moreThanNumber', {
                  min: 0,
                }),
              })
            }
            return true
          }),
      }),
    ),
  })
