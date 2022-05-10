import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import itemTypeActions from '~/modules/database/redux/actions/item-type-setting'

const useItemType = () => {
  const data = useSelector((state) => get(state, 'database.itemTypeSetting'))

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
