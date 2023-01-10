import * as Yup from 'yup'

import { CHECK_POINT_DATA_TYPE, INVENTORY_TYPE } from '~/modules/wmsx/constants'

export const defineSchema = (t, inventoryType, dataSnapshot) => {
  return Yup.object().shape({
    name: Yup.string().nullable().required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    switchMode: Yup.number().nullable().required(t('general:form.required')),
    closingDay: Yup.date().nullable().required(t('general:form.required')),
    impersonators: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    warehouses: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    executionDay: Yup.array()
      .nullable()
      .required(t('general:form.required'))
      .test('executionDay', t('general:form.required'), (executionDay) => {
        const isValue = executionDay?.some((val) => val) || false
        return isValue
      }),
    checkPointDataAttachment:
      dataSnapshot === CHECK_POINT_DATA_TYPE.EXTERNAL_SNAPSHOT &&
      inventoryType === INVENTORY_TYPE.PERIODIC
        ? Yup.mixed().nullable().required(t('general:form.required'))
        : null,
    items: Yup.array().of(
      Yup.object().shape({
        itemCode:
          inventoryType === INVENTORY_TYPE.UNEXPECTED
            ? Yup.object().nullable().required(t('general:form.required'))
            : null,
      }),
    ),
  })
}
