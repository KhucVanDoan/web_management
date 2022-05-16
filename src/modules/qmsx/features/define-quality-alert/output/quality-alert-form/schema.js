import { isEmpty } from 'lodash'
import * as Yup from 'yup'

export const defineQualityAlertOutputSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
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
    description: Yup.string(),
  })
