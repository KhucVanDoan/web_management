import * as Yup from 'yup'

import { INVENTORY_TYPE } from '~/modules/wmsx/constants'

export const defineSchema = (t, type) =>
  Yup.object().shape({
    name: Yup.string().nullable().required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    closingDay: Yup.string().nullable().required(t('general:form.required')),
    warehouses: Yup.object().nullable().required(t('general:form.required')),
    executionDay: Yup.array().nullable().required(t('general:form.required')),
    items:
      type === INVENTORY_TYPE.UNEXPECTED
        ? Yup.array().of(
            Yup.object().shape({
              itemCode: Yup.object()
                .nullable()
                .required(t('general:form.required')),
            }),
          )
        : null,
  })
