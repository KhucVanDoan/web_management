import * as Yup from 'yup'

const defineServiceSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    currencyUnitId: Yup.string().required(t('general:form.required')),
    pricePerDay: Yup.string().required(t('general:form.required')),
    serviceTypeId: Yup.string().required(t('general:form.required')),
    pricePerMonth: Yup.string().required(t('general:form.required')),
    rentUnitId: Yup.string().required(t('general:form.required')),
    pricePerQuarter: Yup.string().required(t('general:form.required')),
    voucherId: Yup.string().required(t('general:form.required')),
    pricePerYear: Yup.string().required(t('general:form.required')),
  })

export default defineServiceSchema
