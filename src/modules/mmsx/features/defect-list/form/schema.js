import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_9.MAX,
        }),
      ),
    name: Yup.string().required(t('general:form.required')),
    priority: Yup.number().nullable().required(t('general:form.required')),
    deviceId: Yup.object().nullable().required(t('general:form.required')),
  })
