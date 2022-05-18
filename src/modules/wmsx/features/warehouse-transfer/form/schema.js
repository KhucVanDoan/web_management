import * as Yup from 'yup'

const warehouseTranferSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    destinationFactoryName: Yup.string().required(t('general:form.required')),
    sourceFactoryName: Yup.string().required(t('general:form.required')),
    destinationWarehouseName: Yup.string().required(t('general:form.required')),
    sourceWarehouseName: Yup.string().required(t('general:form.required')),
    estimationDay: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.string().nullable().required(t('general:form.required')),
        lotNumber: Yup.string().nullable().required(t('general:form.required')),
      }),
    ),
  })

export default warehouseTranferSchema
