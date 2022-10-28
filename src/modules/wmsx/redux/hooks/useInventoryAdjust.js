import { useMemo } from 'react'

import { get } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import inventoryAdjustActions from '~/modules/wmsx/redux/actions/inventory-adjust'

const useInventoryAdjust = () => {
  const data = useSelector((state) => get(state, 'wmsx.inventoryAdjust'))

  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators(inventoryAdjustActions, dispatch),
    [dispatch],
  )
  return {
    actions,
    data,
  }
}

export default useInventoryAdjust
