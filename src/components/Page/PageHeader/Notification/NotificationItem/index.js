import React from 'react'

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

import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import style from './style'

const NotificationItem = ({ data }) => {
  const classes = useClasses(style)
  const { t } = useTranslation()

  const { actions } = useNotification()

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

  return (
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
      <Box className={classes.listItemButton}>
        <Typography>
          <Typography variant="h5" component="span">
            {data.notificationId?.createdBy?.fullName ||
              data.notificationId?.createdBy?.userName ||
              ''}
          </Typography>{' '}
          {t('notification.created')}{' '}
          <Typography variant="h5" component="span">
            {data.title}
          </Typography>
        </Typography>
        <Typography sx={{ mt: 2 / 3 }}>{data.content}</Typography>

        {/* <Box className={classes.actions}>
                    <Button
                      variant="outlined"
                      color="subText"
                      onKeyDown={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      {t('notification.action.reject')}
                    </Button>
                    <Button>{t('notification.action.confirm')}</Button>
                  </Box> */}
        <Typography variant="body2" sx={{ mt: 2 / 3 }}>
          {getCreatedDate(data.createdAt)}
        </Typography>
      </Box>
    </ListItem>
  )
}

NotificationItem.defaultProps = {
  data: {},
}

NotificationItem.propTypes = {
  data: PropTypes.shape(),
}

export default NotificationItem
