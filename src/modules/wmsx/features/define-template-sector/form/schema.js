import * as Yup from 'yup'

const templateSectorSchema = (t) =>
  Yup.object().shape({
    unit: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    long: Yup.number().required(t('general:form.required')),
    width: Yup.number().required(t('general:form.required')),
    height: Yup.number().required(t('general:form.required')),
    templateSheft: Yup.string().required(t('general:form.required')),
    items: Yup.array().of(
      Yup.object().shape({
        nameSheft: Yup.string().required(t('general:form.required')),
      }),
    ),
  })

export default templateSectorSchema
