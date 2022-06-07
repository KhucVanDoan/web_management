import * as Yup from 'yup'

import { NUMBER_FIELD_REQUIRED_SIZE } from '~/common/constants'
import { convertToCm } from '~/utils/measure'

const isTemplateShelfValid = (templateShelf, context = {}) => {
  const { unit, height, width, long } = context.parent
  if (
    templateShelf &&
    convertToCm(+unit, height) >=
      convertToCm(templateShelf?.height?.unit, templateShelf?.height?.value) &&
    convertToCm(+unit, width) >=
      convertToCm(templateShelf?.width?.unit, templateShelf?.width?.value) &&
    convertToCm(+unit, long) >=
      convertToCm(templateShelf?.long?.unit, templateShelf?.long?.value)
  ) {
    return true
  }
  return false
}

const templateSectorSchema = (t) =>
  Yup.object().shape({
    unit: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    long: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
    width: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
    height: Yup.number()
      .required(t('general:form.required'))
      .min(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MIN,
        t('general:form.moreThanNumber', {
          min: NUMBER_FIELD_REQUIRED_SIZE.PRICE.MIN,
        }),
      )
      .max(
        NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        t('general:form.maxNumber', {
          max: NUMBER_FIELD_REQUIRED_SIZE.AMOUNT_DECIMAL.MAX,
        }),
      ),
    templateSheft: Yup.object()
      .nullable()
      .required(t('general:form.required'))
      .test(
        '',
        `${t('templateSector.sizeOfShelfIsOverSector')}`,
        (value, context) => {
          return isTemplateShelfValid(value, context)
        },
      ),
    items: Yup.array().of(
      Yup.object().shape({
        nameSheft: Yup.string().required(t('general:form.required')),
      }),
    ),
  })

export default templateSectorSchema
