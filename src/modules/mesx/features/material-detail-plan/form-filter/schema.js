import * as Yup from 'yup'

const materialSchema = (t) =>
  Yup.object().shape({
    moId: Yup.object().nullable().required(t('general:form.required')),
    producingStepId: Yup.number().required(t('general:form.required')),
    itemId: Yup.number().required(t('general:form.required')),
    workCenterId: Yup.number().required(t('general:form.required')),
  })

export default materialSchema
