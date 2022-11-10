import { isNull } from 'lodash'
import * as Yup from 'yup'

import { REPORT_TYPE } from '../../constants'

export const formSchema = (t) =>
  Yup.object().shape({
    type: Yup.string().required(t('general:form.required')),
    // company: Yup.object().nullable().required(t('general:form.required')),
    fileFormat: Yup.string().required(t('general:form.required')),
    time: Yup.array()
      .nullable()
      .test('time', '', (value, context) => {
        const type = context.from?.[0]?.value?.type
        if (
          type !== REPORT_TYPE.INVENTORY &&
          type !== REPORT_TYPE.SITUATION_INVENTORY_PERIOD &&
          (isNull(value?.[0]) || isNull(value?.[1]))
        ) {
          return context.createError({
            message: t('general:form.required'),
            path: `${context.path}`,
          })
        }
        return true
      }),
  })
