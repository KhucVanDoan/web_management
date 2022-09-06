import * as Yup from 'yup'

export const filterSchema = () =>
  Yup.object().shape({
    code: Yup.string(),
  })
