import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const formSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_22.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_22.MAX,
        }),
      ),
    normalizeCode: Yup.string()
      .required(t('general:form.required'))
      .length(
        TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
        t('general:form.length', {
          length: TEXTFIELD_REQUIRED_LENGTH.CODE_11.MAX,
        }),
      ),
    name: Yup.string().required(t('general:form.required')),
    country: Yup.object().nullable().required(t('general:form.required')),
    objectCategory: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    uom: Yup.object().nullable().required(t('general:form.required')),
    materialCategory: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    materialQuality: Yup.object()
      .nullable()
      .required(t('general:form.required')),
    description: Yup.string(),
  })
