import * as Yup from 'yup'

export const formSchema = (t) =>
  Yup.object().shape({
    material: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required(t('general:form.required')),
        name: Yup.string().required(t('general:form.required')),
        description: Yup.string(),
      }),
    ),
    mainGroups: Yup.array().of(
      Yup.object().shape({
        code: Yup.string().required(t('general:form.required')),
        name: Yup.string().required(t('general:form.required')),
        description: Yup.string(),
      }),
    ),
    subGroups: Yup.array().of(
      Yup.object().shape({
        mainCode: Yup.string().nullable().required(t('general:form.required')),
        code: Yup.string().required(t('general:form.required')),
        name: Yup.string().required(t('general:form.required')),
        description: Yup.string(),
      }),
    ),
  })
