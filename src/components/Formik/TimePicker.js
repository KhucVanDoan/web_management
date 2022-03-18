import React from 'react'

import { getIn } from 'formik'
import PropTypes from 'prop-types'

import { DEFAULT_TIME } from '~/common/constants'
import TimePicker from '~/components/TimePicker'

const FormikTimePicker = ({ form, field, onChange, ...props }) => (
  <TimePicker
    {...field}
    value={field.value || DEFAULT_TIME}
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

FormikTimePicker.defaultProps = {
  form: {},
  field: {},
  onChange: () => {},
}

FormikTimePicker.propTypes = {
  form: PropTypes.shape(),
  field: PropTypes.shape(),
  onChange: PropTypes.func,
}

export default FormikTimePicker
