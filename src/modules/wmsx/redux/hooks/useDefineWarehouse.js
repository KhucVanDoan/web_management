import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineWarehouseAction from '~/modules/wmsx/redux/actions/define-warehouse'

const useDefineWarehouse = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineWarehouse'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineWarehouseAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineWarehouse
