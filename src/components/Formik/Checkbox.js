import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'

const FormikCheckbox = ({ field, form, onChange, ...props }) => (
  <Checkbox
    {...field}
    checked={field.value}
    onChange={(e) => {
      onChange(e.target.checked)
      form.setFieldValue(field.name, e.target.checked)
    }}
    {...props}
  />
)

FormikCheckbox.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
}

FormikCheckbox.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikCheckbox
