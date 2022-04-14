import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemTypeActions from '~/modules/mesx/redux/actions/item-type-setting'

const useItemType = () => {
  const data = useSelector((state) => get(state, 'mesx.itemTypeSetting'))

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
