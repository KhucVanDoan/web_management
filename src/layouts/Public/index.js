import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const PublicLayout = ({ children }) => (
  <Box sx={{ height: '100%', overflow: 'auto' }}>{children}</Box>
)

PublicLayout.defaultProps = {
  children: null,
}

PublicLayout.propTypes = {
  children: PropTypes.node,
}

export default PublicLayout
