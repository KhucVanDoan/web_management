import * as Yup from 'yup'

import { phoneSchema } from '~/common/schemas'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    email: Yup.string().email(t('general:form.validEmail')),
    phone: phoneSchema(t),
  })
