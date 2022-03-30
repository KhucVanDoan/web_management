import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const validationSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_20.MAX,
        }),
      )
      .matches(/^[0-9A-Za-z]+$/, t('general:form.validCode')),
    name: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.NAME.MAX,
        }),
      ),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
    soId: Yup.number()
      .typeError(t('general:form.required'))
      .required(t('general:form.required')),
    factoryId: Yup.number()
      .typeError(t('general:form.required'))
      .required(t('general:form.required')),
    planDate: Yup.array()
      .nullable()
      .of(Yup.string().nullable().required(t('general:form.required')))
      .test({
        message: t('general:form.required'),
        test: (arr) => arr?.length === 2,
      }),
  })
