import React from 'react'

import { Typography, Box } from '@mui/material'
import { PropTypes } from 'prop-types'

const TextField = ({ label, value, children, sx, ...props }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        ...sx,
      }}
      {...props}
    >
      <Box sx={{ flex: '0 0 160px', mr: 2 }}>
        {typeof label === 'string' ? (
          <Typography variant="body2">{label}</Typography>
        ) : (
          label
        )}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        {children ? (
          children
        ) : typeof value === 'string' ? (
          <Typography>{value}</Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  )
}

TextField.defaultProps = {
  label: null,
  value: null,
  children: null,
  sx: {},
}

TextField.propTypes = {
  label: PropTypes.node,
  value: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.shape(),
}

export default TextField
