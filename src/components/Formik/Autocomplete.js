import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import Autocomplete from '~/components/Autocomplete'

const FormikAutocomplete = ({
  field,
  form,
  meta,
  getOptionValue,
  ...props
}) => (
  <Autocomplete
    {...field}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
    onChange={(value) => form.setFieldValue(field.name, getOptionValue(value))}
    getOptionValue={getOptionValue}
    {...props}
  />
)

FormikAutocomplete.defaultProps = {
  field: {},
  form: {},
}

FormikAutocomplete.propTypes = {
  field: PropTypes.shape(),
  form: PropTypes.shape(),
  getOptionValue: PropTypes.func,
}

export default FormikAutocomplete
