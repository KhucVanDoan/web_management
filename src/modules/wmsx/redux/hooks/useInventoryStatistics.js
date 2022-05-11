import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryStatisticsActions from '../actions/inventory-statistics'

const useInventoryStatistics = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventoryStatistics'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryStatisticsActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventoryStatistics
