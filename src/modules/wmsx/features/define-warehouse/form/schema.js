import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    warehouseTypeSetting: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    warehouseCategory: Yup.string().required(t('general:form.required')),
    warehouseCharacteristic: Yup.string().required(t('general:form.required')),
    manageByLot: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
  })
