import React from 'react'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box } from '@mui/material'
import { PropTypes } from 'prop-types'

import Status from '~/components/Status'

const StatusSwitcher = ({ sx, value, nextValue, options }) => {
  const upcomingValue =
    nextValue ?? options.find((opt) => opt?.id !== value)?.id
  return (
    <Box sx={{ display: 'inline-flex', ...sx }}>
      <Status options={options} value={value} variant="text" />
      <ArrowForwardIcon
        sx={{ width: 18, height: 22, mx: 1 }}
        color="disabled"
      />
      <Status options={options} value={upcomingValue} />
    </Box>
  )
}

StatusSwitcher.defaultProps = {
  options: [],
  sx: {},
}

StatusSwitcher.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  nextValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.array.isRequired,
  sx: PropTypes.shape(),
  t: PropTypes.func,
}

export default StatusSwitcher
