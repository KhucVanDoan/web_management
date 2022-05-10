import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import notificationActions from '../actions/notification'

export const useNotification = () => {
  const data = useSelector((state) => get(state, 'shared.notification'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(notificationActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
