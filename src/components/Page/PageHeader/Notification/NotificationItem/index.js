import React, { useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from 'date-fns'
import { PropTypes } from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { NOTIFICATION_ACTION_ENUM } from '~/common/constants/notification'
import { useApp } from '~/common/hooks/useApp'
import Avatar from '~/components/Avatar'
import Button from '~/components/Button'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import { config } from './config'
import style from './style'

const NotificationItem = ({ data, onClose }) => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const history = useHistory()
  const { actions } = useNotification()
  const [openDialog, setOpenDialog] = useState('')
  const { setRefreshKey } = useApp()

  const {
    createdBy,
    payload: entityData = {},
    action: entityAction,
  } = data.notificationId || {}

  const approvable =
    entityAction === NOTIFICATION_ACTION_ENUM.VIEW_APPROVE_REJECT ||
    entityAction === NOTIFICATION_ACTION_ENUM.VIEW_APPROVE
  const rejectable =
    entityAction === NOTIFICATION_ACTION_ENUM.VIEW_APPROVE_REJECT

  const goToDetail = () => {
    const detailPath = config[entityData.entity]?.path?.replace(
      ':id',
      entityData.id,
    )

    if (detailPath) {
      history.push(detailPath)
      onClose()
    }
  }

  const getCreatedDate = (date) => {
    if (!date) return ''

    if (differenceInDays(new Date(), parseISO(date)) > 0) {
      return convertUtcDateTimeToLocalTz(date)
    }

    if (differenceInHours(new Date(), parseISO(date)) > 0) {
      return t('notification.hoursAgo', {
        time: differenceInHours(new Date(), parseISO(date)),
      })
    }

    if (differenceInMinutes(new Date(), parseISO(date)) > 0) {
      return t('notification.minutesAgo', {
        time: differenceInMinutes(new Date(), parseISO(date)),
      })
    }

    return ''
  }

  const onApproveRejectSuccess = () => {
    setRefreshKey(entityData.id)
    actions.changeNotificationActionToView(data._id)
  }

  const renderDialogs = () => {
    const DialogApprove = config[entityData.entity]?.approve
    const DialogReject = config[entityData.entity]?.reject

    return (
      <>
        {rejectable && DialogReject && (
          <DialogReject
            open={openDialog === 'reject'}
            onClose={() => setOpenDialog('')}
            onSuccess={onApproveRejectSuccess}
            data={entityData}
          />
        )}
        {approvable && DialogApprove && (
          <DialogApprove
            open={openDialog === 'approve'}
            onClose={() => setOpenDialog('')}
            onSuccess={onApproveRejectSuccess}
            data={entityData}
          />
        )}
      </>
    )
  }

  return (
    <>
      <ListItem disablePadding className={classes.listItem}>
        <Box className={classes.readOneContainer}>
          {!data.readAt && (
            <IconButton
              className={classes.readOne}
              title={t('notification.readOne')}
              onClick={() => {
                actions.seenOneNotification(data._id)
              }}
            ></IconButton>
          )}
        </Box>
        <Box
          className={classes.listItemButton}
          onClick={() => {
            if (!data.readAt) {
              actions.seenOneNotification(data._id)
            }
            goToDetail()
          }}
        >
          <Avatar
            src=""
            name={createdBy?.fullName || createdBy?.userName}
            sx={{
              width: 32,
              height: 32,
              fontSize: 15,
              mr: 4 / 3,
            }}
          />

          <Box>
            <Typography>
              <Typography variant="h5" component="span">
                {createdBy?.fullName || createdBy?.userName || ''}
              </Typography>{' '}
              {t('notification.created')}{' '}
              <Typography variant="h5" component="span">
                {data.title}
              </Typography>
            </Typography>
            <Typography sx={{ mt: 2 / 3 }}>{data.content}</Typography>

            <Box className={classes.actions}>
              {rejectable && (
                <Button
                  variant="outlined"
                  color="subText"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDialog('reject')
                  }}
                  sx={{
                    backgroundColor: '#fff !important',
                    '&.MuiButton-root.MuiButton-outlined.MuiButton-outlinedSubText:hover':
                      {
                        borderColor: 'error.a5',
                        color: 'error.main',
                      },
                  }}
                >
                  {t('notification.action.reject')}
                </Button>
              )}
              {approvable && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenDialog('approve')
                  }}
                >
                  {t('notification.action.confirm')}
                </Button>
              )}
            </Box>
            <Typography variant="body2" sx={{ mt: 2 / 3 }}>
              {getCreatedDate(data.createdAt)}
            </Typography>
          </Box>
        </Box>
      </ListItem>

      {renderDialogs()}
    </>
  )
}

NotificationItem.defaultProps = {
  data: {},
  onClose: () => {},
}

NotificationItem.propTypes = {
  data: PropTypes.shape(),
  onClose: PropTypes.func,
}

export default NotificationItem
