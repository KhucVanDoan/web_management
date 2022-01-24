import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import DateRangePicker from '~/components/DateRangePicker'

const FormikDateRangePicker = ({ form, field, ...props }) => (
  <DateRangePicker
    {...field}
    value={field.value || [null, null]}
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

FormikDateRangePicker.defaultProps = {
  form: {},
  field: {},
}

FormikDateRangePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
}

export default FormikDateRangePicker
