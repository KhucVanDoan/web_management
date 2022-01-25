import React from 'react'

import { FastField } from 'formik'

const FastFieldWrapper = (Component) => (props) =>
  <FastField component={Component} {...props} />

export default FastFieldWrapper
