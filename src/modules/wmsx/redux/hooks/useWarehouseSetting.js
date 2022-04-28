import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import wareHouseSettingActions from '../actions/warehouse-setting'

export const useWarehouseSetting = () => {
  const data = useSelector((state) => get(state, 'wmsx.warehouseSetting'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(wareHouseSettingActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}
