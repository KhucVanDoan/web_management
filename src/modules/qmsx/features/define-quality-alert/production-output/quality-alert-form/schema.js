import * as Yup from 'yup'

export const defineQualityAlertProductionOutputSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    manufacturingOrderId: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    itemId: Yup.number().nullable().required(t('general:form.required')),
    routingId: Yup.number().nullable().required(t('general:form.required')),
    producingStepId: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string(),
  })
