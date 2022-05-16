import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const defineFactorySchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    companyId: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
    location: Yup.string(),
    phone: phoneSchema(t),
  })
