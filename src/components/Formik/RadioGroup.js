import React from 'react'

import RadioGroup from '@mui/material/RadioGroup'
import PropTypes from 'prop-types'

const FormikRadioGroup = ({ field, children, ...props }) => (
  <RadioGroup {...field} value={field.value} {...props}>
    {children}
  </RadioGroup>
)

FormikRadioGroup.defaultProps = {
  field: {},
}

FormikRadioGroup.propTypes = {
  field: PropTypes.shape(),
  children: PropTypes.node,
}

export default FormikRadioGroup
