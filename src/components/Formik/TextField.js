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
    onChange={(e) => {
      onChange(e.target.value)
      form.setFieldValue(field.name, e.target.value)
    }}
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
}

export default FormikTextField
