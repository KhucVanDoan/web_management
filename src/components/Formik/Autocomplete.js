import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'components/Autocomplete'
import { getIn } from 'formik'

const FormikAutocomplete = ({ field, form, meta, ...props }) => (
  <Autocomplete
    {...field}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
    onChange={(_, value) => form.setFieldValue(field.name, value)}
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
}

export default FormikAutocomplete
