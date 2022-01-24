import React, { useState } from 'react'

import { Box } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

import LogoClient from '~/assets/images/Logo-Client.png'
import LogoMinimal from '~/assets/images/Logo-Minimal.png'
import Icon from '~/components/Icon'
import { appRoutesObj } from '~/routes'
import { getCurrentModule } from '~/utils/menu'
import storage from '~/utils/storage'

import ListMenu from './ListMenu'
import ListModule from './ListModule'
import { Drawer, DrawerHeader } from './style'

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
          <DrawerHeader>
            <Box
              sx={{
                display: 'inline-flex',
                flex: 1,
                px: isMinimal ? 0.5 : 1,
                overflow: 'hidden',
                img: { maxHeight: theme.spacing(2) },
              }}
            >
              {isMinimal ? (
                <img src={LogoMinimal} alt="minimal-logo" />
              ) : (
                <img src={LogoClient} alt="client-logo" />
              )}
            </Box>

            <IconButton
              sx={{
                background: isMinimal
                  ? 'transparent'
                  : theme.palette.grayEE.main,
                borderRadius: '3px 0 0 3px',
                p: '2px',
                flex: '0 0 24px',
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
