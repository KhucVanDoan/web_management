import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemGroupAction from '../actions/item-group-setting'

const useItemGroup = () => {
  const data = useSelector((state) => state.itemGroupSetting)

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
