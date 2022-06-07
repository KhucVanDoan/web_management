import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import WarehouseDesignActions from '~/modules/wmsx/redux/actions/warehouse-design'

const useWarehouseDesign = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseDesign'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(WarehouseDesignActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useWarehouseDesign
