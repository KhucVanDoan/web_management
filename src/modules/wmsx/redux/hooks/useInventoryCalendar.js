import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryCalendarActions from '~/modules/wmsx/redux/actions/inventory-calendar'

const useInventoryCalendar = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventoryCalendar'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryCalendarActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventoryCalendar
