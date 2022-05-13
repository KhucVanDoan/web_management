import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseExportActions from '../actions/warehouse-export'

const useWarehouseExport = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseExport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseExportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseExport
