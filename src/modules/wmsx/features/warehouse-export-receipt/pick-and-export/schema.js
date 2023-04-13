import { isEmpty } from 'lodash'
import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        exportedQuantity: Yup.number()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            if (+value > +context?.parent?.planQuantity) {
              return context.createError({
                message: t('general:form.maxNumber', {
                  max: context?.parent?.planQuantity,
                }),
              })
            } else if (+value > +context?.parent?.quantity) {
              return context.createError({
                message: t('general:form.maxNumber', {
                  max: context?.parent?.quantity,
                }),
              })
            }
            return true
          }),
        locator: Yup.object()
          .nullable()
          .required(t('general:form.required'))
          .test('', '', (value, context) => {
            const findItem = context?.from[2]?.value?.items?.find(
              (item) =>
                item?.id !== context?.parent?.id &&
                item?.itemCode?.id === context?.parent?.itemCode?.id &&
                item?.lotNumber === context?.parent?.lotNumber &&
                item?.locator?.locatorId === value?.locatorId,
            )
            if (!isEmpty(findItem)) {
              return context.createError({
                message: t('wmsx:warehouseTransfer.duplicateItem'),
              })
            }
            return true
          }),
      }),
    ),
  })
