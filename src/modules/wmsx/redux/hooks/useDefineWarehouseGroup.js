import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineWarehouseGroupActions from '~/modules/wmsx/redux/actions/define-warehouse-group'

const useDefineWarehouseGroup = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineWarehouseGroup'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineWarehouseGroupActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineWarehouseGroup
