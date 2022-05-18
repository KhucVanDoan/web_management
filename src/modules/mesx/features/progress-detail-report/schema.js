import * as Yup from 'yup'

const progressDetailReportSchema = (t) =>
  Yup.object().shape({
    moId: Yup.object().nullable().required(t('general:form.required')),
    producingStepId: Yup.string().required(t('general:form.required')),
    itemId: Yup.string().required(t('general:form.required')),
    workCenterId: Yup.string().required(t('general:form.required')),
  })

export default progressDetailReportSchema
