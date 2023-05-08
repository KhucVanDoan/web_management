import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'
import { DEFAULT_MAX_COLUMN_WIDTH } from '~/contexts/TableContext'

export const validationSchema = (t) =>
  Yup.object().shape({
    items: Yup.array().of(
      Yup.object().shape({
        aliasName: Yup.string().max(
          TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          t('general:form.maxLength', {
            max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
          }),
        ),
        minWidth: Yup.number()
          .required(t('form.required'))
          .max(
            DEFAULT_MAX_COLUMN_WIDTH,
            t('form.maxNumber', {
              max: DEFAULT_MAX_COLUMN_WIDTH,
            }),
          ),
        width: Yup.number()
          .required(t('form.required'))
          .max(
            DEFAULT_MAX_COLUMN_WIDTH,
            t('form.maxNumber', {
              max: DEFAULT_MAX_COLUMN_WIDTH,
            }),
          )
          .test(
            'is-smaller-than-minWidth',
            t('dataTable.tableSetting.validateSmallerThanMinWidth'),
            (val, context) => {
              if (val < context.parent.minWidth) return false
              return true
            },
          ),
      }),
    ),
  })
