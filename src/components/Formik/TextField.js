import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import TextField from '~/components/TextField'

const FormikTextField = ({
  form,
  field,
  onChange,
  onInput,
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
    onBlur={(e) => {
      form.setFieldTouched(field.name, true)

      const val = e?.target?.value
      if (typeof val === 'string' && val?.trim() !== val) {
        form.setFieldValue(field.name, val?.trim())
      }
    }}
    onChange={(_, val) => {
      if (typeof onInput === 'function') {
        onInput(val)
      } else {
        onChange(val)
        form.setFieldValue(field.name, val)
      }
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
  onInput: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
}

export default FormikTextField
