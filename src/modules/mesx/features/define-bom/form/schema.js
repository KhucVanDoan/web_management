import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_8.MAX,
        }),
      )
      .matches(/^[0-9A-Za-z]+$/, t('general:form.special')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    routingId: Yup.number().required(t('general:form.required')),
    itemId: Yup.number().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    items: Yup.array().of(
      Yup.object().shape({
        itemId: Yup.number().nullable().required(t('general:form.required')),
      }),
    ),
  })
