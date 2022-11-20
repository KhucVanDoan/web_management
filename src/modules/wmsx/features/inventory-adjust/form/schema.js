import * as Yup from 'yup'

const InventoryyAdjustSchema = (t) =>
  Yup.object().shape({
    code: Yup.string().nullable().required(t('general:form.required')),
    name: Yup.string().nullable().required(t('general:form.required')),
    type: Yup.string().nullable().required(t('general:form.required')),
    warehouse: Yup.object().nullable().required(t('general:form.required')),
    reasonId: Yup.object().nullable().required(t('general:form.required')),
    sourceId: Yup.object().nullable().required(t('general:form.required')),

    items: Yup.array().of(
      Yup.object().shape({
        itemCode: Yup.object().nullable().required(t('general:form.required')),
        locator: Yup.object().nullable().required(t('general:form.required')),
      }),
    ),
  })

export default InventoryyAdjustSchema
