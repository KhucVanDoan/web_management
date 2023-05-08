import React from 'react'

import { Switch } from '@mui/material'
import PropTypes from 'prop-types'

const FormikSwitch = ({ field, form, onChange, ...props }) => (
  <Switch
    {...field}
    checked={field.value}
    onChange={(e) => {
      onChange(e.target.checked)
      form.setFieldValue(field.name, e.target.checked)
    }}
    {...props}
  />
)

FormikSwitch.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
}

FormikSwitch.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikSwitch
