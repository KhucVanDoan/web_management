import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    fullName: Yup.string().required(t('general:form.required')),
    username: Yup.string().required(t('general:form.required')),
    phone: phoneSchema(t),
    role: Yup.string().nullable().required(t('general:form.required')),
  })
