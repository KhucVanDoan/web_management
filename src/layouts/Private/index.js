import React from 'react'

import Box from '@mui/material/Box'
import PropTypes from 'prop-types'
import { Redirect, useRouteMatch } from 'react-router-dom'

import { useApp } from '~/common/hooks/useApp'
import Sidebar from '~/components/Sidebar'
import { ROLE } from '~/modules/wmsx/constants'
import { privateRoutesFlatten } from '~/routes'
import { getLocalItem, isAuth } from '~/utils'

const PrivateLayout = ({ children }) => {
  const { canAccess } = useApp()
  const { path } = useRouteMatch()
  const userInfo = getLocalItem('userInfo')
  if (!isAuth()) {
    return <Redirect to="/login" />
  }

  const code = privateRoutesFlatten.find((r) => r?.path === path)?.code

  if (!canAccess(code)) {
    return <Redirect to="/" />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflow: 'hidden',
        height: '100%',
      }}
    >
      {(userInfo?.role === ROLE.ADMIN || userInfo?.role === ROLE.USER) && (
        <Sidebar />
      )}

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
