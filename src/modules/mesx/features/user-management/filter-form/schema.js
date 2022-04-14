import * as Yup from 'yup'

export const filterSchema = () =>
  Yup.object().shape({
    username: Yup.string(),
    fullName: Yup.string(),
  })
