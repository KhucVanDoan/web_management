import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemGroupAction from '../actions/item-group-setting'

const useItemGroup = () => {
  const data = useSelector((state) => get(state, 'database.itemGroupSetting'))
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(itemGroupAction, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useItemGroup
