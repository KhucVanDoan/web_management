import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Dropdown from '~/components/Dropdown'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import { useClasses } from '~/themes'

import style from './style'

const Toolbar = () => {
  const { t } = useTranslation()
  const { actions } = useAuth()
  const classes = useClasses(style)

  const options = [
    {
      label: t('page.logout'),
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => actions.logout(),
    },
  ]

  return (
    <Box className={classes.root}>
      <Button className={classes.btn} icon="setting" color="grayEE" />
      <Button
        className={classes.btn}
        icon="notification"
        color="grayEE"
        sx={{
          width: 40,
          minWidth: 40,
          padding: '9px 21px',
          '.MuiButton-startIcon': {
            margin: 0,
          },
        }}
      >
        <Box className={classes.badge}>{2}</Box>
      </Button>
      <Dropdown
        options={options}
        color="grayEE"
        icon="user"
        handleMenuItemClick={(opt) => opt.onClick()}
        sx={{
          width: 40,
          minWidth: 40,
          height: 40,
        }}
      />
    </Box>
  )
}

export default Toolbar
