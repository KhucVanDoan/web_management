import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'components/DatePicker'
import { getIn } from 'formik'

const FormikDatePicker = ({ form, field, ...props }) => (
  <DatePicker
    {...field}
    value={field.value || null}
    onChange={(v) => form.setFieldValue(field.name, v)}
    error={
      !!getIn(form.touched, field.name) && !!getIn(form.errors, field.name)
    }
    helperText={
      getIn(form.touched, field.name) && getIn(form.errors, field.name)
    }
    {...props}
  />
)

FormikDatePicker.defaultProps = {
  form: {},
  field: {},
}

FormikDatePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
}

export default FormikDatePicker
