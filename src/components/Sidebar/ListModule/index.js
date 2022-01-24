import React from 'react'

import { List, Typography } from '@mui/material'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

import logo from '~/assets/images/logo.svg'
import { getCurrentModule } from '~/utils/menu'

import modules from './config'
import ListModuleStyled from './style'

export default function ModuleList() {
  const { pathname } = useLocation()

  return (
    <List
      component="div"
      sx={{
        width: 88,
        backgroundColor: 'primary.main',
        padding: 0,
        overflow: 'auto',
      }}
    >
      <ListModuleStyled
        component={Link}
        to={'/'}
        sx={{
          height: '80px',
          opacity: 1,
        }}
      >
        <img src={logo} alt="logo" />
      </ListModuleStyled>
      {modules.map((item, index) => (
        <ListModuleStyled
          component={Link}
          to={`/${item.name}`}
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
