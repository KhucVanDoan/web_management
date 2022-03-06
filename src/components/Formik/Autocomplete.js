import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import Autocomplete from '~/components/Autocomplete'

const FormikAutocomplete = ({
  field,
  form,
  onChange,
  error,
  helperText,
  ...props
}) => (
  <Autocomplete
    {...field}
    error={
      error ||
      (!!getIn(form.touched, field.name) && !!getIn(form.errors, field.name))
    }
    helperText={helperText || getIn(form.errors, field.name)}
    onChange={(v) => {
      onChange(v)
      form.setFieldValue(field.name, v)
    }}
    {...props}
  />
)

FormikAutocomplete.defaultProps = {
  field: {},
  form: {},
  onChange: () => {},
  error: false,
  helperText: '',
}

FormikAutocomplete.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.string,
}

export default FormikAutocomplete
