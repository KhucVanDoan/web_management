import * as Yup from 'yup'

function validationSchema(t) {
  return Yup.object().shape({
    code: Yup.string().required(t('general:form.required')),
    name: Yup.string().required(t('general:form.required')),
    deadline: Yup.array()
      .nullable()
      .test('deadline', t('general:form.required'), (deadline) => {
        const isValue = deadline?.some((val) => val) || false
        return isValue
      }),
  })
}
export default validationSchema
