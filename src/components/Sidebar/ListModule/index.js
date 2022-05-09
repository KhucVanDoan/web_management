import React from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
import { Hidden, List, Typography, Box, IconButton } from '@mui/material'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import logo from '~/assets/images/logo.svg'
import { ROUTE as MESX_ROUTE } from '~/modules/mesx/routes/config'
import { getCurrentModule } from '~/utils/menu'

import { useSidebar } from '../hooks'
import modules from './config'
import ListModuleStyled from './style'

const ModuleList = () => {
  const { pathname } = useLocation()
  const { isMinimal, setIsMinimal } = useSidebar()

  return (
    <List
      component="div"
      sx={{
        width: 88,
        backgroundColor: 'primary.main',
        padding: 0,
        overflow: 'auto',
        zIndex: 100,
      }}
    >
      <Hidden mdUp>
        <Box
          sx={{
            height: '80px',
            opacity: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          }}
        >
          <IconButton
            size="large"
            color="primary"
            onClick={() => setIsMinimal(!isMinimal)}
          >
            {isMinimal ? (
              <MenuIcon fontSize="large" />
            ) : (
              <MenuOpenIcon fontSize="large" />
            )}
          </IconButton>
        </Box>
      </Hidden>
      <ListModuleStyled
        component={Link}
        to={MESX_ROUTE.DASHBOARD.PATH}
        sx={{
          height: '80px',
          opacity: 1,
        }}
        className={clsx({
          active: !pathname || pathname === '/',
        })}
      >
        <img src={logo} alt="logo" />
      </ListModuleStyled>
      {modules.map((item, index) => (
        <ListModuleStyled
          disabled={!item?.path}
          onClick={() => {
            if (item?.path) window.location.href = item?.path
          }}
          // @TODO: dongnq uncomment when refactor all module done
          // component={Link}
          // to={{ pathname: `${item.path}` }}
          key={index}
          className={clsx({
            active: getCurrentModule(pathname) === item.name,
          })}
        >
          <img src={item.icon} alt={item.name} />
          <Typography
            variant="h5"
            sx={{ fontWeight: '800', color: '#fff', marginTop: '5px' }}
          >
            {item.title}
          </Typography>
        </ListModuleStyled>
      ))}
    </List>
  )
}

export default ModuleList
