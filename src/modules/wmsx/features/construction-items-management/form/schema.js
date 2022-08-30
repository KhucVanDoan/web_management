import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .min(
        TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
        t('general:form.minLength', {
          min: TEXTFIELD_REQUIRED_LENGTH.CODE.MAX,
        }),
      ),
    construction: Yup.object().nullable().required(t('general:form.required')),
    description: Yup.string(),
  })
