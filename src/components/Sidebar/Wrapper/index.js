import React from 'react'

import {
  Box,
  Typography,
  //  Hidden
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'

import Icon from '~/components/Icon'
import wmsxRoutes from '~/modules/wmsx/routes'

import ListMenu from '../ListMenu'
import { useSidebar } from '../hooks'
import { Drawer, DrawerHeader } from './style'
export default function Sidebar() {
  const theme = useTheme()

  const { isMinimal, setIsMinimal, isMdDown } = useSidebar()
  return (
    <Box
      sx={{
        display: 'flex',
        boxShadow: '0px 8px 8px rgba(102, 102, 102, 0.05)',
        position: 'relative',
        backgroundColor: '#164285',
        zIndex: 1000,
      }}
    >
      {
        <Drawer variant="permanent" isMinimal={isMinimal}>
          {/* <Hidden mdDown> */}
          <DrawerHeader>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flex: 1,
                px: isMinimal ? 0.2 : 1,
                overflow: 'hidden',
                img: {
                  maxWidth: '100%',
                },
              }}
            >
              <Link
                to="/"
                style={{
                  display: 'inline-flex',
                  textDecoration: 'none',
                  color: '#fff',

                  borderRadius: '4px',
                  padding: isMinimal ? '4px' : '4px 12px',
                }}
              >
                {isMinimal ? (
                  <Typography>FLIX VILA</Typography>
                ) : (
                  <Typography sx={{ fontSize: '30px', fontWeight: 500 }}>
                    FLIX VILA
                  </Typography>
                )}
              </Link>
            </Box>

            <IconButton
              sx={{
                background: `${
                  isMinimal ? 'transparent' : theme.palette.grayEE.main
                } !important`,
                borderRadius: '3px 0 0 3px',
                p: '2px',
                pl: 0,
                flex: '0 0 24px',
              }}
              onClick={() => setIsMinimal(!isMinimal)}
            >
              <Icon
                name="drawer"
                size={20}
                {...(isMinimal ? { sx: { transform: 'rotate(-180deg)' } } : {})}
              />
            </IconButton>
          </DrawerHeader>
          {/* </Hidden> */}
          {/* <Hidden mdUp>
            <DrawerHeader>
              <Box
                sx={{
                  display: 'inline-flex',
                  flex: 1,
                  px: 1,
                  overflow: 'hidden',
                  img: { maxHeight: theme.spacing(4) },
                }}
              >
                <img src={LogoSrc} alt="client-logo" />
              </Box>
            </DrawerHeader>
          </Hidden> */}
          <ListMenu
            routes={wmsxRoutes?.filter((item) => item?.isInSidebar)}
            // currentModule={currentModule}
          />
        </Drawer>
      }

      <Backdrop
        open={isMdDown && !isMinimal}
        sx={{ zIndex: 98 }}
        onClick={() => setIsMinimal(true)}
      />
    </Box>
  )
}
