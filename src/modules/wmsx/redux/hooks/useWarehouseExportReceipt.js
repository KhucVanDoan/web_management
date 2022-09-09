import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseExportReceiptAction from '~/modules/wmsx/redux/actions/warehouse-export-receipt'

const useWarehouseExportReceipt = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseExportReceipt'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseExportReceiptAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseExportReceipt
