import React from 'react'

import { FastField } from 'formik'

const FastFieldWrapper = (Component) => (props) =>
  (
    <FastField
      component={Component}
      {...props}
      {...(props?.name && !props?.id ? { id: props?.name } : {})}
    />
  )

export default FastFieldWrapper
