import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import calendarActions from '../actions/calendar'

const useCalendar = () => {
  const data = useSelector((state) => state.calendar)

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
