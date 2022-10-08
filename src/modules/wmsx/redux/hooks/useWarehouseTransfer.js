import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseTransferActions from '~/modules/wmsx/redux/actions/warehouse-transfer'

const useWarehouseTransfer = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseTransfer'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseTransferActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useWarehouseTransfer
