import React from 'react'

import KeyIcon from '@mui/icons-material/Key'
import LogoutIcon from '@mui/icons-material/Logout'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import Button from '~/components/Button'
import Dropdown from '~/components/Dropdown'
import Icon from '~/components/Icon'
import LanguageSwitcher from '~/components/LanguageSwitcher'
import { useAuth } from '~/modules/auth/redux/hooks/useAuth'
import { ROUTE } from '~/modules/wmsx/routes/config'
import { useClasses } from '~/themes'

import Notification from '../Notification'
import style from './style'

const Toolbar = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const { actions } = useAuth()
  const classes = useClasses(style)

  const options = [
    {
      label: t('page.userInfo'),
      icon: <Icon name="user" size={18} />,
      onClick: () => history.push(ROUTE.ACCOUNT.DETAIL.PATH),
    },
    {
      label: t('page.changePassword'),
      icon: <KeyIcon fontSize="small" />,
      onClick: () => history.push(ROUTE.ACCOUNT.CHANGE_PASSWORD.PATH),
    },
    {
      label: t('page.logout'),
      icon: <LogoutIcon fontSize="small" />,
      onClick: () => actions.logout(),
    },
  ]

  return (
    <Box className={classes.root}>
      <Button className={classes.btn} icon="setting" color="grayEE" />
      <Notification />
      <LanguageSwitcher />
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
