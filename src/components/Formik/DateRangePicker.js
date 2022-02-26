import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import DateRangePicker from '~/components/DateRangePicker'

const FormikDateRangePicker = ({ form, field, onChange, ...props }) => (
  <DateRangePicker
    {...field}
    value={field.value || [null, null]}
    onChange={(v) => {
      onChange(v)
      form.setFieldValue(field.name, v)
    }}
    onTouch={(touched) => {
      form.setFieldTouched(field.name, touched)
    }}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={getIn(form.errors, field.name)}
    {...props}
  />
)

FormikDateRangePicker.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
}

FormikDateRangePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikDateRangePicker
