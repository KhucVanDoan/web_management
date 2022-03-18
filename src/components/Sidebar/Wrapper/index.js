import React from 'react'

import { Box, Hidden } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { useLocation } from 'react-router-dom'

import LogoClient from '~/assets/images/Logo-Client.png'
import LogoMinimal from '~/assets/images/Logo-Minimal.png'
import Icon from '~/components/Icon'
import { appRoutesObj } from '~/routes'
import { getCurrentModule } from '~/utils/menu'

import ListMenu from '../ListMenu'
import ListModule from '../ListModule'
import { useSidebar } from '../hooks'
import { Drawer, DrawerHeader } from './style'

export default function Sidebar() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const currentModule = getCurrentModule(pathname)
  const { isMinimal, setIsMinimal, isMdDown } = useSidebar()

  return (
    <Box
      sx={{
        display: 'flex',
        boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
        position: 'relative',
      }}
    >
      <ListModule />

      {currentModule && (
        <Drawer variant="permanent" isMinimal={isMinimal}>
          <Hidden mdDown>
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
                onClick={() => setIsMinimal(!isMinimal)}
              >
                <Icon
                  name="drawer"
                  size={20}
                  {...(isMinimal
                    ? { sx: { transform: 'rotate(-180deg)' } }
                    : {})}
                />
              </IconButton>
            </DrawerHeader>
          </Hidden>
          <Hidden mdUp>
            <DrawerHeader>
              <Box
                sx={{
                  display: 'inline-flex',
                  flex: 1,
                  px: 1,
                  overflow: 'hidden',
                  img: { maxHeight: theme.spacing(2) },
                }}
              >
                <img src={LogoClient} alt="client-logo" />
              </Box>
            </DrawerHeader>
          </Hidden>
          <ListMenu
            routes={appRoutesObj[currentModule]?.filter(
              (item) => item?.isInSidebar,
            )}
            currentModule={currentModule}
          />
        </Drawer>
      )}

      <Backdrop
        open={isMdDown && !isMinimal}
        sx={{ zIndex: 98 }}
        onClick={() => setIsMinimal(true)}
      />
    </Box>
  )
}
