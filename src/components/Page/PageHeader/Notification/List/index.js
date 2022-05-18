import React, { useRef, useState } from 'react'

import { Box, IconButton, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  parseISO,
} from 'date-fns'
import { last, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { useIntersectionObserver } from '~/common/hooks'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'
import { convertUtcDateTimeToLocalTz } from '~/utils'

import style from '../style'

const Notification = () => {
  const classes = useClasses(style)
  const { t } = useTranslation()
  const loadMoreRef = useRef(null)
  const rootRef = useRef(null)
  const [loadable, setLoadable] = useState(true)

  const {
    actions,
    data: { items, isLoading },
  } = useNotification()

  useIntersectionObserver({
    root: rootRef,
    target: loadMoreRef,
    onIntersect: () => {
      actions.getNotifications(
        {
          last_id: last(items)?.id || '',
          limit: ROWS_PER_PAGE_OPTIONS[0],
        },
        () => setLoadable(false),
        () => setLoadable(false),
      )
    },
    onScrollUp: () => setLoadable(true),
    enabled: !isLoading && loadable,
  })

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

  if (isEmpty(items)) {
    return (
      <Typography variant="body2" sx={{ p: 4 / 3 }}>
        {t('notification.noData')}
      </Typography>
    )
  }

  return (
    <List className={classes.list} ref={rootRef}>
      {(items || []).map((noti) => (
        <ListItem key={noti?._id} disablePadding className={classes.listItem}>
          <Box className={classes.readOneContainer}>
            {!noti?.readAt && (
              <IconButton
                className={classes.readOne}
                title={t('notification.readOne')}
                onClick={() => {
                  actions.seenOneNotification(noti?._id)
                }}
              ></IconButton>
            )}
          </Box>
          <Box className={classes.listItemButton}>
            <Typography variant="h5">{noti?.title}</Typography>
            <Typography sx={{ mt: 2 / 3 }}>{noti?.content}</Typography>

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
              {getCreatedDate(noti?.createdAt)}
            </Typography>
          </Box>
        </ListItem>
      ))}

      <Box ref={loadMoreRef} sx={{ position: 'relative', p: 1 }}>
        {isLoading && (
          <CircularProgress
            size={18}
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-60%)',
            }}
          />
        )}
      </Box>
    </List>
  )
}

Notification.defaultProps = {}

Notification.propTypes = {}

export default Notification
