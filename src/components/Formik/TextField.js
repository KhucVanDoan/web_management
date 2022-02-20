import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import TextField from '~/components/TextField'

const FormikTextField = ({ form, field, onChange, ...props }) => (
  <TextField
    {...field}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
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
}

FormikTextField.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikTextField
