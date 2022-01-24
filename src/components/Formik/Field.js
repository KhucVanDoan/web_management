import React from 'react'

import { Field } from 'formik'

const FieldWrapper = (Component) => (props) =>
  <Field component={Component} {...props} />

export default FieldWrapper
