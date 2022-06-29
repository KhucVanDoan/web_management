import * as Yup from 'yup'

export const validateSchema = (t) =>
  Yup.object().shape({
    switchMode: Yup.string(),
    lockItems: Yup.array()
      .of(Yup.object().shape({}))
      .when('switchMode', {
        is: (val) => Boolean(val === '0'),
        then: Yup.array().of(
          Yup.object().shape({
            itemId: Yup.string()
              .nullable()
              .required(t('general:form.required')),
            warehouseId: Yup.string()
              .nullable()
              .required(t('general:form.required')),
            lotNumber: Yup.string()
              .nullable()
              .required(t('general:form.required')),
            quantity: Yup.string()
              .nullable()
              .required(t('general:form.required')),
            packageId: Yup.string()
              .nullable()
              .required(t('general:form.required')),
          }),
        ),
      }),
    locations: Yup.array()
      .of(Yup.object().shape({}))
      .when('switchMode', {
        is: (val) => Boolean(val === '1'),
        then: Yup.array().of(
          Yup.object().shape({
            factoryId: Yup.string()
              .nullable()
              .required(t('general:form.required')),
          }),
        ),
      }),
  })
export default validateSchema
