import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_3.MAX,
        }),
      ),
    name: Yup.string().required(t('general:form.required')),
    description: Yup.string(),
  })
