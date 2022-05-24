import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseSpaceReportActions from '../actions/warehouse-space-report'

const useWarehouseSpaceReport = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseSpaceReport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseSpaceReportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseSpaceReport
