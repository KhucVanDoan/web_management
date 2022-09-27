import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseImportReceiptAction from '~/modules/wmsx/redux/actions/warehouse-import-receipt'

const useWarehouseImportReceipt = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseImportReceipt'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseImportReceiptAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseImportReceipt
