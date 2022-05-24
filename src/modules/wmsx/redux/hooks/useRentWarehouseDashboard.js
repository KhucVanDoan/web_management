import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import rentWarehouseDashboardActions from '~/modules/wmsx/redux/actions/rent-warehouse-dashboard'

const useRentWarehouseDashboard = () => {
  const data = useSelector((state) => get(state, 'wmsx.rentWarehouseDashboard'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(rentWarehouseDashboardActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useRentWarehouseDashboard
