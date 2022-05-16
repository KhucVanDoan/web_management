import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseTransferMovementActions from '../actions/warehouse-transfer-movements'

const useWarehouseTransferMovements = () => {
  const data = useSelector((state) =>
    get(state, 'wmsx.warehouseTransferMovements'),
  )

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseTransferMovementActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseTransferMovements
