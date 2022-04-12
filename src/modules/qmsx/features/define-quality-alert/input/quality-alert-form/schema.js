import { isEmpty } from 'lodash'
import * as Yup from 'yup'

import { TEXTFIELD_REQUIRED_LENGTH } from '~/common/constants'

export const defineQualityAlertInputSchema = (t) =>
  Yup.object().shape({
    code: Yup.string()
      .required(t('general:form.required'))
      .max(
        TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
        t('general:form.maxLength', {
          max: TEXTFIELD_REQUIRED_LENGTH.CODE_50.MAX,
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
    stage: Yup.number().nullable().required(t('general:form.required')),
    alertRelatedUsers: Yup.array()
      .nullable()
      .when((_, schema, alertRelatedUsersContext) => {
        return schema.test({
          message: t('general:form.required'),
          test: () => {
            return !isEmpty(alertRelatedUsersContext.value)
          },
        })
      }),
    purchasedOrderId: Yup.number()
      .nullable()
      .required(t('general:form.required')),
    itemId: Yup.number().nullable().required(t('general:form.required')),
    warehouseId: Yup.number().nullable().required(t('general:form.required')),
    errorReportId: Yup.number().nullable().required(t('general:form.required')),
    description: Yup.string().max(
      TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      t('general:form.maxLength', {
        max: TEXTFIELD_REQUIRED_LENGTH.COMMON.MAX,
      }),
    ),
  })
