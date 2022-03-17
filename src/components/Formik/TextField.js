import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import TextField from '~/components/TextField'

const FormikTextField = ({
  form,
  field,
  onChange,
  error,
  helperText,
  type,
  ...props
}) => (
  <TextField
    {...field}
    error={
      error ||
      (!!getIn(form.touched, field.name) && !!getIn(form.errors, field.name))
    }
    helperText={helperText || getIn(form.errors, field.name)}
    value={field.value ?? ''}
    onBlur={(e) => {
      form.setFieldTouched(field.name, true)
      form.setFieldValue(field.name, e.target.value?.trim())
    }}
    onChange={(val) => {
      onChange(val)
      form.setFieldValue(field.name, val)
    }}
    type={type}
    {...props}
  />
)

FormikTextField.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
  error: false,
  helperText: '',
}

FormikTextField.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  type: PropTypes.string,
}

export default FormikTextField
