import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box } from '@mui/material'
import ListModule from './ListModule'
import ListMenu from './ListMenu'
import { appRoutesObj } from 'routes'
import { getCurrentModule } from 'utils/menu'
import { Drawer, DrawerHeader } from './style'
import IconButton from '@mui/material/IconButton'
import Icon from 'components/Icon'
import LogoClient from 'assets/images/Logo-Client.png'
import LogoMinimal from 'assets/images/Logo-Minimal.png'
import { useTheme } from '@mui/material/styles'
import storage from 'utils/storage'

export default function Sidebar() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const currentModule = getCurrentModule(pathname)
  const [isMinimal, setIsMinimal] = useState(
    storage.sessionGet('isMinimal') || false,
  )

  return (
    <Box
      sx={{
        display: 'flex',
        boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
      }}
    >
      <ListModule />

      {currentModule && (
        <Drawer variant="permanent" isMinimal={isMinimal}>
          <DrawerHeader isMinimal={isMinimal}>
            {isMinimal ? (
              <img
                src={LogoMinimal}
                alt="minimal-logo"
                style={{ marginLeft: -10 }}
              />
            ) : (
              <img src={LogoClient} alt="client-logo" />
            )}
            <IconButton
              sx={{
                background: theme.palette.grayEE.main,
                borderRadius: '3px 0 0 3px',
                p: '2px',
              }}
              onClick={() => {
                setIsMinimal(!isMinimal)
                storage.sessionSet('isMinimal', !isMinimal)
              }}
            >
              <Icon
                name="drawer"
                size={20}
                {...(isMinimal ? { sx: { transform: 'rotate(-180deg)' } } : {})}
              />
            </IconButton>
          </DrawerHeader>
          <ListMenu
            routes={appRoutesObj[currentModule]}
            currentModule={currentModule}
            isMinimal={isMinimal}
          />
        </Drawer>
      )}
    </Box>
  )
}
