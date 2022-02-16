import React from 'react'

import { Switch } from '@mui/material'
import PropTypes from 'prop-types'

const FormikSwitch = ({ field, ...props }) => (
  <Switch {...field} checked={field.value} {...props} />
)

FormikSwitch.defaultProps = {
  field: {},
}

FormikSwitch.propTypes = {
  field: PropTypes.shape(),
}

export default FormikSwitch
