import * as Yup from 'yup'

export const validationSchema = (t) => {
  return Yup.object().shape({
    itemCode: Yup.object().nullable().required(t('general:form.required')),
    minInventoryLimit: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    expiryWarehouse: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    maxInventoryLimit: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    expiryWarningWarehouse: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    inventoryLimit: Yup.number()
      .nullable()
      .required(t('general:form.required')),
  })
}
