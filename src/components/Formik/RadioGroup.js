import React from 'react'

import RadioGroup from '@mui/material/RadioGroup'
import PropTypes from 'prop-types'

const FormikRadioGroup = ({ field, form, onChange, children, ...props }) => (
  <RadioGroup
    {...field}
    value={field.value}
    onChange={(_, value) => {
      onChange(value)
      form.setFieldValue(field.name, value)
    }}
    {...props}
  >
    {children}
  </RadioGroup>
)

FormikRadioGroup.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
}

FormikRadioGroup.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  children: PropTypes.node,
  onChange: PropTypes.func,
}

export default FormikRadioGroup
