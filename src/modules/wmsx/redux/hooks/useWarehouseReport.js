import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseReportActions from '../actions/warehouse-report'

const useWarehouseReport = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseReportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseReport
