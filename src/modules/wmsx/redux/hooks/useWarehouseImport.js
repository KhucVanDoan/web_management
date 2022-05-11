import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseImportActions from '~/modules/wmsx/redux/actions/warehouse-import'

const useWarehouseImport = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseImport'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseImportActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseImport
