import React, { useState } from 'react'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, IconButton, Popover, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Dropdown from '~/components/Dropdown'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'

import NotificationList from './NotificationList'
import style from './style'

const Notification = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)

  const {
    actions,
    data: { totalUnRead },
  } = useNotification()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const options = [
    {
      label: t('notification.readAll'),
      onClick: () => actions.seenAllNotifications(),
    },
    {
      label: t('notification.turnOff'),
      onClick: () => {},
    },
  ]

  return (
    <>
      <Button
        className={classes.btn}
        icon="notification"
        color="grayEE"
        onClick={handleOpen}
        sx={{
          width: 40,
          minWidth: 40,
          padding: '9px 21px',
          '.MuiButton-startIcon': {
            margin: 0,
          },
        }}
      >
        {!!totalUnRead && (
          <Box className={classes.badge}>
            {totalUnRead > 999 ? '999+' : totalUnRead}
          </Box>
        )}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          variant: 'caret',
          sx: { overflow: 'hidden' },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Typography variant="h5">{t('notification.heading')}</Typography>
            <Dropdown
              options={options}
              handleMenuItemClick={(opt) => opt.onClick()}
              renderButton={(btnProps) => (
                <IconButton {...btnProps} size="small">
                  <MoreHorizIcon />
                </IconButton>
              )}
            />
          </Box>

          <NotificationList />
        </Box>
      </Popover>
    </>
  )
}

Notification.defaultProps = {}

Notification.propTypes = {}

export default Notification
