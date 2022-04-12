import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemUnitActions from '../actions/item-unit-setting'

const useItemUnit = () => {
  const data = useSelector((state) => state.itemUnitSetting)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(itemUnitActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useItemUnit
