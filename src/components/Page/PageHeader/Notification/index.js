import React, { useState } from 'react'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { Box, IconButton, Popover, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import Button from '~/components/Button'
import Dropdown from '~/components/Dropdown'
import NoData from '~/components/NoData'
import useUserInfo from '~/modules/configuration/redux/hooks/useUserInfo'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'

import NotificationList from './NotificationList'
import style from './style'

const Notification = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const {
    data: { userInfo, isLoading: isLoadingUserInfo },
  } = useUserInfo()

  const open = Boolean(anchorEl)
  const onClose = () => setAnchorEl(null)
  const isOn = !!userInfo?.statusNotification

  const {
    actions,
    data: { totalUnRead, items, isLoading },
  } = useNotification()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const options = [
    {
      label: t('notification.readAll'),
      onClick: () => actions.seenAllNotifications(),
    },
    {
      label: t('notification.turnOff'),
      onClick: () => {
        actions.changeNotificationStatus({
          userId: userInfo?.id,
          statusNotification: false,
        })
      },
    },
  ]

  const renderContent = () => {
    if (!isOn) {
      return (
        <Box sx={{ p: 4 / 3, pb: 2 }}>
          <Button
            icon="notification"
            onClick={() => {
              actions.changeNotificationStatus({
                userId: userInfo?.id || 1,
                statusNotification: true,
              })
            }}
            loading={isLoading}
          >
            {t('notification.turnOn')}
          </Button>
        </Box>
      )
    }

    if (isEmpty(items)) {
      return <NoData sx={{ p: 4 / 3 }} text={t('notification.noData')} />
    }

    return <NotificationList onClose={onClose} />
  }

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
          position: 'relative',

          '.MuiButton-startIcon': {
            margin: 0,
          },

          ...(!isLoadingUserInfo && !isOn
            ? {
                '&:before': {
                  content: '""',
                  display: 'inline-block',
                  width: '1px',
                  height: '25px',
                  backgroundColor: '#222',
                  position: 'absolute',
                  top: '7px',
                  left: '20px',
                  transform: 'rotate(-45deg)',
                },
              }
            : {}),
        }}
      >
        {isOn && !!totalUnRead && (
          <Box className={classes.badge}>
            {totalUnRead > 999 ? '999+' : totalUnRead}
          </Box>
        )}
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
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
            <Typography variant="h5">
              {isOn
                ? t('notification.heading')
                : t('notification.notificationIsOff')}
            </Typography>

            {isOn && (
              <Dropdown
                options={options}
                handleMenuItemClick={(opt) => opt.onClick()}
                renderButton={(btnProps) => (
                  <IconButton {...btnProps} size="small">
                    <MoreHorizIcon />
                  </IconButton>
                )}
              />
            )}
          </Box>

          {renderContent()}
        </Box>
      </Popover>
    </>
  )
}

Notification.defaultProps = {}

Notification.propTypes = {}

export default Notification
