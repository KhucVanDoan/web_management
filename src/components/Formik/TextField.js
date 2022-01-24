import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import TextField from '~/components/TextField'

const FormikTextField = ({ form, field, ...props }) => (
  <TextField
    {...field}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
    {...props}
  />
)

FormikTextField.defaultProps = {
  form: {},
  field: {},
}

FormikTextField.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
}

export default FormikTextField
