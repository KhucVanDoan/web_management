import * as Yup from 'yup'

export const validateShema = (t) => {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    assignDate: Yup.string().required(t('general:form.required')),
    usageTime: Yup.string().required(t('general:form.required')),
    serial: Yup.string().required(t('general:form.required')),
    hasMO: Yup.boolean(),
    workTimeDataSource: Yup.number()
      .nullable()
      .when('hasMO', {
        is: (hasMO) => hasMO,
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
    oee: Yup.number()
      .nullable()
      .when('hasMO', {
        is: (hasMO) => hasMO,
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
    productivityTarget: Yup.number()
      .nullable()
      .when('hasMO', {
        is: (hasMO) => hasMO,
        then: Yup.number().nullable().required(t('general:form.required')),
      }),
  })
}
