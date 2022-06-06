import React, { useRef, useState } from 'react'

import { Box, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import { last, isEmpty } from 'lodash'
import { useTranslation } from 'react-i18next'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { useIntersectionObserver } from '~/common/hooks'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'

import NotificationItem from '../NotificationItem'
import style from './style'

const NotificationList = () => {
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
          ...(last(items)?._id ? { lastId: last(items)?._id } : {}),
          limit: ROWS_PER_PAGE_OPTIONS[0],
        },
        () => setLoadable(false),
        () => setLoadable(false),
      )
    },
    onScrollUp: () => setLoadable(true),
    enabled: !isLoading && loadable,
  })

  if (isEmpty(items)) {
    return (
      <Typography variant="body2" sx={{ p: 4 / 3 }}>
        {t('notification.noData')}
      </Typography>
    )
  }

  return (
    <List className={classes.list} ref={rootRef}>
      {(items || []).map((item) => (
        <NotificationItem key={item?._id} data={item} />
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

NotificationList.defaultProps = {}

NotificationList.propTypes = {}

export default NotificationList
