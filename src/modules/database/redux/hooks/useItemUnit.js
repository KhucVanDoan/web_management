import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemUnitActions from '../actions/item-unit-setting'

const useItemUnit = () => {
  const data = useSelector((state) => get(state, 'database.itemUnitSetting'))

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
