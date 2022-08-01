import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validateShema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
        }),
      ),
    checkType: Yup.boolean().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object()
        .shape({
          title: Yup.string().required(t('general:form.required')),
          descriptionDetail: Yup.string().required(t('general:form.required')),
        })
        .test('name', '', (value, context) => {
          if (
            context?.parent?.some(
              (item) => item?.title === value?.title && item?.id !== value.id,
            )
          ) {
            return context.createError({
              message: t('templateChecklist.aleartTitle'),
              path: `${context.path}.title`,
            })
          }
          return true
        }),
    ),
  })
