import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import calendarActions from '../actions/calendar'

const useCalendar = () => {
  const data = useSelector((state) => get(state, 'mesx.calendar'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(calendarActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useCalendar
