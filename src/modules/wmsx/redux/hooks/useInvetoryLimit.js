import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryLimitActions from '~/modules/wmsx/redux/actions/inventory-limit'

const useInventoryLimit = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventoryLimitSetting'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryLimitActions, dispatch),
    [dispatch],
  )

  return {
    actions,
    data,
  }
}

export default useInventoryLimit
