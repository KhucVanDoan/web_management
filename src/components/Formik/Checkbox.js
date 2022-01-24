import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import PropTypes from 'prop-types'

const FormikCheckbox = ({ field, ...props }) => (
  <Checkbox {...field} checked={field.value} {...props} />
)

FormikCheckbox.defaultProps = {
  field: {},
}

FormikCheckbox.propTypes = {
  field: PropTypes.shape(),
}

export default FormikCheckbox
