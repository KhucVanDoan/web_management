import * as Yup from 'yup'

export const formSchema = () =>
  Yup.object().shape({
    type: Yup.string().nullable(),
    purpose: Yup.string().nullable(),
  })
