import React from 'react'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import Sidebar from '~/components/Sidebar'
import { isAuth } from '~/utils'

const PrivateLayout = ({ children }) => {
  if (!isAuth()) {
    return <Redirect to="/login" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      <Sidebar />
      <Box sx={{ flex: 1, overflow: 'hidden' }}>{children}</Box>
    </Box>
  )
}

PrivateLayout.defaultProps = {
  children: null,
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
}

export default PrivateLayout
