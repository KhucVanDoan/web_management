import * as Yup from 'yup'

const materialSchema = (t) =>
  Yup.object().shape({
    moId: Yup.string().required(t('general:form.required')),
    producingStepId: Yup.string().required(t('general:form.required')),
    itemId: Yup.string().required(t('general:form.required')),
    workCenterId: Yup.string().required(t('general:form.required')),
  })

export default materialSchema
