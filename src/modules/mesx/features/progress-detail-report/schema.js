import * as Yup from 'yup'

const progressDetailReportSchema = (t) =>
  Yup.object().shape({
    soId: Yup.object().nullable().required(t('general:form.required')),
  })

export default progressDetailReportSchema
