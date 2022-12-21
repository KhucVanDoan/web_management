import React from 'react'

import { Typography, Box } from '@mui/material'
import { PropTypes } from 'prop-types'

const LabelValue = ({
  label,
  value,
  children,
  sx,
  file,
  onClick,
  ...props
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        wordBreak: 'break-word',
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
          <Typography color={file ? 'primary' : ''} onClick={() => onClick()}>
            {value}
          </Typography>
        ) : (
          value
        )}
      </Box>
    </Box>
  )
}

LabelValue.defaultProps = {
  label: null,
  value: null,
  children: null,
  file: null,
  sx: {},
}

LabelValue.propTypes = {
  label: PropTypes.node,
  file: PropTypes.node,
  value: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
  sx: PropTypes.shape(),
}

export default LabelValue
