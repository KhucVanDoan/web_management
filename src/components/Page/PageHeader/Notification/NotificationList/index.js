import React, { useRef, useState } from 'react'

import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import List from '@mui/material/List'
import { last } from 'lodash'
import { PropTypes } from 'prop-types'

import { ROWS_PER_PAGE_OPTIONS } from '~/common/constants'
import { useIntersectionObserver } from '~/common/hooks'
import { useNotification } from '~/modules/shared/redux/hooks/useNotification'
import { useClasses } from '~/themes'

import NotificationItem from '../NotificationItem'
import style from './style'

const NotificationList = ({ onClose }) => {
  const classes = useClasses(style)
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

  return (
    <List className={classes.list} ref={rootRef}>
      {(items || []).map((item) => (
        <NotificationItem key={item?._id} data={item} onClose={onClose} />
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

NotificationList.defaultProps = {
  onClose: () => {},
}

NotificationList.propTypes = {
  onClose: PropTypes.func,
}

export default NotificationList
