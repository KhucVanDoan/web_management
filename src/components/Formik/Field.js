import React from 'react'

import { Field } from 'formik'

const FieldWrapper = (Component) => (props) =>
  (
    <Field
      component={Component}
      {...props}
      {...(props?.name && !props?.id ? { id: props?.name } : {})}
    />
  )

export default FieldWrapper
