import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import warehouseAreaActions from '~/modules/wmsx/redux/actions/warehouse-area'

const useWarehouseArea = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseArea'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(warehouseAreaActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseArea
