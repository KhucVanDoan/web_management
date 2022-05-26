import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'

const templateSectorSchema = (t) =>
  Yup.object().shape({
    unit: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    long: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      ),
    width: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      ),
    height: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_INTEGER.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      ),
    templateSheft: Yup.string().nullable().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        nameSheft: Yup.string().required(t('general:form.required')),
      }),
    ),
  })

export default templateSectorSchema
