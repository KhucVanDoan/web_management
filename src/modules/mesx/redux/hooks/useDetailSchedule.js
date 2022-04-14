import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import detailScheduleAction from '../actions/detail-schedule'

export const useDetailSchedule = () => {
  const data = useSelector((state) => get(state, 'mesx.detailSchedule'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(detailScheduleAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
