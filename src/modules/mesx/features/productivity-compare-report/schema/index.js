import * as Yup from 'yup'

const productivityReportSchema = (t) =>
  Yup.object().shape({
    moId: Yup.string().required(t('general:form.required')),
    producingStepId: Yup.string().required(t('general:form.required')),
    itemId: Yup.string().required(t('general:form.required')),
  })

export default productivityReportSchema
