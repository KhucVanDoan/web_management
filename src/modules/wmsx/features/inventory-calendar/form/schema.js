import * as Yup from 'yup'

export const inventoryCalendarSchema = (t, isPartial) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    type: Yup.number().nullable().required(t('general:form.required')),
    warehouses: Yup.object().nullable().required(t('general:form.required')),
    executionDay: Yup.date().nullable().required(t('general:form.required')),
    description: Yup.string(),
    items: Yup.array().of(
      Yup.object()
        .shape({})
        .test('name', '', (value, context) => {
          if (
            value.warehouseSectorName === null &&
            value.itemId === null &&
            isPartial
          ) {
            return context.createError({
              message: t(
                'inventoryCalendar.items.requireWarehouseSectorOrItemCode',
              ),
              path: `${context.path}.warehouseSectorName`,
            })
          }
          return true
        }),
    ),
  })
