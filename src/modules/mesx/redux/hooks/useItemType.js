import { useMemo } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemTypeActions from '~/modules/mesx/redux/actions/item-type-setting'

const useItemType = () => {
  const data = useSelector((state) => state.itemTypeSetting)

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(itemTypeActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useItemType
