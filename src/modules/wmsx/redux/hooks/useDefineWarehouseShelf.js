import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import defineWarehouseShelfAction from '~/modules/wmsx/redux/actions/define-warehouse-shelf'

const useDefineWarehouseShelf = () => {
  const data = useSelector((state) => get(state, 'wmsx.defineWarehouseShelf'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(defineWarehouseShelfAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useDefineWarehouseShelf
