import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import Autocomplete from '~/components/Autocomplete'

const FormikAutocomplete = ({ field, form, meta, ...props }) => (
  <Autocomplete
    {...field}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
    onChange={(v) => form.setFieldValue(field.name, v)}
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
