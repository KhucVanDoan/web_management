import * as Yup from 'yup'

export const defineWarehouseReportSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    factoryIds: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    warehouseIds: Yup.array().test({
      message: t('general:form.required'),
      test: (arr) => arr.length !== 0,
    }),
    periodReport: Yup.array()
      .nullable()
      .test('periodReport', t('general:form.required'), (periodReport) => {
        const isValue = periodReport?.some((val) => val) || false
        return isValue
      }),
    note: Yup.string(),
  })
