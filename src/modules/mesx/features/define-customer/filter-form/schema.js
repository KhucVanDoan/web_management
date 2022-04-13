import * as Yup from 'yup'

export const filterSchema = () =>
  Yup.object().shape({
    code: Yup.string(),
    name: Yup.string(),
    address: Yup.string(),
    email: Yup.string(),
    fax: Yup.string(),
  })
